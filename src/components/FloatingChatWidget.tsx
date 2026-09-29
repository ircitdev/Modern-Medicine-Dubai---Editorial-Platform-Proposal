import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Sliders, ChevronDown, CheckCircle2, CornerDownLeft, RefreshCcw } from 'lucide-react';
import { ConfigModule, Currency } from '../types';
import { CURRENCY_RATES, BASE_SETUP_FEE_AED, RATE_PER_WEEK_AED } from '../constants';
import confetti from 'canvas-confetti';

interface FloatingChatWidgetProps {
  modules: ConfigModule[];
  currentCurrency: Currency;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const FloatingChatWidget: React.FC<FloatingChatWidgetProps> = ({
  modules,
  currentCurrency,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedModules = modules.filter((m) => m.isSelected);
  const totalWeeks = selectedModules.reduce((acc, m) => acc + m.timeWeeks, 0);
  const totalAED = BASE_SETUP_FEE_AED + totalWeeks * RATE_PER_WEEK_AED;

  const formatPrice = (amountAED: number) => {
    if (currentCurrency === 'USD') return `$${Math.round(amountAED * CURRENCY_RATES.USD).toLocaleString('en-US')}`;
    if (currentCurrency === 'RUB') return `${Math.round(amountAED * CURRENCY_RATES.RUB).toLocaleString('ru-RU')} ₽`;
    return `${Math.round(amountAED).toLocaleString('en-US')} AED`;
  };

  const initialGreeting: ChatMessage = {
    id: 'welcome',
    sender: 'assistant',
    text: `Здравствуйте, Елена! Я — ваш персональный AI-архитектор проекта Modern Medicine Dubai.
Я вижу текущий состав ТЗ: выбрано **${selectedModules.length} модулей** на сумму **${formatPrice(totalAED)}** со сроком реализации **${totalWeeks.toFixed(1)} нед.**

Вы можете задать мне любой вопрос о целесообразности конкретных модулей, сроках запуска MVP или интеграции с консьержами Fairmont.`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  // Quick suggestion chips
  const quickQuestions = [
    'Как запустить только MVP за 3 недели?',
    'Какие выгоды для Fairmont Suite 2105?',
    'Обоснуй выбранный состав модулей',
    'Как соблюдаются нормы DHA и защита данных?',
  ];

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          selectedModules,
          totalWeeks: parseFloat(totalWeeks.toFixed(1)),
          totalAED,
        }),
      });

      const data = await response.json();
      const assistantReply = data.reply || 'Спасибо за вопрос! Все модули согласованы и готовы к реализации.';

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: assistantReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `Елена, по вашей текущей конфигурации (${selectedModules.length} модулей, ${totalWeeks.toFixed(1)} нед., ${formatPrice(totalAED)}): состав полностью покрывает задачи клиники в Fairmont. Вы можете запустить MVP в приоритетном порядке за 3.5 недели.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              confetti({ particleCount: 25, spread: 40, origin: { x: 0.9, y: 0.9 } });
            }}
            className="group relative flex items-center gap-3 px-4 py-3.5 bg-[#222321] hover:bg-black text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 cursor-pointer"
          >
            {/* Animated Pulse */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7FA9BC] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#7FA9BC]" />
            </span>

            <div className="p-1 rounded-full bg-white/10 text-[#7FA9BC]">
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-[10px] text-[#7FA9BC] uppercase font-bold tracking-wider leading-none">
                AI Консультант ТЗ
              </div>
              <div className="text-xs font-serif font-bold text-white mt-0.5">
                Вопрос по ТЗ Елены ({selectedModules.length} мод.)
              </div>
            </div>

            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/20 text-white sm:ml-1">
              {totalWeeks.toFixed(0)} нед.
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] max-h-[85vh] h-[600px] bg-white rounded-3xl border border-[#E2DFD7] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
          
          {/* Header */}
          <div className="bg-[#222321] text-white p-4 sm:p-5 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#7FA9BC]/20 border border-[#7FA9BC]/40 flex items-center justify-center text-[#7FA9BC] shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-base text-white">AI Архитектор ТЗ</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded-full font-mono font-medium">Online</span>
                </div>
                <div className="text-[10px] text-[#F7F6F3]/70 font-light flex items-center gap-1">
                  <span>Контекст:</span>
                  <span className="text-[#7FA9BC] font-medium">{selectedModules.length} мод. • {totalWeeks.toFixed(1)} нед.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Scope Banner in Chat */}
          <div className="bg-[#F7F6F3] px-4 py-2 text-[11px] text-[#747775] border-b border-[#E2DFD7] flex items-center justify-between shrink-0">
            <span className="flex items-center gap-1 text-[#222321] font-medium">
              <Sliders className="w-3 h-3 text-[#7FA9BC]" />
              Бюджет: {formatPrice(totalAED)}
            </span>
            <span className="text-[10px] text-[#747775]">Suite 2105 • Fairmont Dubai</span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-[#222321] text-white rounded-br-none shadow-xs'
                      : 'bg-[#F7F6F3] border border-[#E2DFD7] text-[#222321] rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-[#747775] mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 bg-[#F7F6F3] rounded-2xl text-xs text-[#747775] border border-[#E2DFD7] w-fit">
                <div className="w-3.5 h-3.5 border-2 border-[#222321]/20 border-t-[#222321] rounded-full animate-spin" />
                <span>AI Архитектор анализирует параметры ТЗ...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2.5 bg-white border-t border-[#F1EDE6] overflow-x-auto hide-scrollbar shrink-0 flex gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-[10px] font-medium bg-[#F7F6F3] hover:bg-[#EFEDE8] text-[#222321] px-2.5 py-1.5 rounded-full border border-[#E2DFD7] whitespace-nowrap transition-colors shrink-0 cursor-pointer disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E2DFD7] flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Спросите о стоимости, сроках или модулях ТЗ..."
              disabled={isLoading}
              className="flex-1 p-2.5 bg-[#F7F6F3] border border-[#E2DFD7] rounded-xl text-xs focus:outline-none focus:border-[#222321] transition-colors"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-[#222321] hover:bg-black disabled:bg-[#EFEDE8] text-white disabled:text-[#747775] flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4 text-[#7FA9BC]" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
