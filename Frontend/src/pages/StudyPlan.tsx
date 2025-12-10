import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { courses, type Course, type Unit, type Lesson as CourseLesson } from '../data/courses';
import { ArrowLeft, Calendar, Flame, BookOpen, Clock, CheckCircle, Check, ChevronDown, ChevronRight, FileText, Bot, Sparkles } from 'lucide-react';
import '../styles/pages/StudyPlan.css';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  hasQuiz: boolean;
  completed: boolean;
  unitTitle: string;
}

interface StudySession {
  id: string;
  date: string;
  time: string;
  lessons: Lesson[];
  unitTitle: string;
}

interface StudyPlanData {
  id: string;
  title: string;
  technique: string;
  totalSessions: number;
  totalDuration: number;
  progress: number;
  sessions: StudySession[];
  courseId: string;
}

// Generate plan from real course data
function generatePlanFromCourse(course: Course, config: any): StudyPlanData {
  const techniqueNames: Record<string, string> = {
    pomodoro: 'Técnica Pomodoro',
    spaced_repetition: 'Repetición Espaciada',
    active_recall: 'Recuerdo Activo',
    feynman: 'Técnica Feynman'
  };

  const sessions: StudySession[] = [];
  const startDate = new Date(config?.startDate || Date.now());
  let sessionIndex = 0;
  let totalDuration = 0;

  // Create sessions from units and lessons
  course.units.forEach((unit: Unit) => {
    const unitLessons: Lesson[] = unit.lessons.map((lesson: CourseLesson) => {
      totalDuration += lesson.duration;
      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        hasQuiz: lesson.quiz.length > 0,
        completed: false,
        unitTitle: unit.title
      };
    });

    // Group lessons into sessions (2-3 lessons per session)
    const lessonsPerSession = 2;
    for (let i = 0; i < unitLessons.length; i += lessonsPerSession) {
      const sessionLessons = unitLessons.slice(i, i + lessonsPerSession);
      const sessionDate = new Date(startDate);
      sessionDate.setDate(sessionDate.getDate() + sessionIndex * 2);

      sessions.push({
        id: `session-${sessionIndex}`,
        date: sessionDate.toISOString().split('T')[0],
        time: ['09:00', '14:00', '16:00', '19:00'][sessionIndex % 4],
        lessons: sessionLessons,
        unitTitle: unit.title
      });
      sessionIndex++;
    }
  });

  return {
    id: 'plan-' + course.id,
    title: course.name,
    technique: techniqueNames[config?.technique] || 'Pomodoro',
    totalSessions: sessions.length,
    totalDuration,
    progress: 0,
    sessions,
    courseId: course.id
  };
}

