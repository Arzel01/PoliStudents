import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  X, 
  Sparkles, 
  GraduationCap, 
  User, 
  Building2,
  Bot,
  BookOpen,
  Calendar,
  Flame,
  Star,
  Crown
} from 'lucide-react';
import '../styles/pages/Pricing.css';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  icon: typeof GraduationCap;
  features: PlanFeature[];
  highlighted?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    period: 'para siempre',
    description: 'Perfecto para explorar y comenzar tu camino de estudio',
    icon: BookOpen,
    features: [
      { text: 'Acceso a materias predeterminadas', included: true },
      { text: 'Técnicas de estudio (Pomodoro, etc.)', included: true },
      { text: 'Seguimiento de racha', included: true },
      { text: 'Calendario básico', included: true },
      { text: 'Ranking con amigos', included: true },
      { text: 'Agregar materias personalizadas', included: false },
      { text: 'Chatbot IA personalizado', included: false },
      { text: 'Búsqueda en recursos académicos', included: false },
    ]
  },
  {
    id: 'student',
    name: 'Estudiante',
    price: 5,
    period: '/mes',
    description: 'Ideal para estudiantes que quieren más control',
    icon: GraduationCap,
    highlighted: true,
    badge: 'Más Popular',
    features: [
      { text: 'Todo del plan gratuito', included: true },
      { text: 'Agregar materias personalizadas', included: true },
      { text: 'Chatbot IA para personalizar estudios', included: true },
      { text: '50 consultas IA por mes', included: true },
      { text: 'Búsqueda en recursos académicos', included: true },
      { text: 'Soporte por email', included: true },
      { text: 'Materias ilimitadas', included: false },
      { text: 'Exportar planes de estudio', included: false },
    ]
  },
  {
    id: 'personal',
    name: 'Personal',
    price: 15,
    period: '/mes',
    description: 'Para profesionales y estudiantes avanzados',
    icon: User,
    features: [
      { text: 'Todo del plan estudiante', included: true },
      { text: '150 consultas IA por mes', included: true },
      { text: 'Materias ilimitadas', included: true },
      { text: 'Exportar planes de estudio', included: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'Temas personalizados', included: true },
      { text: 'Sin anuncios', included: true },
      { text: 'API access', included: false },
    ]
  },
  {
    id: 'enterprise',
    name: 'Empresa',
    price: 150,
    period: '/mes',
    description: 'Para instituciones educativas y empresas',
    icon: Building2,
    badge: 'Mejor Valor',
    features: [
      { text: 'Todo del plan personal', included: true },
      { text: 'Consultas IA ilimitadas', included: true },
      { text: 'Panel de administración', included: true },
      { text: 'Reportes y analíticas', included: true },
      { text: 'API access completo', included: true },
      { text: 'Soporte dedicado 24/7', included: true },
      { text: 'Múltiples usuarios', included: true },
      { text: 'Personalización de marca', included: true },
    ]
  }
];

export default function Pricing() {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    // En modo demo, solo mostrar alerta
    if (planId === 'free') {
      alert('¡Ya tienes el plan gratuito activo!');
    } else {
      alert(`Plan ${planId} seleccionado. En una versión completa, aquí se abriría el proceso de pago.`);
    }
  };

  return (
    <div className="pricing-page">
      <div className="pricing-container">
        <header className="pricing-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={18} /> Inicio
          </button>
        </header>

        <div className="pricing-hero">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Planes y Precios</span>
          </div>
          <h1>Elige el plan perfecto para ti</h1>
          <p>
            Comienza gratis y actualiza cuando necesites más funciones. 
            Todos los planes incluyen nuestras técnicas de estudio comprobadas.
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            return (
              <div 
                key={plan.id} 
                className={`plan-card ${plan.highlighted ? 'highlighted' : ''}`}
              >
                {plan.badge && (
                  <div className="plan-badge">
                    <Star size={14} />
                    {plan.badge}
                  </div>
                )}
                
                <div className="plan-icon">
                  <PlanIcon size={32} />
                </div>
                
                <h2 className="plan-name">{plan.name}</h2>
                
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
                
                <p className="plan-description">{plan.description}</p>
                
                <button 
                  className={`plan-btn ${plan.highlighted ? 'primary' : ''}`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {plan.id === 'free' ? 'Plan Actual' : 'Seleccionar'}
                </button>
                
                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index} className={feature.included ? 'included' : 'excluded'}>
                      {feature.included ? (
                        <Check size={16} className="check-icon" />
                      ) : (
                        <X size={16} className="x-icon" />
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <section className="pricing-faq">
          <h2>Preguntas Frecuentes</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>¿Puedo cambiar de plan después?</h3>
              <p>Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se reflejan inmediatamente.</p>
            </div>
            
            <div className="faq-item">
              <h3>¿Qué son las materias predeterminadas?</h3>
              <p>Son materias con contenido ya preparado como Cálculo, Química y Programación que puedes estudiar sin agregar material propio.</p>
            </div>
            
            <div className="faq-item">
              <h3>¿Cómo funciona el chatbot IA?</h3>
              <p>El chatbot te ayuda a personalizar tu plan de estudios buscando información en recursos académicos según tus necesidades.</p>
            </div>
            
            <div className="faq-item">
              <h3>¿Hay descuentos para grupos?</h3>
              <p>Sí, el plan Empresa incluye múltiples usuarios. Contáctanos para descuentos en instituciones educativas.</p>
            </div>
          </div>
        </section>

        <section className="pricing-cta">
          <div className="cta-card">
            <Crown size={32} />
            <h2>¿Eres estudiante verificado?</h2>
            <p>Obtén el plan Estudiante con un 20% de descuento adicional verificando tu email institucional (.edu)</p>
            <button className="cta-btn">Verificar ahora</button>
          </div>
        </section>
      </div>
    </div>
  );
}
