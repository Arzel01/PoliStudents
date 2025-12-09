// Subject Selection page component - DEMO MODE
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, FolderUp, PenTool, FlaskConical, Code } from 'lucide-react';
import { courses } from '../data/courses';
import './Upload.css';

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

        <div className="coming-soon-notice">
          <FolderUp className="notice-icon" size={28} />
          <div className="notice-content">
            <h4>¿Tienes tu propio material?</h4>
            <p>La función de subir archivos (PDF, DOCX, PPTX) será implementada próximamente. ¡Podrás crear planes de estudio desde tus propios apuntes!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
