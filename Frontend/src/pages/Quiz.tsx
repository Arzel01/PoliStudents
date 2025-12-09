import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { courses, type Question } from '../data/courses';
import { PartyPopper, BookOpen, Flame, Check, X, Lightbulb } from 'lucide-react';
import './Quiz.css';

// Get questions for a specific lesson
function getQuestionsForLesson(courseId: string, lessonId: string): Question[] {
  const course = courses.find(c => c.id === courseId);
  if (!course) return [];

  for (const unit of course.units) {
    const lesson = unit.lessons.find(l => l.id === lessonId);
    if (lesson) {
      return lesson.quiz;
    }
  }
  return [];
}

// Get random questions from a course (for general quiz)
function getRandomQuestionsFromCourse(courseId: string, count: number = 5): Question[] {
  const course = courses.find(c => c.id === courseId);
  if (!course) return [];

  const allQuestions: Question[] = [];
  course.units.forEach(unit => {
    unit.lessons.forEach(lesson => {
      allQuestions.push(...lesson.quiz);
    });
  });

  // Shuffle and return requested count
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default function Quiz() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const location = useLocation();
  const courseId = location.state?.courseId;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    let loadedQuestions: Question[] = [];
    
    if (lessonId && courseId) {
      // Get questions for specific lesson
      loadedQuestions = getQuestionsForLesson(courseId, lessonId);
    }
    
    // If no specific questions, get random ones from course
    if (loadedQuestions.length === 0 && courseId) {
      loadedQuestions = getRandomQuestionsFromCourse(courseId, 5);
    }
    
    // Fallback: get from any course
    if (loadedQuestions.length === 0) {
      const defaultCourse = courses[0];
      if (defaultCourse) {
        loadedQuestions = getRandomQuestionsFromCourse(defaultCourse.id, 5);
      }
    }

    setQuestions(loadedQuestions);
  }, [lessonId, courseId]);

  if (questions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <p>Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    setAnswers([...answers, selectedAnswer]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleFinish = () => {
    // In demo mode, navigate back to home with streak update
    navigate('/streak', { state: { quizCompleted: true, score: calculateScore(), total: questions.length } });
  };

  if (quizComplete) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const isPassing = percentage >= 60;

    return (
      <div className="quiz-page">
        <div className="quiz-container results-container">
          <div className="results-icon">
            {isPassing ? <PartyPopper size={64} /> : <BookOpen size={64} />}
          </div>
          <h1 className="results-title">
            {isPassing ? '¡Excelente trabajo!' : '¡Sigue practicando!'}
          </h1>
          <div className="score-display">
            <div className="score-circle" data-passing={isPassing}>
              <span className="score-value">{percentage}%</span>
            </div>
            <p className="score-text">
              Respondiste {score} de {questions.length} correctamente
            </p>
          </div>

          {isPassing ? (
            <div className="streak-bonus">
              <span className="bonus-icon"><Flame size={24} /></span>
              <span className="bonus-text">+1 día de racha</span>
            </div>
          ) : (
            <p className="retry-message">
              Necesitas 60% para aumentar tu racha. ¡Inténtalo de nuevo!
            </p>
          )}

          <div className="results-actions">
            {!isPassing && (
              <button 
                className="retry-btn"
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setShowResult(false);
                  setAnswers([]);
                  setQuizComplete(false);
                }}
              >
                Reintentar Quiz
              </button>
            )}
            <button className="finish-btn" onClick={handleFinish}>
              {isPassing ? 'Ver mi Racha' : 'Volver al Plan'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        {/* Progress */}
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
        </div>

        {/* Question */}
        <div className="question-section">
          <h2 className="question-text">{question.question}</h2>
          
          <div className="options-list">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedAnswer === index ? 'selected' : ''} ${
                  showResult 
                    ? index === question.correctIndex 
                      ? 'correct' 
                      : selectedAnswer === index 
                        ? 'incorrect' 
                        : ''
                    : ''
                }`}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
                {showResult && index === question.correctIndex && (
                  <span className="option-icon"><Check size={20} /></span>
                )}
                {showResult && selectedAnswer === index && index !== question.correctIndex && (
                  <span className="option-icon"><X size={20} /></span>
                )}
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`explanation ${selectedAnswer === question.correctIndex ? 'correct' : 'incorrect'}`}>
              <span className="explanation-icon">
                {selectedAnswer === question.correctIndex ? <Check size={20} /> : <Lightbulb size={20} />}
              </span>
              <p>{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="quiz-actions">
          {!showResult ? (
            <button 
              className="submit-btn"
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            >
              Verificar Respuesta
            </button>
          ) : (
            <button className="next-btn" onClick={handleNextQuestion}>
              {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
