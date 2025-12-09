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
  Sprout
} from 'lucide-react';
import './Streak.css';

interface StreakData {
  current: number;
  longest: number;
  lastActivity: string;
  weeklyProgress: boolean[];
  totalQuizzes: number;
  totalCorrect: number;
}

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
                  backgroundColor: ['#6c5ce7', '#00b894', '#ffd93d', '#ff9f43', '#ff6b6b'][Math.floor(Math.random() * 5)]
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
        </section>

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
