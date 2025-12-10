import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Check, 
  Undo2, 
  X, 
  CalendarDays,
  Inbox
} from 'lucide-react';
import '../styles/pages/Calendar.css';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: 'study' | 'quiz' | 'custom';
  completed: boolean;
}

// Generate demo events
function generateDemoEvents(): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const today = new Date();
  
  const titles = [
    'Sesión de Estudio: Introducción',
    'Sesión de Estudio: Conceptos Básicos',
    'Quiz: Repaso Semanal',
    'Sesión de Estudio: Aplicaciones',
    'Sesión de Estudio: Análisis',
    'Quiz: Evaluación Parcial'
  ];

  for (let i = -5; i < 15; i++) {
    if (Math.random() > 0.6) continue;
    
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    const isQuiz = Math.random() > 0.7;
    
    events.push({
      id: `event-${i}`,
      title: titles[Math.abs(i) % titles.length],
      date: date.toISOString().split('T')[0],
      time: ['09:00', '14:00', '16:00', '19:00'][Math.floor(Math.random() * 4)],
      duration: isQuiz ? 15 : [25, 30, 45][Math.floor(Math.random() * 3)],
      type: isQuiz ? 'quiz' : 'study',
      completed: i < 0
    });
  }

  return events.sort((a, b) => a.date.localeCompare(b.date));
}

export default function Calendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(generateDemoEvents);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '09:00',
    duration: 30
  });

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Previous month days
    const prevMonth = new Date(year, month, 0);
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        currentMonth: false,
        date: new Date(year, month - 1, prevMonth.getDate() - i).toISOString().split('T')[0]
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true,
        date: new Date(year, month, i).toISOString().split('T')[0]
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        currentMonth: false,
        date: new Date(year, month + 1, i).toISOString().split('T')[0]
      });
    }

    return days;
  };

  const getEventsForDate = (date: string) => {
    return events.filter(e => e.date === date);
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const today = new Date().toISOString().split('T')[0];
  const days = getDaysInMonth(currentDate);

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.title) return;

    const event: CalendarEvent = {
      id: `custom-${Date.now()}`,
      title: newEvent.title,
      date: selectedDate,
      time: newEvent.time,
      duration: newEvent.duration,
      type: 'custom',
      completed: false
    };

    setEvents([...events, event].sort((a, b) => a.date.localeCompare(b.date)));
    setShowAddModal(false);
    setNewEvent({ title: '', time: '09:00', duration: 30 });
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const toggleComplete = (eventId: string) => {
    setEvents(events.map(e => 
      e.id === eventId ? { ...e, completed: !e.completed } : e
    ));
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        <header className="calendar-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={18} /> Inicio
          </button>
          <h1>Calendario</h1>
          <button className="today-btn" onClick={() => {
            setCurrentDate(new Date());
            setSelectedDate(today);
          }}>
            Hoy
          </button>
        </header>

        <div className="calendar-layout">
          {/* Calendar Grid */}
          <div className="calendar-main">
            <div className="month-nav">
              <button onClick={() => navigateMonth(-1)}><ChevronLeft size={20} /></button>
              <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button onClick={() => navigateMonth(1)}><ChevronRight size={20} /></button>
            </div>

            <div className="calendar-grid">
              <div className="weekday-header">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>

              <div className="days-grid">
                {days.map((day, index) => {
                  const dayEvents = getEventsForDate(day.date);
                  const isToday = day.date === today;
                  const isSelected = day.date === selectedDate;

                  return (
                    <div
                      key={index}
                      className={`day-cell ${!day.currentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedDate(day.date)}
                    >
                      <span className="day-number">{day.day}</span>
                      {dayEvents.length > 0 && (
                        <div className="day-events">
                          {dayEvents.slice(0, 2).map(event => (
                            <div 
                              key={event.id} 
                              className={`event-dot ${event.type} ${event.completed ? 'completed' : ''}`}
                            ></div>
                          ))}
                          {dayEvents.length > 2 && (
                            <span className="more-events">+{dayEvents.length - 2}</span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="calendar-legend">
              <div className="legend-item">
                <span className="legend-dot study"></span>
                <span>Estudio</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot quiz"></span>
                <span>Quiz</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot custom"></span>
                <span>Personal</span>
              </div>
            </div>
          </div>

          {/* Events Panel */}
          <div className="events-panel">
            {selectedDate ? (
              <>
                <div className="panel-header">
                  <h3>
                    {new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-ES', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    })}
                  </h3>
                  <button 
                    className="add-event-btn"
                    onClick={() => setShowAddModal(true)}
                  >
                    <Plus size={16} /> Añadir
                  </button>
                </div>

                {selectedDateEvents.length > 0 ? (
                  <div className="events-list">
                    {selectedDateEvents.map(event => (
                      <div 
                        key={event.id} 
                        className={`event-card ${event.type} ${event.completed ? 'completed' : ''}`}
                      >
                        <div className="event-time">{event.time}</div>
                        <div className="event-details">
                          <h4>{event.title}</h4>
                          <span className="event-duration">{event.duration} min</span>
                        </div>
                        <div className="event-actions">
                          <button 
                            className="complete-btn"
                            onClick={() => toggleComplete(event.id)}
                          >
                            {event.completed ? <Undo2 size={16} /> : <Check size={16} />}
                          </button>
                          {event.type === 'custom' && (
                            <button 
                              className="delete-btn"
                              onClick={() => deleteEvent(event.id)}
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-events">
                    <Inbox className="no-events-icon" size={40} />
                    <p>No hay eventos programados</p>
                    <button 
                      className="add-first-event"
                      onClick={() => setShowAddModal(true)}
                    >
                      Añadir evento
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="no-selection">
                <CalendarDays className="no-selection-icon" size={40} />
                <p>Selecciona una fecha para ver los eventos</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Añadir Evento</h3>
            <div className="modal-form">
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Nombre del evento"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Hora</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Duración (min)</label>
                  <select
                    value={newEvent.duration}
                    onChange={e => setNewEvent({ ...newEvent, duration: Number(e.target.value) })}
                  >
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={45}>45 min</option>
                    <option value={60}>60 min</option>
                    <option value={90}>90 min</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                Cancelar
              </button>
              <button className="save-btn" onClick={handleAddEvent}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
