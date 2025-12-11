// Shared types for Custolia frontend

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Profile {
  user: User;
  streak_days: number;
  last_study_date: string | null;
  plan: number | null;
}

export interface SubscriptionPlan {
  id: number;
  name: 'free' | 'student' | 'personal' | 'enterprise';
  price: string;
  monthly_quota: number;
}

export interface StudyMaterial {
  id: number;
  owner: User;
  title: string;
  description: string;
  uploaded_at: string;
  file: string | null;
  extracted_text: string;
}

export interface Lesson {
  title: string;
  summary?: string;
  content?: string;
  activities?: string[];
}

export interface StudyRoute {
  id: number;
  owner: User;
  title: string;
  created_at: string;
  content: {
    title: string;
    technique: string;
    lessons: Lesson[];
  };
  technique: string;
}

export interface CalendarEvent {
  id: number;
  owner: number;
  title: string;
  start: string;
  end: string;
  google_event_id: string | null;
  notified: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
