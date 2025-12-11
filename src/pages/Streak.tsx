import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Flame, 
  Check, 
  FileText, 
  Target, 
  Clock, 
  Sparkles,
  BookOpen,
  Calendar,
  ArrowLeft,
  Trophy,
  Star,
  Gem,
  Sprout,
  Users,
  Globe,
  Crown,
  Medal,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import '../styles/pages/Streak.css';

interface StreakData {
  current: number;
  longest: number;
  lastActivity: string;
  weeklyProgress: boolean[];
  totalQuizzes: number;
  totalCorrect: number;
}

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  streak: number;
  totalPoints: number;
  rank: number;
  isCurrentUser?: boolean;
  isFriend?: boolean;
}

// Datos simulados de usuarios para el ranking
const mockGlobalLeaderboard: LeaderboardUser[] = [
  { id: '1', name: 'María García', avatar: '👩‍🎓', streak: 45, totalPoints: 2340, rank: 1 },
  { id: '2', name: 'Carlos López', avatar: '👨‍💻', streak: 38, totalPoints: 2180, rank: 2 },
  { id: '3', name: 'Ana Martínez', avatar: '👩‍🔬', streak: 32, totalPoints: 1950, rank: 3 },
  { id: '4', name: 'José Rodríguez', avatar: '👨‍🎓', streak: 28, totalPoints: 1820, rank: 4 },
  { id: '5', name: 'Laura Sánchez', avatar: '👩‍💼', streak: 25, totalPoints: 1650, rank: 5 },
  { id: 'current', name: 'Tú', avatar: '🧑‍🎓', streak: 5, totalPoints: 890, rank: 23, isCurrentUser: true },
  { id: '6', name: 'Pedro Gómez', avatar: '👨‍🔬', streak: 22, totalPoints: 1480, rank: 6 },
  { id: '7', name: 'Sofia Torres', avatar: '👩‍🏫', streak: 20, totalPoints: 1350, rank: 7 },
  { id: '8', name: 'Diego Ruiz', avatar: '👨‍🎨', streak: 18, totalPoints: 1200, rank: 8 },
  { id: '9', name: 'Valentina Cruz', avatar: '👩‍🚀', streak: 15, totalPoints: 1050, rank: 9 },
  { id: '10', name: 'Andrés Morales', avatar: '👨‍🏫', streak: 12, totalPoints: 920, rank: 10 },
];

const mockFriendsLeaderboard: LeaderboardUser[] = [
  { id: '3', name: 'Ana Martínez', avatar: '👩‍🔬', streak: 32, totalPoints: 1950, rank: 1, isFriend: true },
  { id: '5', name: 'Laura Sánchez', avatar: '👩‍💼', streak: 25, totalPoints: 1650, rank: 2, isFriend: true },
  { id: 'current', name: 'Tú', avatar: '🧑‍🎓', streak: 5, totalPoints: 890, rank: 3, isCurrentUser: true },
  { id: '8', name: 'Diego Ruiz', avatar: '👨‍🎨', streak: 18, totalPoints: 1200, rank: 4, isFriend: true },
  { id: '10', name: 'Andrés Morales', avatar: '👨‍🏫', streak: 12, totalPoints: 920, rank: 5, isFriend: true },
];