export default function StudyPlan() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const config = location.state?.config;

  const [plan, setPlan] = useState<StudyPlanData | null>(null);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Get course from config or URL
    const courseId = config?.materialData?.courseId || id;
    const course = courses.find(c => c.id === courseId);
    
    if (course) {
      const generatedPlan = generatePlanFromCourse(course, config);
      setPlan(generatedPlan);
      if (generatedPlan.sessions.length > 0) {
        setActiveSession(generatedPlan.sessions[0].id);
      }
    }
  }, [config, id]);

  const toggleLesson = (lessonId: string) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
  };

  const startQuiz = (lessonId: string) => {
    navigate(`/quiz/${lessonId}`, { 
      state: { 
        planId: plan?.id, 
        courseId: plan?.courseId,
        config 
      } 
    });
  };

  if (!plan) {
    return <div className="loading-plan">Cargando plan...</div>;
  }

  const totalLessons = plan.sessions.reduce((acc, s) => acc + s.lessons.length, 0);
  const progress = Math.round((completedLessons.size / totalLessons) * 100);

  return (
    <div className="study-plan-page">
      {/* Header */}
      <header className="plan-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={18} /> Inicio
          </button>
          <div className="plan-title-section">
            <h1>{plan.title}</h1>
            <span className="technique-badge">{plan.technique}</span>
          </div>
          <div className="header-actions">
            <button 
              className="action-btn ai-btn" 
              onClick={() => navigate('/ai-assistant', { state: { subject: plan.title, planId: plan.id } })}
            >
              <Bot size={18} /> <Sparkles size={14} className="sparkle" /> Personalizar
            </button>
            <button className="action-btn" onClick={() => navigate('/calendar', { state: { plan } })}>
              <Calendar size={18} /> Calendario
            </button>
            <button className="action-btn primary" onClick={() => navigate('/streak')}>
              <Flame size={18} /> Racha
            </button>
          </div>
        </div>
      </header>

      <div className="plan-content">
        {/* Progress Section */}
        <section className="progress-section">
          <div className="progress-card">
            <div className="progress-ring">
              <svg viewBox="0 0 100 100">
                <circle className="progress-bg" cx="50" cy="50" r="40" />
                <circle 
                  className="progress-fill" 
                  cx="50" 
                  cy="50" 
                  r="40"
                  strokeDasharray={`${progress * 2.51} 251`}
                />
              </svg>
              <span className="progress-value">{progress}%</span>
            </div>
            <div className="progress-info">
              <h3>Progreso General</h3>
              <p>{completedLessons.size} de {totalLessons} lecciones completadas</p>
            </div>
          </div>

          <div className="stats-cards">
            <div className="stat-card">
              <span className="stat-icon"><BookOpen size={24} /></span>
              <span className="stat-value">{plan.totalSessions}</span>
              <span className="stat-label">Sesiones</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon"><Clock size={24} /></span>
              <span className="stat-value">{Math.round(plan.totalDuration / 60)}h</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon"><CheckCircle size={24} /></span>
              <span className="stat-value">{completedLessons.size}</span>
              <span className="stat-label">Completadas</span>
            </div>
          </div>
        </section>

        {/* Sessions Timeline */}
        <section className="sessions-section">
          <h2>Sesiones de Estudio</h2>
          <div className="sessions-timeline">
            {plan.sessions.map((session, index) => (
              <div 
                key={session.id} 
                className={`session-card ${activeSession === session.id ? 'active' : ''}`}
              >
                <div 
                  className="session-header"
                  onClick={() => setActiveSession(activeSession === session.id ? null : session.id)}
                >
                  <div className="session-number">
                    <span>{index + 1}</span>
                  </div>
                  <div className="session-info">
                    <h3>Sesión {index + 1}</h3>
                    <span className="session-date">
                      {new Date(session.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short'
                      })} • {session.time}
                    </span>
                  </div>
                  <div className="session-progress">
                    {session.lessons.filter(l => completedLessons.has(l.id)).length}/{session.lessons.length}
                  </div>
                  <span className="expand-icon">
                    {activeSession === session.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </span>
                </div>

                {activeSession === session.id && (
                  <div className="session-lessons">
                    {session.lessons.map((lesson, lIndex) => (
                      <div 
                        key={lesson.id}
                        className={`lesson-item ${completedLessons.has(lesson.id) ? 'completed' : ''}`}
                      >
                        <button 
                          className="lesson-checkbox"
                          onClick={() => toggleLesson(lesson.id)}
                        >
                          {completedLessons.has(lesson.id) ? <Check size={16} /> : ''}
                        </button>
                        <div 
                          className="lesson-content"
                          onClick={() => navigate(`/study/${lesson.id}`, { state: { config } })}
                          style={{ cursor: 'pointer' }}
                        >
                          <span className="lesson-number">{lIndex + 1}.</span>
                          <div className="lesson-details">
                            <h4>{lesson.title}</h4>
                            <p>{lesson.description}</p>
                          </div>
                          <span className="lesson-duration">{lesson.duration} min</span>
                        </div>
                        {lesson.hasQuiz && (
                          <button 
                            className="quiz-btn"
                            onClick={() => startQuiz(lesson.id)}
                          >
                            <FileText size={16} /> Quiz
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
