import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { 
  Home, 
  Play, 
  Book, 
  Music, 
  FileText, 
  Crown, 
  BarChart3, 
  User, 
  LogOut,
  Clock,
  Star,
  Lock,
  Headphones,
  PlayCircle,
  Pause,
  Timer,
  Check,
  X,
  ChevronRight,
  Menu,
  Settings
} from 'lucide-react';
import { Progress } from './components/ui/progress';
import { Badge } from './components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet';
import { MobilePremium } from './components/MobilePremium';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  totalMeditationTime: number;
  streak: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface MeditationSession {
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

interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: number;
  category: 'meditation' | 'anxiety' | 'depression';
  image: string;
}

interface ProgressEntry {
  date: string;
  meditationTime: number;
  sessionsCompleted: number;
}

// Mock data
const mockUser: User = {
  id: '1',
  name: 'Mon Lumahan',
  email: 'monlouie@example.com',
  isPremium: false,
  totalMeditationTime: 1250, // minutes
  streak: 5,
  level: 'intermediate'
};

const mockMeditations: MeditationSession[] = [
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
    image: 'https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fDE3NTY3MTMwOTJ8MA&ixlib=rb-4.1.0&q=80&w=400',
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

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Science Behind Meditation',
    excerpt: 'Discover how meditation changes your brain and improves mental health',
    readTime: 5,
    category: 'meditation',
    image: 'https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fDE3NTY3MTMwOTJ8MA&ixlib=rb-4.1.0&q=80&w=400'
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

const musicTracks = [
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

const mockProgress: ProgressEntry[] = [
  { date: '2025-08-26', meditationTime: 25, sessionsCompleted: 2 },
  { date: '2025-08-27', meditationTime: 15, sessionsCompleted: 1 },
  { date: '2025-08-28', meditationTime: 30, sessionsCompleted: 2 },
  { date: '2025-08-29', meditationTime: 20, sessionsCompleted: 1 },
  { date: '2025-08-30', meditationTime: 35, sessionsCompleted: 3 },
  { date: '2025-08-31', meditationTime: 18, sessionsCompleted: 1 },
  { date: '2025-09-01', meditationTime: 22, sessionsCompleted: 2 }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<User>(mockUser);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [meditationTimer, setMeditationTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showUpgradeConfirmation, setShowUpgradeConfirmation] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showLoginSheet, setShowLoginSheet] = useState(false);
  const [showMenuSheet, setShowMenuSheet] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && meditationTimer > 0) {
      interval = setInterval(() => {
        setMeditationTimer(time => time - 1);
      }, 1000);
    } else if (meditationTimer === 0 && isTimerActive) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, meditationTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startMeditation = (duration: number) => {
    setMeditationTimer(duration * 60);
    setIsTimerActive(true);
    setActiveTab('timer');
  };

  const upgradeToPremium = (planType: string, price: string) => {
    setSelectedPlan(`${planType} - ${price}`);
    setUser(prev => ({ ...prev, isPremium: true }));
    setShowUpgradeConfirmation(true);
  };

  const cancelPremium = () => {
    setUser(prev => ({ ...prev, isPremium: false }));
  };

  // Mobile login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center p-4">
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2">TranquilMind</h1>
            <p className="text-gray-600">Find your inner peace</p>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" className="h-12" />
                </div>
                <Button 
                  className="w-full h-12 text-base" 
                  onClick={() => setIsLoggedIn(true)}
                >
                  Sign In
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => setShowLoginSheet(true)}
              className="text-gray-600"
            >
              Don't have an account? Sign up
            </Button>
          </div>
        </div>

        {/* Register Sheet */}
        <Sheet open={showLoginSheet} onOpenChange={setShowLoginSheet}>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Create Account</SheetTitle>
              <SheetDescription>Join TranquilMind and start your meditation journey</SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-reg">Email</Label>
                <Input id="email-reg" type="email" placeholder="Enter your email" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-reg">Password</Label>
                <Input id="password-reg" type="password" placeholder="Create a password" className="h-12" />
              </div>
              <Button 
                className="w-full h-12 text-base" 
                onClick={() => {
                  setIsLoggedIn(true);
                  setShowLoginSheet(false);
                }}
              >
                Create Account
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg">TranquilMind</h1>
            {user.isPremium && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">
                Premium
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-600">
              {Math.floor(user.totalMeditationTime / 60)}h {user.totalMeditationTime % 60}m
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMenuSheet(true)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20">
        <div className="p-4">
          {/* Home Screen */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="text-center py-6">
                <h2 className="text-2xl mb-2">Welcome back, {user.name.split(' ')[0]}</h2>
                {user.isPremium ? (
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Crown className="h-4 w-4 text-yellow-500" />
                    <p className="text-gray-600 text-sm">Enjoying your premium journey!</p>
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm mb-4">Ready for your daily practice?</p>
                )}
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-xl mb-1">{user.streak}</div>
                    <div className="text-xs text-gray-600">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl mb-1">{Math.floor(user.totalMeditationTime / 60)}</div>
                    <div className="text-xs text-gray-600">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl mb-1 capitalize">{user.level}</div>
                    <div className="text-xs text-gray-600">Level</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Card className="cursor-pointer active:scale-95 transition-transform" onClick={() => setActiveTab('meditations')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-base">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Play className="h-5 w-5 text-blue-600" />
                      </div>
                      Start Meditation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-3">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1606733572375-35620adc4a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fDE3NTY3MTMwOTJ8MA&ixlib=rb-4.1.0&q=80&w=400" 
                        alt="Meditation" 
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Begin your guided session</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer active:scale-95 transition-transform" onClick={() => setActiveTab('timer')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-base">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Timer className="h-5 w-5 text-green-600" />
                      </div>
                      Free Meditation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Set your own timer</p>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer active:scale-95 transition-transform" onClick={() => setActiveTab('music')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-base">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Music className="h-5 w-5 text-purple-600" />
                      </div>
                      Calming Sounds
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Nature & ambient music</p>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Recommendation */}
              <div>
                <h3 className="text-lg mb-3">Today's Recommendation</h3>
                <Card className="overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback 
                      src={mockMeditations[0].image}
                      alt={mockMeditations[0].title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <Button 
                        size="sm" 
                        onClick={() => startMeditation(mockMeditations[0].duration)}
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-base">{mockMeditations[0].title}</CardTitle>
                    <CardDescription className="text-sm">{mockMeditations[0].description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          )}

          {/* Meditations Screen */}
          {activeTab === 'meditations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl">Guided Sessions</h2>
                {user.isPremium && (
                  <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                    All {mockMeditations.length} unlocked!
                  </Badge>
                )}
              </div>
              
              <div className="space-y-4">
                {mockMeditations.map((meditation) => (
                  <Card key={meditation.id} className="overflow-hidden">
                    <div className="flex">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <ImageWithFallback 
                          src={meditation.image} 
                          alt={meditation.title}
                          className="w-full h-full object-cover"
                        />
                        {meditation.isPremium && (
                          <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-xs p-1">
                            <Crown className="h-2 w-2" />
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-medium line-clamp-1">{meditation.title}</h3>
                          <Badge variant="outline" className="text-xs ml-2">{meditation.level}</Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{meditation.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {meditation.duration} min
                            </span>
                            <span>{meditation.instructor}</span>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => startMeditation(meditation.duration)}
                            disabled={meditation.isPremium && !user.isPremium}
                            className="h-8 px-3 text-xs"
                          >
                            {meditation.isPremium && !user.isPremium ? (
                              <>
                                <Lock className="h-3 w-3 mr-1" />
                                Premium
                              </>
                            ) : (
                              <>
                                <PlayCircle className="h-3 w-3 mr-1" />
                                Start
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Music Screen */}
          {activeTab === 'music' && (
            <div className="space-y-4">
              <h2 className="text-xl">Calming Sounds</h2>
              <div className="space-y-3">
                {musicTracks.map((track) => (
                  <Card key={track.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (currentlyPlaying === track.id) {
                              setIsPlaying(!isPlaying);
                            } else {
                              setCurrentlyPlaying(track.id);
                              setIsPlaying(true);
                            }
                          }}
                          className="w-10 h-10 p-0"
                        >
                          {currentlyPlaying === track.id && isPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <PlayCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <div>
                          <h4 className="text-sm font-medium">{track.title}</h4>
                          <p className="text-xs text-gray-600 capitalize">{track.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">{track.duration}</span>
                        <Headphones className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    {currentlyPlaying === track.id && (
                      <div className="mt-3">
                        <Progress value={33} className="h-1" />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>2:45</span>
                          <span>{track.duration}</span>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Progress Screen */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <h2 className="text-xl">Your Progress</h2>
              
              {/* Weekly Stats */}
              <div className="grid grid-cols-1 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl mb-2">156 minutes</div>
                    <p className="text-sm text-gray-600 mb-3">Total meditation time</p>
                    <Progress value={78} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Current Streak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl mb-2">{user.streak} days</div>
                    <p className="text-sm text-gray-600 mb-3">Keep it going!</p>
                    <Progress value={user.streak * 10} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Sessions Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl mb-2">12 sessions</div>
                    <p className="text-sm text-gray-600 mb-3">This week</p>
                    <Progress value={60} className="h-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Daily Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Daily Activity</CardTitle>
                  <CardDescription className="text-sm">Your meditation over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockProgress.map((entry) => (
                      <div key={entry.date} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">
                            {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </div>
                          <div className="text-xs text-gray-600">{entry.sessionsCompleted} sessions</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{entry.meditationTime} min</div>
                          <Progress value={(entry.meditationTime / 40) * 100} className="w-16 h-1 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Premium Screen */}
          {activeTab === 'premium' && (
            <MobilePremium
              user={user}
              selectedPlan={selectedPlan}
              onUpgrade={upgradeToPremium}
              onCancel={cancelPremium}
            />
          )}

          {/* Articles Screen */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              <h2 className="text-xl">Articles & Resources</h2>
              <div className="space-y-4">
                {mockArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <ImageWithFallback 
                        src={article.image} 
                        alt={article.title}
                        className="w-20 h-20 object-cover flex-shrink-0"
                      />
                      <div className="p-4 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">{article.category}</Badge>
                          <span className="text-xs text-gray-600">{article.readTime} min read</span>
                        </div>
                        <h3 className="text-sm font-medium mb-2">{article.title}</h3>
                        <p className="text-xs text-gray-600 line-clamp-2">{article.excerpt}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Guide Screen */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              <h2 className="text-xl">Meditation Guide</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">How to Meditate</CardTitle>
                  <CardDescription className="text-sm">Complete beginner's guide to meditation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">1. Find a Comfortable Position</h4>
                    <p className="text-xs text-gray-600">Sit with your back straight, either on a chair or cross-legged on the floor.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">2. Close Your Eyes</h4>
                    <p className="text-xs text-gray-600">Gently close your eyes or soften your gaze downward.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">3. Focus on Your Breath</h4>
                    <p className="text-xs text-gray-600">Pay attention to the natural rhythm of your breathing.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">4. Notice Your Thoughts</h4>
                    <p className="text-xs text-gray-600">When thoughts arise, acknowledge them and return focus to your breath.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Breathing Techniques</CardTitle>
                  <CardDescription className="text-sm">Learn powerful breathing exercises</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">4-7-8 Breathing</h4>
                    <p className="text-xs text-gray-600">Inhale for 4, hold for 7, exhale for 8. Great for relaxation.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Box Breathing</h4>
                    <p className="text-xs text-gray-600">Inhale for 4, hold for 4, exhale for 4, hold for 4. Builds focus.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Belly Breathing</h4>
                    <p className="text-xs text-gray-600">Deep breathing into your diaphragm to activate relaxation response.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Alternate Nostril</h4>
                    <p className="text-xs text-gray-600">Breathing through one nostril at a time to balance energy.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tips for Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Start Small</h4>
                      <p className="text-xs text-gray-600">Begin with just 5 minutes daily and gradually increase.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Be Consistent</h4>
                      <p className="text-xs text-gray-600">Practice at the same time each day to build a habit.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Don't Judge</h4>
                      <p className="text-xs text-gray-600">There's no "perfect" meditation. Every session is valuable.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Find Your Space</h4>
                      <p className="text-xs text-gray-600">Create a quiet, comfortable environment for practice.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Timer Screen */}
          {activeTab === 'timer' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-xl mb-8">Meditation Timer</h2>
                
                <div className="text-6xl font-mono mb-8">
                  {formatTime(meditationTimer)}
                </div>
                
                <div className="flex justify-center gap-4 mb-8">
                  <Button
                    onClick={() => setIsTimerActive(!isTimerActive)}
                    disabled={meditationTimer === 0}
                    size="lg"
                    className="h-12 px-8"
                  >
                    {isTimerActive ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <PlayCircle className="h-5 w-5 mr-2" />
                        Start
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMeditationTimer(0);
                      setIsTimerActive(false);
                    }}
                    size="lg"
                    className="h-12 px-8"
                  >
                    Reset
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setMeditationTimer(5 * 60)}
                    disabled={isTimerActive}
                    className="h-12"
                  >
                    5 min
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setMeditationTimer(10 * 60)}
                    disabled={isTimerActive}
                    className="h-12"
                  >
                    10 min
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setMeditationTimer(15 * 60)}
                    disabled={isTimerActive}
                    className="h-12"
                  >
                    15 min
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setMeditationTimer(20 * 60)}
                    disabled={isTimerActive}
                    className="h-12"
                  >
                    20 min
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setMeditationTimer(30 * 60)}
                    disabled={isTimerActive}
                    className="h-12"
                  >
                    30 min
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setMeditationTimer(60 * 60)}
                    disabled={isTimerActive}
                    className="h-12"
                  >
                    60 min
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab('meditations')}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'meditations' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <Play className="h-5 w-5" />
            <span className="text-xs">Sessions</span>
          </button>
          
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'timer' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <Timer className="h-5 w-5" />
            <span className="text-xs">Timer</span>
          </button>
          
          <button
            onClick={() => setActiveTab('music')}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'music' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <Music className="h-5 w-5" />
            <span className="text-xs">Sounds</span>
          </button>
          
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'progress' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Progress</span>
          </button>
        </div>
      </div>

      {/* Menu Sheet */}
      <Sheet open={showMenuSheet} onOpenChange={setShowMenuSheet}>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-left">{user.name}</SheetTitle>
                <SheetDescription className="text-left">{user.email}</SheetDescription>
              </div>
            </div>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            <Button
              variant="ghost"
              className="w-full justify-start h-12"
              onClick={() => {
                setActiveTab('premium');
                setShowMenuSheet(false);
              }}
            >
              <Crown className="h-5 w-5 mr-3" />
              {user.isPremium ? 'Manage Premium' : 'Upgrade to Premium'}
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start h-12"
              onClick={() => {
                setActiveTab('guide');
                setShowMenuSheet(false);
              }}
            >
              <Book className="h-5 w-5 mr-3" />
              Meditation Guide
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start h-12"
              onClick={() => {
                setActiveTab('articles');
                setShowMenuSheet(false);
              }}
            >
              <FileText className="h-5 w-5 mr-3" />
              Articles & Resources
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start h-12"
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
            
            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start h-12 text-red-600"
                onClick={() => setIsLoggedIn(false)}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Upgrade Confirmation Dialog */}
      <Dialog open={showUpgradeConfirmation} onOpenChange={setShowUpgradeConfirmation}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full w-16 h-16 flex items-center justify-center">
                <Crown className="h-8 w-8" />
              </div>
            </div>
            <DialogTitle className="text-center">Welcome to Premium!</DialogTitle>
            <DialogDescription className="text-center text-sm">
              You've successfully upgraded to {selectedPlan}. 
              <br />
              <br />
              You now have access to:
              <ul className="mt-4 text-left space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  All premium meditation sessions
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Extended music library
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Advanced progress tracking
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Priority support
                </li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button onClick={() => setShowUpgradeConfirmation(false)} className="w-full h-12">
              Start Meditating
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}