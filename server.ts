import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI with server-side API key and User-Agent
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback intelligent triage rule-matcher for resilience
function getLocalTriageFallback(symptom: string, lang: string = 'ru') {
  const s = (symptom || '').toLowerCase();
  
  if (s.includes('устал') || s.includes('джетлаг') || s.includes('перелет') || s.includes('энерг') || s.includes('fatigue') || s.includes('jetlag') || s.includes('iv') || s.includes('капельниц')) {
    return {
      serviceName: 'IV Therapy «Dubai Jetlag Recovery»',
      doctorName: 'Выездная медицинская бригада Modern Medicine',
      recommendation: lang === 'ru' 
        ? 'Рекомендуется интенсивная инфузионная терапия с электролитами, магнием, глутатионом и витаминами группы B для быстрого снятия акклиматизации, восстановления когнитивного ресурса и гидратации.'
        : 'Recommended intensive infusion therapy with electrolytes, glutathione, and B-complex vitamins for swift jetlag recovery and cellular rehydration.',
      priceAED: 850,
      urgency: 'Планово (сегодня-завтра)',
      preparation: 'Процедура длится 45 минут. Доступна с выездом в номер отеля Fairmont Dubai или на дому.',
      keyHighlights: ['Мгновенный подъем энергии', 'Выезд в номер отеля за 30 мин', 'Премиальные швейцарские компоненты']
    };
  }

  if (s.includes('кож') || s.includes('лиц') || s.includes('морщин') || s.includes('прыщ') || s.includes('skin') || s.includes('acne') || s.includes('zo') || s.includes('эстетик') || s.includes('ботокс')) {
    return {
      serviceName: 'Терапевтический протокол ZO Skin Health by Zein Obagi',
      doctorName: 'Д-р Ольга Димова (Aesthetic & Anti-Age Medicine)',
      recommendation: lang === 'ru'
        ? 'Комплексный клинический уход и дерматологический осмотр на аппарате с 3D-сканированием фототипа. Идеально для защиты кожи в сухом климате Дубая и выравнивания тона.'
        : 'Comprehensive clinical skin care and dermatological assessment tailored for high UV and arid climate protection.',
      priceAED: 1200,
      urgency: 'По предварительной записи',
      preparation: 'Не наносить агрессивные кислоты за 24 часа до визита.',
      keyHighlights: ['Оригинальные формулы Obagi', 'Глубокое увлажнение и антиоксиданты', 'Без реабилитационного периода']
    };
  }

  if (s.includes('чекап') || s.includes('анализ') || s.includes('провер') || s.includes('check') || s.includes('кров') || s.includes('узи') || s.includes('здоров')) {
    return {
      serviceName: 'Комплексный Check-Up «Executive Health 360°»',
      doctorName: 'Консилиум врачей Modern Medicine',
      recommendation: lang === 'ru'
        ? 'Полный диагностический скрининг: развернутая биохимия, гормональный статус, маркеры воспаления, онкоскрининг и УЗИ органов брюшной полости в подарок.'
        : 'Full diagnostic executive screening: comprehensive blood panel, hormone profiling, metabolic biomarkers, and complimentary ultrasound examination.',
      priceAED: 1800,
      urgency: 'Утреннее время (натощак)',
      preparation: 'Строго натощак (8-10 часов голода), пить только чистую негазированную воду.',
      keyHighlights: ['Результаты в личном кабинете за 24 ч', 'Включает УЗИ и консультацию GP', 'Скидка на курсовые программы']
    };
  }

  if (s.includes('уролог') || s.includes('почек') || s.includes('мужск') || s.includes('простат') || s.includes('urolog')) {
    return {
      serviceName: 'Консультация уролога-андролога с УЗИ',
      doctorName: 'Д-р Надер Рашид (Consultant Urologist & Mens Health)',
      recommendation: lang === 'ru'
        ? 'Деликатная доказательная консультация, пальпаторный осмотр и ультразвуковая диагностика на оборудовании экспертного класса.'
        : 'Evidence-based urological and men’s health consultation with expert-tier ultrasound diagnostics.',
      priceAED: 500,
      urgency: 'В ближайшие 1-2 дня',
      preparation: 'Желательно иметь наполненный мочевой пузырь за 1 час до УЗИ.',
      keyHighlights: ['Полная конфиденциальность', 'Международные протоколы EAU', 'Fairmont Dubai 21-й этаж']
    };
  }

  // Default fallback
  return {
    serviceName: 'Консультация ведущего врача-терапевта (GP)',
    doctorName: 'Д-р Ольга Димова',
    recommendation: lang === 'ru'
      ? 'Первичный углубленный прием, сбор медицинского анамнеза, составление персонализированного маршрута обследования и направление к узким специалистам.'
      : 'Initial comprehensive clinical consultation, anamnesis intake, and personalized care mapping with specialist referrals.',
    priceAED: 500,
    urgency: 'Планово',
    preparation: 'Возьмите с собой результаты предыдущих анализов (при наличии).',
    keyHighlights: ['Доказательный подход', 'Fairmont Dubai, 21st floor', 'Возможность прямого назначения в EHR']
  };
}

