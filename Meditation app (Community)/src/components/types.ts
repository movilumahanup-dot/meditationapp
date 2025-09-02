// Shared types for TranquilMind app
export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  totalMeditationTime: number;
  streak: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  isPremium: boolean;
  instructor: string;
  image: string;
  category: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: number;
  category: 'meditation' | 'anxiety' | 'depression';
  image: string;
}

export interface ProgressEntry {
  date: string;
  meditationTime: number;
  sessionsCompleted: number;
}

export interface MusicTrack {
  id: string;
  title: string;
  duration: string;
  category: string;
}