// Home/Dashboard page - DEMO MODE
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Flame, 
  User, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Calendar, 
  ClipboardList,
  Lightbulb,
  Home as HomeIcon,
  Upload,
  ArrowRight,
  FolderUp
} from 'lucide-react';
import './Home.css';

export default function Home() {
  // Demo stats
  const stats = {
    streak: 5,
    sessionsCompleted: 12,
    hoursStudied: 8,
    quizzesPassed: 7
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="header-left">
          <div className="logo">
            <Brain className="logo-icon" size={28} />
            <span className="logo-text">PathWise</span>
          </div>
        </div>
        <div className="header-right">
          <Link to="/streak" className="streak-badge">
            <Flame className="streak-fire" size={20} />
            <span className="streak-count">{stats.streak}</span>
          </Link>
          <div className="user-avatar">
            <User size={20} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="home-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h1>¡Hola, Estudiante!</h1>
          <p>¿Listo para continuar tu camino de aprendizaje?</p>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <Link to="/upload" className="main-action-card">
            <div className="action-icon-large">
              <FolderUp size={32} />
            </div>
            <div className="action-content">
              <h2>Subir Nuevo Material</h2>
              <p>Comienza un nuevo plan de estudio con tu material</p>
            </div>
            <ArrowRight className="action-arrow" size={24} />
          </Link>
        </section>

        {/* Stats Grid */}
        <section className="stats-section">
          <h2 className="section-title">Tu Progreso</h2>
          <div className="stats-grid">
            <div className="stat-card fire">
              <Flame className="stat-icon" size={24} />
              <span className="stat-value">{stats.streak}</span>
              <span className="stat-label">Días de racha</span>
            </div>
            <div className="stat-card purple">
              <BookOpen className="stat-icon" size={24} />
              <span className="stat-value">{stats.sessionsCompleted}</span>
              <span className="stat-label">Sesiones</span>
            </div>
            <div className="stat-card green">
              <Clock className="stat-icon" size={24} />
              <span className="stat-value">{stats.hoursStudied}h</span>
              <span className="stat-label">Estudiadas</span>
            </div>
            <div className="stat-card yellow">
              <CheckCircle className="stat-icon" size={24} />
              <span className="stat-value">{stats.quizzesPassed}</span>
              <span className="stat-label">Quizzes</span>
            </div>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="nav-section">
          <h2 className="section-title">Accesos Rápidos</h2>
          <div className="nav-grid">
            <Link to="/calendar" className="nav-card">
              <Calendar className="nav-icon" size={28} />
              <div className="nav-info">
                <h3>Calendario</h3>
                <p>Gestiona tus sesiones</p>
              </div>
            </Link>
            <Link to="/streak" className="nav-card">
              <Flame className="nav-icon" size={28} />
              <div className="nav-info">
                <h3>Mi Racha</h3>
                <p>Mantén tu progreso</p>
              </div>
            </Link>
            <Link to="/upload" className="nav-card">
              <ClipboardList className="nav-icon" size={28} />
              <div className="nav-info">
                <h3>Ver plan de estudios</h3>
                <p>Explora tus materias</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Tip Card */}
        <section className="tip-section">
          <div className="tip-card">
            <Lightbulb className="tip-icon" size={24} />
            <div className="tip-content">
              <h3>Consejo del día</h3>
              <p>
                La técnica Pomodoro sugiere estudiar en bloques de 25 minutos 
                seguidos de 5 minutos de descanso. ¡Pruébalo en tu próxima sesión!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="bottom-nav">
        <Link to="/" className="nav-item active">
          <HomeIcon className="nav-item-icon" size={20} />
          <span className="nav-item-label">Inicio</span>
        </Link>
        <Link to="/upload" className="nav-item">
          <Upload className="nav-item-icon" size={20} />
          <span className="nav-item-label">Subir</span>
        </Link>
        <Link to="/calendar" className="nav-item">
          <Calendar className="nav-item-icon" size={20} />
          <span className="nav-item-label">Calendario</span>
        </Link>
        <Link to="/streak" className="nav-item">
          <Flame className="nav-item-icon" size={20} />
          <span className="nav-item-label">Racha</span>
        </Link>
      </nav>
    </div>
  );
}
