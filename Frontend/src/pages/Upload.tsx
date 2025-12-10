// Subject Selection page component - DEMO MODE
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FolderUp, PenTool, FlaskConical, Code, Lock, Crown, Sparkles } from 'lucide-react';
import { courses } from '../data/courses';
import '../styles/pages/Upload.css';

// Icon map for courses
const courseIcons: Record<string, React.ReactNode> = {
  'calculo': <PenTool size={32} />,
  'quimica': <FlaskConical size={32} />,
  'programacion': <Code size={32} />
};

export default function Upload() {
  const navigate = useNavigate();

  function handleSelectCourse(courseId: string) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    navigate('/session-config', { 
      state: { 
        materialData: {
          courseId: course.id,
          fileName: course.name,
          type: 'course',
          title: course.name,
          description: course.description
        }
      } 
    });
  }

  function handleUploadMaterial() {
    navigate('/pricing', { 
      state: { 
        reason: 'upload',
        message: 'Subir material personalizado requiere un plan de pago' 
      } 
    });
  }

  return (
    <div className="upload-container">
      <div className="upload-card subjects-card">
        <header className="upload-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={18} /> Inicio
          </button>
          <h1 className="upload-title">Selecciona una Materia</h1>
        </header>

        <p className="subjects-intro">
          Elige una materia para comenzar tu sesión de estudio personalizada con IA
        </p>

        <div className="subjects-grid">
          {courses.map((course) => (
            <button
              key={course.id}
              className="subject-card"
              onClick={() => handleSelectCourse(course.id)}
              style={{ '--accent-color': course.color } as React.CSSProperties}
            >
              <div className="subject-icon">{courseIcons[course.id] || course.icon}</div>
              <div className="subject-info">
                <h3 className="subject-name">{course.name}</h3>
                <p className="subject-description">{course.description}</p>
                <div className="subject-meta">
                  <span className="subject-units">
                    {course.units.length} unidades
                  </span>
                  <span className="subject-lessons">
                    {course.units.reduce((acc, u) => acc + u.lessons.length, 0)} lecciones
                  </span>
                </div>
              </div>
              <ArrowRight className="subject-arrow" size={24} />
            </button>
          ))}
        </div>

        <div className="premium-upload-card" onClick={handleUploadMaterial}>
          <div className="premium-badge">
            <Crown size={14} />
            <span>Premium</span>
          </div>
          <div className="premium-icon">
            <FolderUp size={32} />
            <Lock size={16} className="lock-overlay" />
          </div>
          <div className="premium-content">
            <h4>Subir tu propio material</h4>
            <p>Sube PDFs, DOCX o PPTX y crea planes de estudio personalizados con tus propios apuntes</p>
            <div className="premium-features">
              <span><Sparkles size={12} /> IA analiza tu contenido</span>
              <span><Sparkles size={12} /> Genera quizzes automáticos</span>
            </div>
          </div>
          <button className="upgrade-link">
            Ver planes <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
