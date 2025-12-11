import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Settings, Timer, RefreshCw, Brain, FileText, ArrowLeft, FileIcon, Sparkles, AlertTriangle, CheckCircle, Clock, Zap, Target, Coffee } from 'lucide-react';
import { validateStudyTime, type TimeValidation } from '../data/courses';
import '../styles/pages/SessionConfig.css';

type ConfigMode = 'period' | 'custom';

interface StudyTechnique {
  id: string;
  name: string;
  description: string;
  iconType: 'timer' | 'refresh' | 'brain' | 'filetext';
}

interface TimePreset {
  id: string;
  name: string;
  description: string;
  sessions: number;
  duration: number;
  icon: 'zap' | 'target' | 'clock' | 'coffee';
}

const techniques: StudyTechnique[] = [
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    description: '25 min de estudio + 5 min de descanso. Ideal para mantener concentración.',
    iconType: 'timer'
  },
  {
    id: 'spaced_repetition',
    name: 'Repetición Espaciada',
    description: 'Revisiones programadas para optimizar la memoria a largo plazo.',
    iconType: 'refresh'
  },
  {
    id: 'active_recall',
    name: 'Recuerdo Activo',
    description: 'Preguntas y respuestas para fortalecer la retención.',
    iconType: 'brain'
  },
  {
    id: 'feynman',
    name: 'Técnica Feynman',
    description: 'Explica conceptos en términos simples para profundizar comprensión.',
    iconType: 'filetext'
  }
];

// Presets de tiempo sugeridos según disponibilidad
const timePresets: TimePreset[] = [
  {
    id: 'express',
    name: 'Exprés',
    description: 'Poco tiempo disponible. Repaso rápido de conceptos clave.',
    sessions: 6,
    duration: 25,
    icon: 'zap'
  },
  {
    id: 'balanced',
    name: 'Equilibrado',
    description: 'Tiempo moderado. Balance entre teoría y práctica.',
    sessions: 12,
    duration: 30,
    icon: 'target'
  },
  {
    id: 'intensive',
    name: 'Intensivo',
    description: 'Tiempo suficiente. Cobertura completa del material.',
    sessions: 18,
    duration: 45,
    icon: 'clock'
  },
  {
    id: 'comprehensive',
    name: 'Profundo',
    description: 'Mucho tiempo. Estudio detallado con ejercicios extra.',
    sessions: 25,
    duration: 60,
    icon: 'coffee'
  }
];

const PresetIcon = ({ type }: { type: TimePreset['icon'] }) => {
  switch (type) {
    case 'zap': return <Zap size={20} />;
    case 'target': return <Target size={20} />;
    case 'clock': return <Clock size={20} />;
    case 'coffee': return <Coffee size={20} />;
  }
};

const TechniqueIcon = ({ type }: { type: StudyTechnique['iconType'] }) => {
  switch (type) {
    case 'timer': return <Timer size={24} />;
    case 'refresh': return <RefreshCw size={24} />;
    case 'brain': return <Brain size={24} />;
    case 'filetext': return <FileText size={24} />;
  }
};