// API Route: Triage
app.post('/api/gemini/triage', async (req, res) => {
  const { symptom, language = 'ru' } = req.body;

  if (!symptom || typeof symptom !== 'string' || !symptom.trim()) {
    return res.status(400).json({ error: 'Symptom description is required.' });
  }

  // If no Gemini API key configured, use intelligent clinical fallback
  if (!process.env.GEMINI_API_KEY) {
    const fallback = getLocalTriageFallback(symptom, language);
    return res.json({
      success: true,
      source: 'clinical-rules-engine',
      data: fallback
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `Ты - высококвалифицированный главный медицинский координатор премиальной клиники Modern Medicine в Fairmont Dubai (21st floor, Sheikh Zayed Road).
Клиника специализируется на:
1. Консультация гинеколога (500 AED, Д-р Ольга Димова)
2. Консультация уролога-андролога (500 AED, Д-р Надер Рашид)
3. Премиальный уход ZO Skin Health (1200 AED, Д-р Ольга Димова)
4. Инфузионная терапия IV Therapy / Jetlag Recovery (850 AED, выезд на дом или в Fairmont)
5. Комплексный Check-Up «Executive Health» (1800 AED, УЗИ в подарок)
6. Выезд врача и забор анализов 24/7 (950 AED, Fairmont & резиденции)
7. Anti-Age Плазмотерапия PRP (1400 AED)
8. Консультация врача общей практики GP (500 AED)

На основе описания симптомов пациента дай профессиональную, заботливую и тактичную рекомендацию.
Язык ответа: ${language === 'en' ? 'English' : language === 'ar' ? 'Arabic' : 'Russian'}.
Ответь СТРОГО в валидном JSON объекте без разметки markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Запрос пациента: "${symptom}". Подбери оптимальную услугу, врача и дай рекомендации по подготовке.`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            serviceName: { type: Type.STRING, description: 'Название рекомендованной услуги' },
            doctorName: { type: Type.STRING, description: 'Рекомендованный врач или специалист' },
            recommendation: { type: Type.STRING, description: 'Клиническое обоснование рекомендации' },
            priceAED: { type: Type.NUMBER, description: 'Стоимость услуги в AED' },
            urgency: { type: Type.STRING, description: 'Срочность визита (Срочно / Сегодня-завтра / Планово)' },
            preparation: { type: Type.STRING, description: 'Правила подготовки (натощак, время и т.д.)' },
            keyHighlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 ключевых преимущества услуги'
            }
          },
          required: ['serviceName', 'doctorName', 'recommendation', 'priceAED', 'urgency', 'preparation', 'keyHighlights']
        }
      }
    });

    const responseText = response.text || '';
    const parsedData = JSON.parse(responseText.trim());

    return res.json({
      success: true,
      source: 'gemini-3.8-flash',
      data: parsedData
    });
  } catch (error) {
    console.error('Gemini API Error in triage:', error);
    // Graceful fallback on API error so client never breaks
    const fallback = getLocalTriageFallback(symptom, language);
    return res.json({
      success: true,
      source: 'clinical-fallback-on-error',
      data: fallback
    });
  }
});

