
export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  createdAt: number;
}

export interface Budget {
  id: string;
  appointmentId: string;
  clientName: string;
  items: BudgetItem[];
  total: number;
  date: string;
  terms: string;
}

export interface BudgetItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface AgreementTrace {
  id: string;
  clientId: string;
  date: string;
  content: string;
  source: 'meeting' | 'email' | 'call';
  summary: string;
}

export interface DailyInfo {
  evangelio: string;
  efemerides: string[];
  santoral: string;
  indicadores: {
    uf: string;
    dolar: string;
    euro: string;
    ipc: string;
  };
}

export interface SurveyResponse {
  id: string;
  appointmentId: string;
  rating: number;
  comment: string;
  date: string;
}

export type View = 'dashboard' | 'scheduler' | 'budget' | 'history' | 'daily' | 'settings' | 'survey';
