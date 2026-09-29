export type Language = 'ru' | 'en' | 'ar';
export type Currency = 'AED' | 'USD' | 'RUB';
export type ViewMode = 'configurator' | 'research' | 'competitors' | 'timeline' | 'analytics' | 'site';
export type ProtoMode = 'public' | 'portal' | 'b2b-concierge';

export interface MediaPlanItem {
  week: number;
  day: string;
  format: string;
  topic: string;
  speaker: string;
  description: string;
  cta: string;
}

export interface ConfigModule {
  id: string;
  title: string;
  description: string;
  timeWeeks: number;
  category: 'core' | 'marketing' | 'portal' | 'commerce';
  categoryLabel: string;
  highlight?: string;
  isSelected: boolean;
}

export type PresetType = 'mvp' | 'standard' | 'vip' | 'custom';

export interface SavedConfigurationVersion {
  id: string;
  name: string;
  tag: string;
  description: string;
  createdAt: string;
  moduleIds: string[];
}

export interface ServiceItem {
  id: number;
  title: string;
  category: 'aesthetics' | 'wellness' | 'diagnostics' | 'infusions';
  priceAED: number;
  duration: string;
  doctor: string;
  doctorRole: string;
  badge: string;
  prepNote: string;
  description: string;
  image: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  experience: string;
  quote: string;
  avatarText: string;
  image: string;
}

export interface Biomarker {
  id: string;
  name: string;
  category: string;
  unit: string;
  optimalRange: string;
  currentValue: number;
  status: 'optimal' | 'normal' | 'low' | 'high';
  history: { date: string; value: number }[];
  clinicalNote: string;
}

export interface Competitor {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  insurancePlansCount: number;
  keyFocus: string;
  threatLevel: 'threat-zero-km' | 'leader-szr' | 'leader-cis' | 'niche-luxury' | 'subject';
  threatLabel: string;
  pros: string;
  cons: string;
}

export interface TriageResult {
  serviceName: string;
  doctorName: string;
  recommendation: string;
  priceAED: number;
  urgency: string;
  preparation: string;
  keyHighlights: string[];
}

export interface AudioTranscriptItem {
  id: number;
  speaker: string;
  time: string;
  seconds: number;
  text: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  subtitle: string;
  durationLabel: string;
  audioUrl: string;
  category: string;
  description: string;
  contextTag: string;
  keyTopics: string[];
}

