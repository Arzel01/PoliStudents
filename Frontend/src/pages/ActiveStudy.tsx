import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Play, Pause, RotateCcw, ChevronRight, ChevronDown,
  BookOpen, Brain, Lightbulb, CheckCircle, Star,
  Volume2, VolumeX, Coffee, Target
} from 'lucide-react';
import { getContentForLesson, type TopicContent, type Example } from '../data/studyContent';
import '../styles/pages/ActiveStudy.css';

// Configuración de técnicas de estudio
const techniqueConfigs = {
  pomodoro: {
    name: 'Técnica Pomodoro',
    studyTime: 25 * 60, // 25 minutos en segundos
    breakTime: 5 * 60,  // 5 minutos de descanso
    longBreakTime: 15 * 60, // 15 minutos cada 4 pomodoros
    sessionsBeforeLongBreak: 4,
    description: 'Estudia 25 min, descansa 5 min. Cada 4 sesiones, descansa 15 min.',
    color: '#e74c3c'
  },
  spaced_repetition: {
    name: 'Repetición Espaciada',
    studyTime: 30 * 60,
    breakTime: 10 * 60,
    description: 'Revisa el material en intervalos crecientes para mejor retención.',
    color: '#3498db'
  },
  active_recall: {
    name: 'Recuerdo Activo',
    studyTime: 20 * 60,
    breakTime: 5 * 60,
    description: 'Lee, cierra el material, intenta recordar, y luego verifica.',
    color: '#2ecc71'
  },
  feynman: {
    name: 'Técnica Feynman',
    studyTime: 35 * 60,
    breakTime: 10 * 60,
    description: 'Aprende explicando el concepto como si le enseñaras a un niño.',
    color: '#9b59b6'
  }
};

type TechniqueKey = keyof typeof techniqueConfigs;
type TimerPhase = 'study' | 'break' | 'longBreak';

