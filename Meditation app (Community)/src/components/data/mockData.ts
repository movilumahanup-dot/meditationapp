import { User, MeditationSession, Article, ProgressEntry, MusicTrack } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Mon Lumahan',
  email: 'monlouie@example.com',
  isPremium: false,
  totalMeditationTime: 1250, // minutes
  streak: 5,
  level: 'intermediate'
};

export const mockMeditations: MeditationSession[] = [
  {
    id: '1',
    title: 'Morning Mindfulness',
    description: 'Start your day with peaceful awareness and gentle breathing',
    duration: 10,
    level: 'beginner',
    isPremium: false,
    instructor: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTY3MTMwOTJ8MA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'mindfulness'
  },
  {
    id: '2',
    title: 'Deep Sleep Meditation',
    description: 'Drift into peaceful sleep with guided relaxation',
    duration: 20,
    level: 'intermediate',
    isPremium: true,
    instructor: 'Michael Torres',
    image: 'https://images.unsplash.com/photo-1655943508401-5f1e2cce820e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fDE3NTY3MTMwOTV8MA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'sleep'
  },
  {
    id: '3',
    title: 'Anxiety Relief Session',
    description: 'Calm your mind and reduce stress with breathing techniques',
    duration: 15,
    level: 'beginner',
    isPremium: false,
    instructor: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1644191468715-919925ed26e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fDE3NTY2OTM1ODl8MA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'anxiety'
  },
  {
    id: '4',
    title: 'Advanced Concentration',
    description: 'Deepen your focus with advanced meditation techniques',
    duration: 30,
    level: 'advanced',
    isPremium: true,
    instructor: 'David Kim',
    image: 'https://images.unsplash.com/photo-1738567701323-ec2ac3f32404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fDE3NTY3MTM4MDl8MA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'focus'
  },
  {
    id: '5',
    title: 'Premium Body Scan',
    description: 'Complete relaxation through systematic body awareness',
    duration: 25,
    level: 'intermediate',
    isPremium: true,
    instructor: 'Lisa Chen',
    image: 'https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTY3MTMwOTJ8MA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'relaxation'
  },
  {
    id: '6',
    title: 'Healing Meditation',
    description: 'Promote inner healing and emotional balance',
    duration: 35,
    level: 'advanced',
    isPremium: true,
    instructor: 'James Rodriguez',
    image: 'https://images.unsplash.com/photo-1644191468715-919925ed26e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fDE3NTY2OTM1ODl8MA&ixlib=rb-4.1.0&q=80&w=400',
    category: 'healing'
  }
];

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Science Behind Meditation',
    excerpt: 'Discover how meditation changes your brain and improves mental health',
    readTime: 5,
    category: 'meditation',
    image: 'https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTY3MTMwOTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: '2',
    title: 'Managing Anxiety Through Breathing',
    excerpt: 'Learn powerful breathing techniques to calm anxiety and stress',
    readTime: 7,
    category: 'anxiety',
    image: 'https://images.unsplash.com/photo-1655943508401-5f1e2cce820e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fDE3NTY3MTMwOTV8MA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: '3',
    title: 'Meditation for Depression Relief',
    excerpt: 'How mindfulness practices can support mental health recovery',
    readTime: 8,
    category: 'depression',
    image: 'https://images.unsplash.com/photo-1644191468715-919925ed26e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fDE3NTY2OTM1ODl8MA&ixlib=rb-4.1.0&q=80&w=400'
  }
];

export const musicTracks: MusicTrack[] = [
  { id: '1', title: 'Forest Rain', duration: '10:30', category: 'nature' },
  { id: '2', title: 'Ocean Waves', duration: '8:45', category: 'nature' },
  { id: '3', title: 'Tibetan Bowls', duration: '12:15', category: 'ambient' },
  { id: '4', title: 'Wind Chimes', duration: '9:20', category: 'ambient' },
  { id: '5', title: 'Gentle Piano', duration: '11:05', category: 'instrumental' },
  { id: '6', title: 'Meditation Bells', duration: '7:30', category: 'traditional' },
  { id: '7', title: 'Peaceful Flute', duration: '13:45', category: 'instrumental' },
  { id: '8', title: 'Nature Symphony', duration: '15:20', category: 'nature' },
  { id: '9', title: 'Crystal Tones', duration: '6:40', category: 'ambient' },
  { id: '10', title: 'Calm Waters', duration: '14:10', category: 'nature' }
];

export const mockProgress: ProgressEntry[] = [
  { date: '2025-08-26', meditationTime: 25, sessionsCompleted: 2 },
  { date: '2025-08-27', meditationTime: 15, sessionsCompleted: 1 },
  { date: '2025-08-28', meditationTime: 30, sessionsCompleted: 2 },
  { date: '2025-08-29', meditationTime: 20, sessionsCompleted: 1 },
  { date: '2025-08-30', meditationTime: 35, sessionsCompleted: 3 },
  { date: '2025-08-31', meditationTime: 18, sessionsCompleted: 1 },
  { date: '2025-09-01', meditationTime: 22, sessionsCompleted: 2 }
];