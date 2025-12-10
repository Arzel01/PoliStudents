import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, Sparkles, BookOpen, Clock, Target, Lightbulb } from 'lucide-react';
import '../styles/pages/GeneratingPlan.css';

const loadingMessages = [
  'Analizando tu material de estudio...',
  'Identificando conceptos clave...',
  'Estructurando contenido por temas...',
  'Creando preguntas de repaso...',
  'Optimizando según tu técnica elegida...',
  'Generando sesiones de estudio...',
  'Distribuyendo el contenido...',
  'Añadiendo quizzes interactivos...',
  'Preparando tu calendario...',
  'Finalizando tu plan personalizado...'
];

export default function GeneratingPlan() {
  const navigate = useNavigate();
  const location = useLocation();
  const config = location.state?.config;

  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 60);

    // Message rotation
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 1500);

    // Simulate API call and redirect
    const timeout = setTimeout(() => {
      // In demo mode, we'll create a mock study plan
      const mockPlanId = 'demo-' + Date.now();
      navigate(`/plan/${mockPlanId}`, { 
        state: { 
          config,
          isDemo: true 
        } 
      });
    }, 6500);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(timeout);
    };
  }, [navigate, config]);

  const technique = config?.technique || 'pomodoro';
  const techniqueNames: Record<string, string> = {
    pomodoro: 'Pomodoro',
    spaced_repetition: 'Repetición Espaciada',
    active_recall: 'Recuerdo Activo',
    feynman: 'Técnica Feynman'
  };

  return (
    <div className="generating-page">
      <div className="generating-container">
        {/* Animated brain icon */}
        <div className="brain-container">
          <div className="brain-pulse"></div>
          <div className="brain-icon"><Brain size={48} /></div>
          <div className="sparkles">
            <span className="sparkle"><Sparkles size={16} /></span>
            <span className="sparkle"><Sparkles size={16} /></span>
            <span className="sparkle"><Sparkles size={16} /></span>
            <span className="sparkle"><Sparkles size={16} /></span>
          </div>
        </div>

        <h1 className="generating-title">
          Generando tu Plan de Estudio{dots}
        </h1>

        <p className="generating-message">
          {loadingMessages[messageIndex]}
        </p>

        {/* Progress bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{progress}%</span>
        </div>

        {/* Info cards */}
        <div className="info-cards">
          <div className="info-card">
            <span className="info-icon"><BookOpen size={24} /></span>
            <span className="info-label">Técnica</span>
            <span className="info-value">{techniqueNames[technique]}</span>
          </div>
          <div className="info-card">
            <span className="info-icon"><Clock size={24} /></span>
            <span className="info-label">Sesiones</span>
            <span className="info-value">
              {config?.mode === 'period' 
                ? `${config?.sessionsPerWeek}x semana`
                : `${config?.totalSessions} total`
              }
            </span>
          </div>
          <div className="info-card">
            <span className="info-icon"><Target size={24} /></span>
            <span className="info-label">Duración</span>
            <span className="info-value">
              {config?.sessionDuration || config?.customDuration || 45} min
            </span>
          </div>
        </div>

        {/* Tips */}
        <div className="tips-section">
          <h3><Lightbulb size={20} /> Sabías que...</h3>
          <p>
            La técnica {techniqueNames[technique]} puede aumentar tu retención 
            hasta en un 80% comparado con métodos tradicionales de estudio.
          </p>
        </div>
      </div>
    </div>
  );
}