export default function ActiveStudy() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lessonId } = useParams();
  
  // Estado del contenido
  const [content, setContent] = useState<TopicContent | null>(null);
  const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['theory']));
  const [completedSubtopics, setCompletedSubtopics] = useState<Set<number>>(new Set());
  
  // Estado del timer
  const [technique, setTechnique] = useState<TechniqueKey>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(techniqueConfigs.pomodoro.studyTime);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<TimerPhase>('study');
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Refs
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cargar contenido
  useEffect(() => {
    if (lessonId) {
      const topicContent = getContentForLesson(lessonId);
      if (topicContent) {
        setContent(topicContent);
      }
    }
    
    // Obtener técnica de la configuración
    const config = location.state?.config;
    if (config?.technique && config.technique in techniqueConfigs) {
      setTechnique(config.technique as TechniqueKey);
      setTimeLeft(techniqueConfigs[config.technique as TechniqueKey].studyTime);
    }
  }, [lessonId, location.state]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handlePhaseComplete();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handlePhaseComplete = () => {
    // Sonido de notificación
    if (soundEnabled) {
      playNotificationSound();
    }

    const config = techniqueConfigs[technique];

    if (phase === 'study') {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      
      // Marcar subtema actual como completado
      setCompletedSubtopics(prev => new Set([...prev, currentSubtopicIndex]));

      if (technique === 'pomodoro' && 'sessionsBeforeLongBreak' in config && newCount % config.sessionsBeforeLongBreak === 0) {
        setPhase('longBreak');
        setTimeLeft((config as typeof techniqueConfigs.pomodoro).longBreakTime);
      } else {
        setPhase('break');
        setTimeLeft(config.breakTime);
      }
    } else {
      setPhase('study');
      setTimeLeft(config.studyTime);
      
      // Avanzar al siguiente subtema si hay más
      if (content && currentSubtopicIndex < content.subtopics.length - 1) {
        setCurrentSubtopicIndex(prev => prev + 1);
      }
    }

    setIsRunning(false);
  };

  const playNotificationSound = () => {
    // Crear un beep simple usando Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    setTimeout(() => oscillator.stop(), 200);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(techniqueConfigs[technique].studyTime);
    setPhase('study');
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const goToSubtopic = (index: number) => {
    setCurrentSubtopicIndex(index);
  };

  const startQuiz = () => {
    navigate(`/quiz/${lessonId}`, {
      state: {
        config: location.state?.config,
        fromStudy: true
      }
    });
  };

  const currentSubtopic = content?.subtopics[currentSubtopicIndex];
  const config = techniqueConfigs[technique];
  const progress = content ? ((currentSubtopicIndex + 1) / content.subtopics.length) * 100 : 0;

  if (!content) {
    return (
      <div className="active-study-page">
        <div className="loading-content">
          <BookOpen size={48} />
          <p>Cargando contenido...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="active-study-page">
      {/* Header */}
      <header className="study-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Volver
        </button>
        <div className="header-info">
          <h1>{content.title}</h1>
          <span className="technique-badge" style={{ background: config.color }}>
            {config.name}
          </span>
        </div>
        <button 
          className="sound-toggle"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </header>

      <div className="study-layout">
        {/* Panel izquierdo - Timer y navegación */}
        <aside className="study-sidebar">
          {/* Timer */}
          <div className={`timer-card ${phase}`}>
            <div className="timer-phase">
              {phase === 'study' && <><Brain size={20} /> Estudiando</>}
              {phase === 'break' && <><Coffee size={20} /> Descanso</>}
              {phase === 'longBreak' && <><Coffee size={20} /> Descanso largo</>}
            </div>
            
            <div className="timer-display">
              <svg className="timer-ring" viewBox="0 0 100 100">
                <circle className="timer-bg" cx="50" cy="50" r="45" />
                <circle 
                  className="timer-progress" 
                  cx="50" cy="50" r="45"
                  style={{
                    strokeDasharray: `${(timeLeft / (phase === 'study' ? config.studyTime : phase === 'break' ? config.breakTime : config.breakTime!)) * 283} 283`,
                    stroke: config.color
                  }}
                />
              </svg>
              <span className="timer-time">{formatTime(timeLeft)}</span>
            </div>

            <div className="timer-controls">
              <button className="timer-btn" onClick={toggleTimer}>
                {isRunning ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button className="timer-btn secondary" onClick={resetTimer}>
                <RotateCcw size={20} />
              </button>
            </div>

            {technique === 'pomodoro' && (
              <div className="pomodoro-count">
                🍅 {pomodoroCount} pomodoro{pomodoroCount !== 1 ? 's' : ''} completado{pomodoroCount !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Navegación de subtemas */}
          <div className="subtopics-nav">
            <h3><Target size={16} /> Temas</h3>
            <div className="subtopics-list">
              {content.subtopics.map((subtopic, index) => (
                <button
                  key={subtopic.id}
                  className={`subtopic-item ${index === currentSubtopicIndex ? 'active' : ''} ${completedSubtopics.has(index) ? 'completed' : ''}`}
                  onClick={() => goToSubtopic(index)}
                >
                  <span className="subtopic-number">{index + 1}</span>
                  <span className="subtopic-title">{subtopic.title}</span>
                  {completedSubtopics.has(index) && <CheckCircle size={16} />}
                </button>
              ))}
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="progress-text">{Math.round(progress)}% completado</span>
          </div>

          {/* Botón de Quiz */}
          <button className="quiz-btn" onClick={startQuiz}>
            <Star size={20} /> Tomar Quiz
          </button>
        </aside>

        {/* Panel principal - Contenido */}
        <main className="study-content">
          {/* Introducción */}
          {currentSubtopicIndex === 0 && (
            <section className="intro-section">
              <Lightbulb size={24} />
              <p>{content.introduction}</p>
            </section>
          )}

          {/* Contenido del subtema actual */}
          {currentSubtopic && (
            <div className="subtopic-content">
              <h2>{currentSubtopic.title}</h2>

              {/* Teoría */}
              <div className="content-section">
                <button 
                  className="section-header"
                  onClick={() => toggleSection('theory')}
                >
                  <BookOpen size={20} />
                  <span>Teoría</span>
                  {expandedSections.has('theory') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.has('theory') && (
                  <div className="section-content theory-content">
                    {currentSubtopic.theory.map((paragraph, i) => (
                      <p key={i} className={paragraph.includes(':') && paragraph.indexOf(':') < 30 ? 'highlight' : ''}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Fórmulas */}
              {currentSubtopic.formulas && currentSubtopic.formulas.length > 0 && (
                <div className="content-section">
                  <button 
                    className="section-header"
                    onClick={() => toggleSection('formulas')}
                  >
                    <span className="formula-icon">∑</span>
                    <span>Fórmulas Clave</span>
                    {expandedSections.has('formulas') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>
                  {expandedSections.has('formulas') && (
                    <div className="section-content formulas-content">
                      {currentSubtopic.formulas.map((formula, i) => (
                        <div key={i} className="formula-card">
                          <code>{formula}</code>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Ejemplos */}
              <div className="content-section">
                <button 
                  className="section-header"
                  onClick={() => toggleSection('examples')}
                >
                  <Lightbulb size={20} />
                  <span>Ejemplos Resueltos</span>
                  {expandedSections.has('examples') ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                {expandedSections.has('examples') && (
                  <div className="section-content examples-content">
                    {currentSubtopic.examples.map((example, i) => (
                      <ExampleCard key={i} example={example} index={i} />
                    ))}
                  </div>
                )}
              </div>

              {/* Tips */}
              {currentSubtopic.tips && currentSubtopic.tips.length > 0 && (
                <div className="content-section tips-section">
                  <h4>💡 Consejos</h4>
                  <ul>
                    {currentSubtopic.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Resumen al final */}
          {currentSubtopicIndex === content.subtopics.length - 1 && (
            <div className="summary-section">
              <h3>📝 Resumen del Tema</h3>
              <ul>
                {content.summary.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Navegación entre subtemas */}
          <div className="content-navigation">
            <button 
              className="nav-btn prev"
              disabled={currentSubtopicIndex === 0}
              onClick={() => goToSubtopic(currentSubtopicIndex - 1)}
            >
              <ArrowLeft size={18} /> Anterior
            </button>
            
            {currentSubtopicIndex < content.subtopics.length - 1 ? (
              <button 
                className="nav-btn next"
                onClick={() => goToSubtopic(currentSubtopicIndex + 1)}
              >
                Siguiente <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                className="nav-btn quiz"
                onClick={startQuiz}
              >
                Ir al Quiz <Star size={18} />
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// Componente para mostrar ejemplos
function ExampleCard({ example, index }: { example: Example; index: number }) {
  const [showSolution, setShowSolution] = useState(false);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#2ecc71';
      case 'medium': return '#f39c12';
      case 'hard': return '#e74c3c';
      default: return '#999';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Medio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  return (
    <div className="example-card">
      <div className="example-header">
        <span className="example-number">Ejemplo {index + 1}</span>
        <span 
          className="difficulty-badge"
          style={{ background: getDifficultyColor(example.difficulty) }}
        >
          {getDifficultyLabel(example.difficulty)}
        </span>
      </div>
      
      <div className="example-problem">
        <strong>Problema:</strong>
        <p>{example.problem}</p>
      </div>

      <button 
        className="show-solution-btn"
        onClick={() => setShowSolution(!showSolution)}
      >
        {showSolution ? 'Ocultar solución' : 'Ver solución'}
      </button>

      {showSolution && (
        <div className="example-solution">
          <strong>Solución:</strong>
          <p className="solution-answer">{example.solution}</p>
          
          {example.steps && (
            <div className="solution-steps">
              <strong>Paso a paso:</strong>
              <ol>
                {example.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
