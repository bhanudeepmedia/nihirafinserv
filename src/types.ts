export interface ServiceStats {
  label: string;
  value: string;
}

export interface CaseExample {
  client: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  detailIntro: string;
  howItWorks: string[];
  benefits: string[];
  caseExample: CaseExample;
  imageUrl: string;
  stats: ServiceStats;
  order: number;
  isVisible: boolean;
  faqs: FAQItem[];
}

export type PageId = 'home' | 'services' | 'about' | 'success-stories' | 'emi-calculator' | 'contact' | 'admin';

export interface ConsultationRequest {
  fullName: string;
  email: string;
  phone: string;
  serviceOfInterest: string;
  wealthBracket: string;
  message: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  clientType: string;
  metrics: { label: string; value: string }[];
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  outcome: string;
  imageUrl: string;
}