export default function SessionConfig() {
  const navigate = useNavigate();
  const location = useLocation();
  const materialData = location.state?.materialData;

  const [mode, setMode] = useState<ConfigMode>('period');
  const [selectedTechnique, setSelectedTechnique] = useState<string>('pomodoro');
  
  // Period mode
  const [startDate, setStartDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState<string>(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.toISOString().split('T')[0];
  });
  const [sessionsPerWeek, setSessionsPerWeek] = useState<number>(3);
  const [sessionDuration, setSessionDuration] = useState<number>(45);

  // Custom mode
  const [totalSessions, setTotalSessions] = useState<number>(10);
  const [customDuration, setCustomDuration] = useState<number>(30);
  const [preferredDays, setPreferredDays] = useState<string[]>(['monday', 'wednesday', 'friday']);

  // Validación de tiempo según sílabo
  const [timeValidation, setTimeValidation] = useState<TimeValidation | null>(null);

  // Calcular número de semanas entre fechas
  const getWeeksBetweenDates = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.ceil(diffDays / 7);
  };

  // Efecto para validar el tiempo cuando cambian los parámetros
  useEffect(() => {
    const courseId = materialData?.courseId;
    if (!courseId) return;

    let validation: TimeValidation;
    if (mode === 'period') {
      const weeks = getWeeksBetweenDates(startDate, endDate);
      validation = validateStudyTime(courseId, weeks, sessionDuration, sessionsPerWeek);
    } else {
      validation = validateStudyTime(courseId, totalSessions, customDuration);
    }
    setTimeValidation(validation);
  }, [mode, startDate, endDate, sessionsPerWeek, sessionDuration, totalSessions, customDuration, materialData?.courseId]);

  const days = [
    { id: 'monday', label: 'Lun' },
    { id: 'tuesday', label: 'Mar' },
    { id: 'wednesday', label: 'Mié' },
    { id: 'thursday', label: 'Jue' },
    { id: 'friday', label: 'Vie' },
    { id: 'saturday', label: 'Sáb' },
    { id: 'sunday', label: 'Dom' }
  ];

  const toggleDay = (dayId: string) => {
    setPreferredDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const handleSubmit = () => {
    const config = {
      materialData,
      technique: selectedTechnique,
      mode,
      ...(mode === 'period' ? {
        startDate,
        endDate,
        sessionsPerWeek,
        sessionDuration
      } : {
        totalSessions,
        sessionDuration: customDuration,
        preferredDays
      })
    };

    navigate('/generating', { state: { config } });
  };

  return (
    <div className="session-config-page">
      <div className="session-config-container">
        <header className="config-header">
          <button className="back-btn" onClick={() => navigate('/upload')}>
            <ArrowLeft size={18} /> Volver
          </button>
          <h1>Configura tu Plan de Estudio</h1>
          <p className="subtitle">Personaliza cómo quieres organizar tus sesiones de estudio</p>
        </header>

        {/* Material info */}
        {materialData && (
          <div className="material-preview">
            <span className="material-icon"><FileIcon size={20} /></span>
            <div className="material-info">
              <span className="material-name">{materialData.fileName || 'Material subido'}</span>
              <span className="material-type">{materialData.type || 'Documento'}</span>
            </div>
          </div>
        )}

        {/* Technique selection */}
        <section className="config-section">
          <h2>Técnica de Estudio</h2>
          <div className="techniques-grid">
            {techniques.map(tech => (
              <button
                key={tech.id}
                className={`technique-card ${selectedTechnique === tech.id ? 'selected' : ''}`}
                onClick={() => setSelectedTechnique(tech.id)}
              >
                <span className="technique-icon"><TechniqueIcon type={tech.iconType} /></span>
                <span className="technique-name">{tech.name}</span>
                <span className="technique-desc">{tech.description}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Mode selection */}
        <section className="config-section">
          <h2>Tipo de Planificación</h2>
          <div className="mode-tabs">
            <button 
              className={`mode-tab ${mode === 'period' ? 'active' : ''}`}
              onClick={() => setMode('period')}
            >
              <span className="tab-icon"><Calendar size={24} /></span>
              <span className="tab-label">Por Período</span>
              <span className="tab-desc">Define fechas de inicio y fin</span>
            </button>
            <button 
              className={`mode-tab ${mode === 'custom' ? 'active' : ''}`}
              onClick={() => setMode('custom')}
            >
              <span className="tab-icon"><Settings size={24} /></span>
              <span className="tab-label">Personalizado</span>
              <span className="tab-desc">Define número de sesiones</span>
            </button>
          </div>
        </section>

        {/* Configuration options */}
        <section className="config-section options-section">
          {mode === 'period' ? (
            <div className="period-options">
              <div className="option-row">
                <div className="option-group">
                  <label>Fecha de inicio</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>
                <div className="option-group">
                  <label>Fecha de fin</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="option-row">
                <div className="option-group">
                  <label>Sesiones por semana</label>
                  <div className="number-input">
                    <button onClick={() => setSessionsPerWeek(Math.max(1, sessionsPerWeek - 1))}>-</button>
                    <span>{sessionsPerWeek}</span>
                    <button onClick={() => setSessionsPerWeek(Math.min(7, sessionsPerWeek + 1))}>+</button>
                  </div>
                </div>
                <div className="option-group">
                  <label>Duración (minutos)</label>
                  <div className="duration-options">
                    {[25, 30, 45, 60].map(dur => (
                      <button
                        key={dur}
                        className={`duration-btn ${sessionDuration === dur ? 'selected' : ''}`}
                        onClick={() => setSessionDuration(dur)}
                      >
                        {dur} min
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="custom-options">
              {/* Presets sugeridos */}
              <div className="presets-section">
                <label className="presets-label">Opciones sugeridas según tu tiempo</label>
                <div className="presets-grid">
                  {timePresets.map(preset => (
                    <button
                      key={preset.id}
                      className={`preset-card ${totalSessions === preset.sessions && customDuration === preset.duration ? 'selected' : ''}`}
                      onClick={() => {
                        setTotalSessions(preset.sessions);
                        setCustomDuration(preset.duration);
                      }}
                    >
                      <span className="preset-icon"><PresetIcon type={preset.icon} /></span>
                      <span className="preset-name">{preset.name}</span>
                      <span className="preset-desc">{preset.description}</span>
                      <span className="preset-details">
                        {preset.sessions} sesiones × {preset.duration} min
                      </span>
                      <span className="preset-total">
                        ≈ {Math.round((preset.sessions * preset.duration) / 60)}h total
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="custom-divider">
                <span>o personaliza manualmente</span>
              </div>

              <div className="option-row">
                <div className="option-group">
                  <label>Total de sesiones</label>
                  <div className="number-input large">
                    <button onClick={() => setTotalSessions(Math.max(1, totalSessions - 1))}>−</button>
                    <input 
                      type="number" 
                      min="1" 
                      max="50" 
                      value={totalSessions}
                      onChange={e => setTotalSessions(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                    />
                    <button onClick={() => setTotalSessions(Math.min(50, totalSessions + 1))}>+</button>
                  </div>
                  <span className="input-hint">Entre 1 y 50 sesiones</span>
                </div>
                <div className="option-group">
                  <label>Duración por sesión</label>
                  <div className="number-input large">
                    <button onClick={() => setCustomDuration(Math.max(15, customDuration - 5))}>−</button>
                    <input 
                      type="number" 
                      min="15" 
                      max="120" 
                      step="5"
                      value={customDuration}
                      onChange={e => setCustomDuration(Math.max(15, Math.min(120, Number(e.target.value) || 15)))}
                    />
                    <button onClick={() => setCustomDuration(Math.min(120, customDuration + 5))}>+</button>
                  </div>
                  <span className="input-hint">Entre 15 y 120 minutos</span>
                </div>
              </div>
              
              <div className="time-summary-card">
                <div className="time-summary-stat">
                  <span className="stat-number">{totalSessions}</span>
                  <span className="stat-label">sesiones</span>
                </div>
                <span className="time-summary-x">×</span>
                <div className="time-summary-stat">
                  <span className="stat-number">{customDuration}</span>
                  <span className="stat-label">minutos</span>
                </div>
                <span className="time-summary-eq">=</span>
                <div className="time-summary-stat total">
                  <span className="stat-number">{Math.round((totalSessions * customDuration) / 60 * 10) / 10}</span>
                  <span className="stat-label">horas totales</span>
                </div>
              </div>

              <div className="option-row">
                <div className="option-group full">
                  <label>Días preferidos</label>
                  <div className="days-selector">
                    {days.map(day => (
                      <button
                        key={day.id}
                        className={`day-btn ${preferredDays.includes(day.id) ? 'selected' : ''}`}
                        onClick={() => toggleDay(day.id)}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Time Validation Alert */}
        {timeValidation && (
          <section className={`time-validation ${timeValidation.isValid ? 'valid' : 'warning'}`}>
            <div className="validation-header">
              {timeValidation.isValid ? (
                <CheckCircle size={24} className="validation-icon valid" />
              ) : (
                <AlertTriangle size={24} className="validation-icon warning" />
              )}
              <div className="validation-info">
                <h4>{timeValidation.isValid ? 'Tiempo adecuado' : 'Tiempo insuficiente'}</h4>
                <p>
                  {timeValidation.hoursAssigned}h asignadas / {timeValidation.minHoursRequired}h mínimas según sílabo
                </p>
              </div>
            </div>
            {!timeValidation.isValid && (
              <div className="validation-details">
                <p className="shortfall-message">
                  Faltan <strong>{timeValidation.shortfall}h</strong> para cubrir el contenido mínimo del sílabo.
                  El plan se generará pero algunas lecciones podrían quedar incompletas.
                </p>
                {timeValidation.unitWarnings.length > 0 && (
                  <div className="unit-warnings">
                    <p className="warnings-title">Unidades con tiempo insuficiente:</p>
                    <ul>
                      {timeValidation.unitWarnings.slice(0, 3).map((warning, idx) => (
                        <li key={idx}>
                          {warning.unitTitle}: {warning.assignedHours}h / {warning.minHours}h necesarias
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Summary */}
        <section className="config-summary">
          <h3>Resumen</h3>
          <div className="summary-items">
            <div className="summary-item">
              <span className="summary-label">Técnica:</span>
              <span className="summary-value">
                {techniques.find(t => t.id === selectedTechnique)?.name}
              </span>
            </div>
            {mode === 'period' ? (
              <>
                <div className="summary-item">
                  <span className="summary-label">Período:</span>
                  <span className="summary-value">{startDate} al {endDate}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Frecuencia:</span>
                  <span className="summary-value">{sessionsPerWeek}x por semana, {sessionDuration} min</span>
                </div>
              </>
            ) : (
              <>
                <div className="summary-item">
                  <span className="summary-label">Sesiones:</span>
                  <span className="summary-value">{totalSessions} sesiones de {customDuration} min</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Días:</span>
                  <span className="summary-value">
                    {preferredDays.map(d => days.find(day => day.id === d)?.label).join(', ')}
                  </span>
                </div>
              </>
            )}
          </div>
        </section>

        <button className="generate-btn" onClick={handleSubmit}>
          Generar Plan de Estudio
          <span className="btn-icon"><Sparkles size={20} /></span>
        </button>
      </div>
    </div>
  );
}