export default function Streak() {
  const navigate = useNavigate();
  const location = useLocation();
  const quizResult = location.state;

  const [streak, setStreak] = useState<StreakData>({
    current: 5,
    longest: 12,
    lastActivity: new Date().toISOString(),
    weeklyProgress: [true, true, false, true, true, true, false],
    totalQuizzes: 23,
    totalCorrect: 89
  });

  const [showCelebration, setShowCelebration] = useState(false);
  const [activeTab, setActiveTab] = useState<'stats' | 'friends' | 'global'>('stats');

  useEffect(() => {
    // If coming from a quiz with a passing score, update streak
    if (quizResult?.quizCompleted && quizResult?.score >= (quizResult?.total * 0.6)) {
      setShowCelebration(true);
      setStreak(prev => ({
        ...prev,
        current: prev.current + 1,
        longest: Math.max(prev.longest, prev.current + 1),
        weeklyProgress: [...prev.weeklyProgress.slice(1), true],
        totalQuizzes: prev.totalQuizzes + 1,
        totalCorrect: prev.totalCorrect + (quizResult.score / quizResult.total * 100)
      }));

      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [quizResult]);

  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const milestones = [
    { days: 3, label: '3 días', icon: Sprout, unlocked: streak.current >= 3 },
    { days: 7, label: '1 semana', icon: Star, unlocked: streak.current >= 7 },
    { days: 14, label: '2 semanas', icon: Sparkles, unlocked: streak.current >= 14 },
    { days: 30, label: '1 mes', icon: Trophy, unlocked: streak.current >= 30 },
    { days: 60, label: '2 meses', icon: Gem, unlocked: streak.current >= 60 },
    { days: 100, label: '100 días', icon: Flame, unlocked: streak.current >= 100 },
  ];

  const nextMilestone = milestones.find(m => !m.unlocked) || milestones[milestones.length - 1];
  const NextMilestoneIcon = nextMilestone.icon;
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={20} className="rank-icon gold" />;
      case 2: return <Medal size={20} className="rank-icon silver" />;
      case 3: return <Medal size={20} className="rank-icon bronze" />;
      default: return <span className="rank-number">{rank}</span>;
    }
  };

  const currentUserRank = mockGlobalLeaderboard.find(u => u.isCurrentUser);

  return (
    <div className="streak-page">
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-content">
            <div className="confetti">
              {Array.from({ length: 50 }).map((_, i) => (
                <span key={i} className="confetti-piece" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  backgroundColor: ['#3399FF', '#00b894', '#ffd93d', '#66B3FF', '#2288EE'][Math.floor(Math.random() * 5)]
                }}></span>
              ))}
            </div>
            <div className="celebration-icon">
              <Flame size={48} />
            </div>
            <h2>¡Racha actualizada!</h2>
            <p>{streak.current} días seguidos</p>
          </div>
        </div>
      )}

      <div className="streak-container">
        <header className="streak-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={18} /> Inicio
          </button>
          <h1>Mi Racha</h1>
        </header>

        {/* Main Streak Display */}
        <section className="streak-main">
          <div className="streak-fire">
            <div className="fire-glow"></div>
            <Flame className="fire-icon" size={64} />
          </div>
          <div className="streak-number">{streak.current}</div>
          <div className="streak-label">días de racha</div>
          <div className="streak-best">
            Mejor racha: <strong>{streak.longest} días</strong>
          </div>
          {currentUserRank && (
            <div className="your-rank">
              <TrendingUp size={16} />
              Ranking global: <strong>#{currentUserRank.rank}</strong>
            </div>
          )}
        </section>

        {/* Tabs */}
        <div className="streak-tabs">
          <button 
            className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <Target size={18} /> Estadísticas
          </button>
          <button 
            className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            <Users size={18} /> Amigos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'global' ? 'active' : ''}`}
            onClick={() => setActiveTab('global')}
          >
            <Globe size={18} /> Global
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'stats' && (
            <>
              {/* Weekly Progress */}
              <section className="weekly-section">
                <h2>Esta semana</h2>
                <div className="weekly-grid">
                  {days.map((day, index) => (
                    <div 
                      key={day} 
                      className={`day-cell ${streak.weeklyProgress[index] ? 'completed' : ''} ${index === new Date().getDay() - 1 || (index === 6 && new Date().getDay() === 0) ? 'today' : ''}`}
                    >
                      <span className="day-name">{day}</span>
                      <div className="day-indicator">
                        {streak.weeklyProgress[index] && <Check size={14} />}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Stats */}
              <section className="stats-section">
                <h2>Estadísticas</h2>
                <div className="stats-grid">
                  <div className="stat-item">
                    <FileText className="stat-icon" size={24} />
                    <span className="stat-value">{streak.totalQuizzes}</span>
                    <span className="stat-label">Quizzes completados</span>
                  </div>
                  <div className="stat-item">
                    <Target className="stat-icon" size={24} />
                    <span className="stat-value">{Math.round(streak.totalCorrect / Math.max(streak.totalQuizzes, 1))}%</span>
                    <span className="stat-label">Promedio correcto</span>
                  </div>
                  <div className="stat-item">
                    <Clock className="stat-icon" size={24} />
                    <span className="stat-value">{streak.totalQuizzes * 15}</span>
                    <span className="stat-label">Minutos estudiados</span>
                  </div>
                </div>
              </section>

              {/* Milestones */}
              <section className="milestones-section">
                <h2>Hitos</h2>
                <div className="next-milestone">
                  <NextMilestoneIcon className="milestone-icon" size={32} />
                  <div className="milestone-info">
                    <span className="milestone-name">Próximo: {nextMilestone.label}</span>
                    <div className="milestone-progress">
                      <div 
                        className="milestone-fill"
                        style={{ width: `${Math.min(100, (streak.current / nextMilestone.days) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="milestone-remaining">
                      {nextMilestone.days - streak.current} días restantes
                    </span>
                  </div>
                </div>

                <div className="milestones-list">
                  {milestones.map((milestone) => {
                    const MilestoneIcon = milestone.icon;
                    return (
                      <div 
                        key={milestone.days}
                        className={`milestone-badge ${milestone.unlocked ? 'unlocked' : ''}`}
                      >
                        <MilestoneIcon className="badge-icon" size={20} />
                        <span className="badge-label">{milestone.label}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Motivational Quote */}
              <section className="motivation-section">
                <div className="quote-card">
                  <Sparkles className="quote-icon" size={24} />
                  <p className="quote-text">
                    "La consistencia es más importante que la perfección. 
                    ¡Cada día que estudias es un paso hacia tu meta!"
                  </p>
                </div>
              </section>
            </>
          )}

          {activeTab === 'friends' && (
            <section className="leaderboard-section">
              <div className="leaderboard-header">
                <h2><Users size={20} /> Ranking de Amigos</h2>
                <span className="leaderboard-count">{mockFriendsLeaderboard.length} amigos</span>
              </div>
              
              <div className="leaderboard-list">
                {mockFriendsLeaderboard.map((user) => (
                  <div 
                    key={user.id}
                    className={`leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}`}
                  >
                    <div className="rank-badge">
                      {getRankIcon(user.rank)}
                    </div>
                    <div className="user-avatar">{user.avatar}</div>
                    <div className="user-info">
                      <span className="user-name">
                        {user.name}
                        {user.isCurrentUser && <span className="you-badge">Tú</span>}
                      </span>
                      <span className="user-stats">
                        <Flame size={14} /> {user.streak} días · {user.totalPoints} pts
                      </span>
                    </div>
                    <ChevronRight size={18} className="item-arrow" />
                  </div>
                ))}
              </div>

              <div className="add-friends-card">
                <Users size={24} />
                <div className="add-friends-text">
                  <h3>Invita a tus amigos</h3>
                  <p>Compite y estudia junto a tus compañeros</p>
                </div>
                <button className="add-friends-btn">Invitar</button>
              </div>
            </section>
          )}

          {activeTab === 'global' && (
            <section className="leaderboard-section">
              <div className="leaderboard-header">
                <h2><Globe size={20} /> Ranking Global</h2>
                <span className="leaderboard-count">Top 10 + tu posición</span>
              </div>

              {/* Top 3 Podium */}
              <div className="podium">
                <div className="podium-item second">
                  <div className="podium-avatar">{mockGlobalLeaderboard[1].avatar}</div>
                  <span className="podium-name">{mockGlobalLeaderboard[1].name.split(' ')[0]}</span>
                  <span className="podium-streak"><Flame size={12} /> {mockGlobalLeaderboard[1].streak}</span>
                  <div className="podium-stand">2</div>
                </div>
                <div className="podium-item first">
                  <Crown size={24} className="podium-crown" />
                  <div className="podium-avatar">{mockGlobalLeaderboard[0].avatar}</div>
                  <span className="podium-name">{mockGlobalLeaderboard[0].name.split(' ')[0]}</span>
                  <span className="podium-streak"><Flame size={12} /> {mockGlobalLeaderboard[0].streak}</span>
                  <div className="podium-stand">1</div>
                </div>
                <div className="podium-item third">
                  <div className="podium-avatar">{mockGlobalLeaderboard[2].avatar}</div>
                  <span className="podium-name">{mockGlobalLeaderboard[2].name.split(' ')[0]}</span>
                  <span className="podium-streak"><Flame size={12} /> {mockGlobalLeaderboard[2].streak}</span>
                  <div className="podium-stand">3</div>
                </div>
              </div>
              
              <div className="leaderboard-list">
                {mockGlobalLeaderboard.slice(3).filter(u => !u.isCurrentUser).slice(0, 7).map((user) => (
                  <div 
                    key={user.id}
                    className={`leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}`}
                  >
                    <div className="rank-badge">
                      {getRankIcon(user.rank)}
                    </div>
                    <div className="user-avatar">{user.avatar}</div>
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-stats">
                        <Flame size={14} /> {user.streak} días · {user.totalPoints} pts
                      </span>
                    </div>
                    <ChevronRight size={18} className="item-arrow" />
                  </div>
                ))}

                {/* Current user position */}
                {currentUserRank && currentUserRank.rank > 10 && (
                  <>
                    <div className="leaderboard-divider">
                      <span>···</span>
                    </div>
                    <div className="leaderboard-item current-user">
                      <div className="rank-badge">
                        <span className="rank-number">{currentUserRank.rank}</span>
                      </div>
                      <div className="user-avatar">{currentUserRank.avatar}</div>
                      <div className="user-info">
                        <span className="user-name">
                          {currentUserRank.name}
                          <span className="you-badge">Tú</span>
                        </span>
                        <span className="user-stats">
                          <Flame size={14} /> {currentUserRank.streak} días · {currentUserRank.totalPoints} pts
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="ranking-tip">
                <TrendingUp size={18} />
                <p>Mantén tu racha para subir en el ranking. ¡Cada día cuenta!</p>
              </div>
            </section>
          )}
        </div>

        {/* Actions */}
        <div className="streak-actions">
          <button className="action-btn primary" onClick={() => navigate('/upload')}>
            <BookOpen size={18} /> Estudiar ahora
          </button>
          <button className="action-btn" onClick={() => navigate('/calendar')}>
            <Calendar size={18} /> Ver calendario
          </button>
        </div>
      </div>
    </div>
  );
}
