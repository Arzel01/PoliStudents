import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Settings, Timer, RefreshCw, Brain, FileText, ArrowLeft, FileIcon, Sparkles } from 'lucide-react';
import './SessionConfig.css';

type ConfigMode = 'period' | 'custom';

interface StudyTechnique {
  id: string;
  name: string;
  description: string;
  iconType: 'timer' | 'refresh' | 'brain' | 'filetext';
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
              <div className="option-row">
                <div className="option-group full">
                  <label>Total de sesiones</label>
                  <input 
                    type="range" 
                    min="5" 
                    max="30" 
                    value={totalSessions}
                    onChange={e => setTotalSessions(Number(e.target.value))}
                  />
                  <span className="range-value">{totalSessions} sesiones</span>
                </div>
              </div>
              <div className="option-row">
                <div className="option-group full">
                  <label>Duración por sesión (minutos)</label>
                  <div className="duration-options">
                    {[15, 25, 30, 45, 60, 90].map(dur => (
                      <button
                        key={dur}
                        className={`duration-btn ${customDuration === dur ? 'selected' : ''}`}
                        onClick={() => setCustomDuration(dur)}
                      >
                        {dur} min
                      </button>
                    ))}
                  </div>
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
