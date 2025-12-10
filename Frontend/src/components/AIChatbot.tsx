import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Search, 
  BookOpen,
  Loader2,
  ExternalLink,
  Plus,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import '../styles/components/AIChatbot.css';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: Source[];
  suggestedTopics?: string[];
}

interface Source {
  title: string;
  url: string;
  type: 'book' | 'article' | 'web';
}

interface ChatContext {
  subject?: string;
  topic?: string;
  planId?: string;
}

// Simulated AI responses based on keywords
const getAIResponse = (message: string, context: ChatContext): { content: string; sources: Source[]; suggestedTopics: string[] } => {
  const lowerMessage = message.toLowerCase();
  
  // Search academic topics
  if (lowerMessage.includes('límite') || lowerMessage.includes('limite') || lowerMessage.includes('derivada')) {
    return {
      content: `He encontrado información relevante sobre ${lowerMessage.includes('límite') ? 'límites' : 'derivadas'} para tu plan de estudios.

**Definición formal:**
${lowerMessage.includes('límite') 
  ? 'El límite de una función f(x) cuando x tiende a a es L si para todo ε > 0 existe δ > 0 tal que si 0 < |x - a| < δ entonces |f(x) - L| < ε.'
  : 'La derivada de una función f en un punto a se define como el límite: f\'(a) = lim(h→0) [f(a+h) - f(a)] / h'}

**Temas relacionados que puedo agregar a tu plan:**
- Propiedades de límites
- Límites laterales
- Límites notables
- Continuidad de funciones

¿Quieres que agregue alguno de estos temas a tu plan de estudios?`,
      sources: [
        { title: 'Stewart, J. - Cálculo de una variable', url: '#', type: 'book' },
        { title: 'Khan Academy - Límites', url: 'https://khanacademy.org/math/calculus', type: 'web' },
        { title: 'MIT OpenCourseWare - Single Variable Calculus', url: 'https://ocw.mit.edu', type: 'article' }
      ],
      suggestedTopics: ['Propiedades de límites', 'Límites laterales', 'Límites al infinito', 'Continuidad']
    };
  }
  
  if (lowerMessage.includes('integral') || lowerMessage.includes('integración')) {
    return {
      content: `Excelente tema. La integración es fundamental en cálculo.

**Concepto básico:**
La integral definida de f(x) de a hasta b representa el área bajo la curva f(x) entre x=a y x=b.

**Técnicas que puedo incluir:**
- Integración por sustitución
- Integración por partes
- Fracciones parciales
- Integrales impropias

¿Te gustaría que profundice en alguna técnica específica o la agregue a tu plan?`,
      sources: [
        { title: 'Larson - Cálculo', url: '#', type: 'book' },
        { title: 'Paul\'s Online Math Notes', url: 'https://tutorial.math.lamar.edu', type: 'web' }
      ],
      suggestedTopics: ['Sustitución trigonométrica', 'Integración por partes', 'Aplicaciones de integrales']
    };
  }

  if (lowerMessage.includes('química') || lowerMessage.includes('mol') || lowerMessage.includes('estequiometría')) {
    return {
      content: `Puedo ayudarte con temas de química.

**Conceptos fundamentales:**
- El mol es la unidad de cantidad de sustancia (6.022 × 10²³ partículas)
- La estequiometría relaciona cantidades de reactivos y productos

**Temas disponibles para agregar:**
- Balanceo de ecuaciones químicas
- Cálculos estequiométricos
- Reactivo limitante
- Rendimiento de reacciones

¿Qué tema te gustaría explorar más a fondo?`,
      sources: [
        { title: 'Chang - Química General', url: '#', type: 'book' },
        { title: 'ChemLibreTexts', url: 'https://chem.libretexts.org', type: 'web' }
      ],
      suggestedTopics: ['Balanceo de ecuaciones', 'Estequiometría', 'Gases ideales', 'Soluciones']
    };
  }

  if (lowerMessage.includes('programación') || lowerMessage.includes('python') || lowerMessage.includes('código')) {
    return {
      content: `¡La programación es un excelente campo de estudio!

**Puedo agregar temas como:**
- Estructuras de datos (listas, diccionarios, conjuntos)
- Algoritmos básicos (búsqueda, ordenamiento)
- Programación orientada a objetos
- Manejo de excepciones

**Recursos recomendados:**
La práctica constante es clave. Te sugiero ejercicios progresivos.

¿Quieres que agregue algún tema específico o prefieres un camino de aprendizaje completo?`,
      sources: [
        { title: 'Python.org - Tutorial oficial', url: 'https://docs.python.org/es/3/tutorial/', type: 'web' },
        { title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com', type: 'book' }
      ],
      suggestedTopics: ['Variables y tipos', 'Estructuras de control', 'Funciones', 'POO']
    };
  }

  if (lowerMessage.includes('agregar') || lowerMessage.includes('añadir') || lowerMessage.includes('incluir')) {
    return {
      content: `¡Perfecto! Voy a preparar ese contenido para agregarlo a tu plan de estudios.

**Lo que haré:**
1. Buscar información en fuentes académicas confiables
2. Estructurar el contenido en lecciones progresivas
3. Crear preguntas de práctica
4. Agregar ejemplos resueltos

El contenido estará disponible en tu plan de estudios en la sección correspondiente.

¿Hay algún aspecto específico en el que quieras que me enfoque más?`,
      sources: [],
      suggestedTopics: ['Más ejemplos prácticos', 'Ejercicios de refuerzo', 'Resumen del tema']
    };
  }

  // Default response
  return {
    content: `Entiendo que quieres información sobre "${message}". 

Puedo ayudarte a:
- **Buscar contenido académico** sobre cualquier tema
- **Agregar temas** a tu plan de estudios actual
- **Explicar conceptos** con ejemplos y fuentes confiables
- **Recomendar recursos** de libros y sitios académicos

Por favor, dime específicamente:
1. ¿Qué tema quieres estudiar?
2. ¿Qué materia es? (Cálculo, Química, Programación, etc.)
3. ¿Qué nivel de profundidad necesitas?`,
    sources: [],
    suggestedTopics: ['Cálculo - Límites', 'Química - Estequiometría', 'Programación - Python']
  };
};

export default function AIChatbot() {
  const navigate = useNavigate();
  const location = useLocation();
  const context: ChatContext = location.state || {};
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `¡Hola! Soy tu asistente de estudio con IA. 🎓

Puedo ayudarte a personalizar tu plan de estudios buscando información en recursos académicos.

**¿Qué puedo hacer por ti?**
- Buscar y agregar temas a tu plan
- Explicar conceptos con fuentes confiables
- Recomendar material de estudio
- Crear contenido personalizado

${context.subject ? `Veo que estás estudiando **${context.subject}**. ¿En qué tema te gustaría profundizar?` : '¿Sobre qué tema te gustaría aprender hoy?'}`,
      timestamp: new Date(),
      suggestedTopics: context.subject === 'Cálculo' 
        ? ['Límites y continuidad', 'Derivadas', 'Integrales'] 
        : ['Cálculo', 'Química', 'Programación']
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [remainingQueries, setRemainingQueries] = useState(50); // Simulated limit
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const response = getAIResponse(userMessage.content, context);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        sources: response.sources,
        suggestedTopics: response.suggestedTopics
      };

      setMessages(prev => [...prev, assistantMessage]);
      setRemainingQueries(prev => prev - 1);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedTopic = (topic: string) => {
    setInputValue(`Quiero aprender sobre ${topic}`);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        <header className="chatbot-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} /> Volver
          </button>
          <div className="header-title">
            <Bot size={24} />
            <div>
              <h1>Asistente IA</h1>
              <span className="header-subtitle">Personaliza tu plan de estudios</span>
            </div>
          </div>
          <div className="queries-badge">
            <Sparkles size={14} />
            <span>{remainingQueries} consultas</span>
          </div>
        </header>

        {remainingQueries <= 5 && (
          <div className="low-queries-alert">
            <AlertCircle size={16} />
            <span>Te quedan pocas consultas. </span>
            <button onClick={() => navigate('/pricing')}>Actualizar plan</button>
          </div>
        )}

        <div className="messages-container">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.role}`}
            >
              <div className="message-avatar">
                {message.role === 'user' ? (
                  <User size={20} />
                ) : (
                  <Bot size={20} />
                )}
              </div>
              <div className="message-content">
                <div className="message-text">
                  {message.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                
                {message.sources && message.sources.length > 0 && (
                  <div className="message-sources">
                    <h4><Search size={14} /> Fuentes consultadas:</h4>
                    <ul>
                      {message.sources.map((source, i) => (
                        <li key={i}>
                          {source.type === 'book' && <BookOpen size={14} />}
                          {source.type === 'web' && <ExternalLink size={14} />}
                          {source.type === 'article' && <GraduationCap size={14} />}
                          <span>{source.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {message.suggestedTopics && message.suggestedTopics.length > 0 && (
                  <div className="suggested-topics">
                    {message.suggestedTopics.map((topic, i) => (
                      <button 
                        key={i} 
                        className="topic-btn"
                        onClick={() => handleSuggestedTopic(topic)}
                      >
                        <Plus size={14} />
                        {topic}
                      </button>
                    ))}
                  </div>
                )}

                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message assistant">
              <div className="message-avatar">
                <Bot size={20} />
              </div>
              <div className="message-content loading">
                <Loader2 size={20} className="spinner" />
                <span>Buscando información...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe lo que quieres aprender..."
              disabled={isLoading || remainingQueries <= 0}
            />
            <button 
              className="send-btn"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading || remainingQueries <= 0}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="input-hint">
            Ejemplo: "Quiero aprender sobre límites laterales" o "Agregar tema de derivadas"
          </p>
        </div>
      </div>
    </div>
  );
}