// API Route: Assistant for Elena Kireeva about the current Scope/TZ
app.post('/api/gemini/assistant', async (req, res) => {
  const { message, selectedModules = [], totalWeeks = 0, totalAED = 0 } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const modulesListStr = selectedModules && selectedModules.length > 0
    ? selectedModules.map((m: any) => `• ${m.title} (${m.timeWeeks} нед., ${m.categoryLabel || m.category})`).join('\n')
    : 'Модули пока не выбраны';

  // Fallback intelligent answer if Gemini API key not present
  if (!process.env.GEMINI_API_KEY) {
    const q = message.toLowerCase();
    let reply = `Здравствуйте, Елена! По вашей текущей конфигурации (${selectedModules.length} модулей, ${totalWeeks} нед., ${totalAED.toLocaleString('en-US')} AED):\n\n`;
    
    if (q.includes('mvp') || q.includes('быстр') || q.includes('срок')) {
      reply += `Для максимально быстрого запуска рекомендуем пакет «MVP Старт»: базовый мультиязычный сайт (RU/EN/AR с RTL), каталог услуг и 1-click запись в WhatsApp можно развернуть всего за 3–3.5 недели. Личный кабинет (EHR) и финтех-модули можно подключить вторым спринтом без простоя сайта.`;
    } else if (q.includes('fairmont') || q.includes('отел') || q.includes('консьерж') || q.includes('b2b') || q.includes('номер')) {
      reply += `Шлюз B2B консьерж-сервиса критически важен для Suite 2105. Он решает проблему «ловушки 1-го этажа» (где находится Ora Care 5.0★): консьержи отеля Fairmont заказывают капельницы Jet Lag Recovery и выезд врача в номер за 15–25 минут, принося отелю 15% агентского дохода.`;
    } else if (q.includes('безопасн') || q.includes('dha') || q.includes('данн') || q.includes('nabidh')) {
      reply += `Вся архитектура соответствует регуляторным стандартам Dubai Health Authority (DHA): используется сквозное шифрование AES-256, изоляция баз данных PHI и строгий отказ от внешних рекламных пикселей (Meta Pixel) для исключения рисков утечек.`;
    } else if (q.includes('стоимост') || q.includes('бюджет') || q.includes('цен') || q.includes('оплат')) {
      reply += `Стоимость фиксирована: базовые инженерные работы (15,000 AED) + 5,000 AED за каждую неделю спринта. Оплата делится на 3 транша (30% аванс / 40% после демо MVP / 30% финальный релиз) для абсолютного финансового контроля с вашей стороны.`;
    } else {
      reply += `В выбранный состав входят ключевые компоненты:\n${modulesListStr}\n\nЭто сбалансированное решение, позволяющее закрыть как первичный поток гостей отеля, так и удержание резидентов через Личный кабинет (EHR). Вы можете оперативно скорректировать любой модуль в Конструкторе!`;
    }

    return res.json({
      success: true,
      source: 'local-fallback',
      reply,
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `Ты — ведущий IT-архитектор и стратегический консультант проекта цифровой платформы Modern Medicine Dubai (Fairmont Dubai, 21st Floor, Suite 2105), лично консультирующий заказчика Елену Кирееву.

Контекст текущего проекта:
- Заказчик: Елена Киреева
- Локация клиники: Fairmont Dubai, 21st floor, Suite 2105 (Sheikh Zayed Road)
- Врачи клиники: Д-р Ольга Димова (Aesthetic & Anti-Age) и Д-р Николай Руденко (GP / Терапевт / УЗИ)
- Текущая конфигурация ТЗ:
  * Выбрано модулей: ${selectedModules.length}
  * Общий срок реализации: ${totalWeeks} недель
  * Расчетный бюджет: ${totalAED} AED (также конвертируется в USD и RUB)
  * Выбранные модули:
${modulesListStr}

Конкурентный и отраслевой контекст:
- Клиника на 21 этаже отеля конкурирует с Ora Care Clinic на 1 этаже (5.0★ в Google, угроза 0-го километра)
- Решение: превратить 21 этаж в приватную VIP Destination Clinic + внедрить B2B консьерж-шлюз с вызовом в номер за 15–25 минут и 15% комиссией отелю
- Строгое соблюдение норм DHA и стандартов защиты PHI (запрет Meta Pixel, шифрование AES-256)
- Финансовая модель: Базовый сбор 15,000 AED + 5,000 AED/неделя. Оплата 30% / 40% / 30%.

Отвечай Елене доброжелательно, экспертно, аргументированно и лаконично (не более 3-4 абзацев). Если уместно, давай практические советы по оптимизации бюджета, очередности спринтов или выбору модулей.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Извините, не удалось сформировать ответ. Попробуйте переформулировать вопрос.';

    return res.json({
      success: true,
      source: 'gemini-3.8-flash',
      reply,
    });
  } catch (error) {
    console.error('Gemini Assistant Error:', error);
    return res.json({
      success: true,
      source: 'fallback-on-error',
      reply: `Здравствуйте, Елена! По выбранным модулям (${selectedModules.length} модулей, ${totalWeeks} нед., ${totalAED.toLocaleString('en-US')} AED): все модули взаимоувязаны и формируют полноценную цифровую экосистему для клиники в Fairmont. Готов ответить на любой детальный вопрос по срокам, этапам или архитектуре!`,
    });
  }
});

// Mount Vite middleware in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Modern Medicine Dubai server running on port ${PORT}`);
  });
}

startServer();
