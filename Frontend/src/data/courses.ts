// Datos de las materias demo con sus unidades y quizzes

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  content: string[];
  quiz: Question[];
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  units: Unit[];
}

export const courses: Course[] = [
  {
    id: 'calculo',
    name: 'Cálculo de una Variable',
    icon: '📐',
    color: '#6c5ce7',
    description: 'Límites, derivadas e integrales',
    units: [
      {
        id: 'limites',
        title: 'Límites',
        lessons: [
          {
            id: 'limites-1',
            title: 'Concepto de Límite',
            description: 'Introducción al concepto de límite y su interpretación geométrica',
            duration: 30,
            content: [
              'El límite describe el comportamiento de una función cuando x se acerca a un valor',
              'Notación: lim(x→a) f(x) = L',
              'El límite puede existir aunque la función no esté definida en ese punto'
            ],
            quiz: [
              {
                id: 'lim-q1',
                question: '¿Cuál es el valor de lim(x→2) (x² - 4)/(x - 2)?',
                options: ['0', '4', '2', 'No existe'],
                correctIndex: 1,
                explanation: 'Factorizando: (x²-4)/(x-2) = (x+2)(x-2)/(x-2) = x+2. Cuando x→2, el límite es 2+2 = 4'
              },
              {
                id: 'lim-q2',
                question: 'Si lim(x→a) f(x) = L, esto significa que:',
                options: [
                  'f(a) = L siempre',
                  'f(x) se acerca a L cuando x se acerca a a',
                  'La función es continua en a',
                  'La función está definida en a'
                ],
                correctIndex: 1,
                explanation: 'El límite describe el comportamiento de f(x) cuando x se aproxima a "a", independientemente del valor de f(a).'
              },
              {
                id: 'lim-q3',
                question: '¿Cuál es lim(x→0) sen(x)/x?',
                options: ['0', '1', 'Infinito', 'No existe'],
                correctIndex: 1,
                explanation: 'Este es un límite fundamental en cálculo. lim(x→0) sen(x)/x = 1, demostrable por L\'Hôpital o geométricamente.'
              }
            ]
          },
          {
            id: 'limites-2',
            title: 'Límites Laterales',
            description: 'Límites por la izquierda y por la derecha',
            duration: 25,
            content: [
              'Límite por la izquierda: lim(x→a⁻) f(x)',
              'Límite por la derecha: lim(x→a⁺) f(x)',
              'El límite existe si y solo si ambos límites laterales existen y son iguales'
            ],
            quiz: [
              {
                id: 'limlat-q1',
                question: 'Para f(x) = |x|/x, ¿cuál es lim(x→0⁺) f(x)?',
                options: ['-1', '0', '1', 'No existe'],
                correctIndex: 2,
                explanation: 'Cuando x > 0, |x| = x, entonces |x|/x = x/x = 1'
              },
              {
                id: 'limlat-q2',
                question: '¿Cuándo existe el límite lim(x→a) f(x)?',
                options: [
                  'Cuando f(a) está definida',
                  'Cuando los límites laterales son diferentes',
                  'Cuando ambos límites laterales existen e son iguales',
                  'Siempre existe'
                ],
                correctIndex: 2,
                explanation: 'El límite existe si y solo si lim(x→a⁻) f(x) = lim(x→a⁺) f(x)'
              }
            ]
          }
        ]
      },
      {
        id: 'derivadas',
        title: 'Derivadas',
        lessons: [
          {
            id: 'derivadas-1',
            title: 'Definición de Derivada',
            description: 'La derivada como límite y su interpretación geométrica',
            duration: 35,
            content: [
              'f\'(x) = lim(h→0) [f(x+h) - f(x)]/h',
              'La derivada representa la pendiente de la recta tangente',
              'Mide la tasa de cambio instantánea de la función'
            ],
            quiz: [
              {
                id: 'der-q1',
                question: 'Si f(x) = x³, ¿cuál es f\'(x)?',
                options: ['x²', '3x²', '3x', 'x³'],
                correctIndex: 1,
                explanation: 'Usando la regla de potencias: d/dx(xⁿ) = n·xⁿ⁻¹, entonces d/dx(x³) = 3x²'
              },
              {
                id: 'der-q2',
                question: 'La derivada de una función en un punto representa:',
                options: [
                  'El área bajo la curva',
                  'El valor máximo de la función',
                  'La pendiente de la recta tangente en ese punto',
                  'La distancia al origen'
                ],
                correctIndex: 2,
                explanation: 'Geométricamente, f\'(a) es la pendiente de la recta tangente a la curva en el punto (a, f(a)).'
              },
              {
                id: 'der-q3',
                question: '¿Cuál es la derivada de f(x) = sen(x) · cos(x)?',
                options: ['cos²(x) - sen²(x)', 'sen(x) + cos(x)', '-sen(x)cos(x)', '2sen(x)cos(x)'],
                correctIndex: 0,
                explanation: 'Por regla del producto: f\'(x) = cos(x)·cos(x) + sen(x)·(-sen(x)) = cos²(x) - sen²(x)'
              }
            ]
          },
          {
            id: 'derivadas-2',
            title: 'Reglas de Derivación',
            description: 'Reglas del producto, cociente y cadena',
            duration: 40,
            content: [
              'Regla del producto: (fg)\' = f\'g + fg\'',
              'Regla del cociente: (f/g)\' = (f\'g - fg\')/g²',
              'Regla de la cadena: (f∘g)\' = f\'(g(x))·g\'(x)'
            ],
            quiz: [
              {
                id: 'reglas-q1',
                question: 'Si f(x) = (2x + 1)⁵, ¿cuál es f\'(x)?',
                options: ['5(2x+1)⁴', '10(2x+1)⁴', '(2x+1)⁴', '10(2x+1)⁵'],
                correctIndex: 1,
                explanation: 'Por regla de la cadena: f\'(x) = 5(2x+1)⁴ · 2 = 10(2x+1)⁴'
              },
              {
                id: 'reglas-q2',
                question: 'La derivada de f(x) = x²·eˣ es:',
                options: ['2x·eˣ', 'x²·eˣ', '(2x + x²)·eˣ', '2x + eˣ'],
                correctIndex: 2,
                explanation: 'Por regla del producto: f\'(x) = 2x·eˣ + x²·eˣ = (2x + x²)·eˣ'
              }
            ]
          }
        ]
      },
      {
        id: 'integrales-indef',
        title: 'Integrales Indefinidas',
        lessons: [
          {
            id: 'int-indef-1',
            title: 'Antiderivadas',
            description: 'Concepto de integral indefinida y reglas básicas',
            duration: 30,
            content: [
              '∫f(x)dx = F(x) + C donde F\'(x) = f(x)',
              '∫xⁿdx = xⁿ⁺¹/(n+1) + C para n ≠ -1',
              '∫eˣdx = eˣ + C'
            ],
            quiz: [
              {
                id: 'antider-q1',
                question: '¿Cuál es ∫x⁴dx?',
                options: ['x⁵ + C', 'x⁵/5 + C', '4x³ + C', 'x⁴/4 + C'],
                correctIndex: 1,
                explanation: 'Usando ∫xⁿdx = xⁿ⁺¹/(n+1) + C: ∫x⁴dx = x⁵/5 + C'
              },
              {
                id: 'antider-q2',
                question: '∫(3x² + 2x - 1)dx es igual a:',
                options: ['6x + 2 + C', 'x³ + x² - x + C', '3x³ + 2x² - x + C', 'x³ + x² + C'],
                correctIndex: 1,
                explanation: 'Integrando término a término: ∫3x²dx + ∫2xdx - ∫1dx = x³ + x² - x + C'
              }
            ]
          }
        ]
      },
      {
        id: 'integrales-def',
        title: 'Integrales Definidas',
        lessons: [
          {
            id: 'int-def-1',
            title: 'Teorema Fundamental del Cálculo',
            description: 'Relación entre derivación e integración',
            duration: 35,
            content: [
              '∫ₐᵇ f(x)dx = F(b) - F(a)',
              'La integral definida representa el área bajo la curva',
              'Propiedades de linealidad de la integral'
            ],
            quiz: [
              {
                id: 'intdef-q1',
                question: '¿Cuál es el valor de ∫₀² x²dx?',
                options: ['4/3', '8/3', '4', '2'],
                correctIndex: 1,
                explanation: '∫₀² x²dx = [x³/3]₀² = 8/3 - 0 = 8/3'
              },
              {
                id: 'intdef-q2',
                question: '∫₁³ 2xdx representa:',
                options: [
                  'La pendiente de 2x entre 1 y 3',
                  'El área bajo la recta y = 2x desde x=1 hasta x=3',
                  'El valor de 2x en x = 2',
                  'La derivada de x² evaluada en 3'
                ],
                correctIndex: 1,
                explanation: 'La integral definida representa el área bajo la curva y = 2x en el intervalo [1,3]. Su valor es [x²]₁³ = 9 - 1 = 8'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'quimica',
    name: 'Química General',
    icon: '🧪',
    color: '#00b894',
    description: 'Termoquímica, soluciones y equilibrio',
    units: [
      {
        id: 'termoquimica',
        title: 'Introducción a la Termoquímica',
        lessons: [
          {
            id: 'termo-1',
            title: 'Energía y Reacciones Químicas',
            description: 'Entalpía, reacciones exotérmicas y endotérmicas',
            duration: 35,
            content: [
              'ΔH < 0: Reacción exotérmica (libera calor)',
              'ΔH > 0: Reacción endotérmica (absorbe calor)',
              'Ley de Hess: ΔH total = suma de ΔH parciales'
            ],
            quiz: [
              {
                id: 'termo-q1',
                question: 'Una reacción con ΔH = -285 kJ/mol es:',
                options: ['Endotérmica', 'Exotérmica', 'En equilibrio', 'Reversible'],
                correctIndex: 1,
                explanation: 'Un ΔH negativo indica que la reacción libera energía al entorno, por lo tanto es exotérmica.'
              },
              {
                id: 'termo-q2',
                question: 'La combustión del metano (CH₄ + 2O₂ → CO₂ + 2H₂O) tiene ΔH = -890 kJ. ¿Cuánta energía se libera al quemar 2 moles de metano?',
                options: ['445 kJ', '890 kJ', '1780 kJ', '2670 kJ'],
                correctIndex: 2,
                explanation: 'Si 1 mol libera 890 kJ, entonces 2 moles liberan 2 × 890 = 1780 kJ'
              },
              {
                id: 'termo-q3',
                question: 'Según la Ley de Hess, la entalpía de una reacción:',
                options: [
                  'Depende del camino de reacción',
                  'Es independiente del camino, solo depende de estados inicial y final',
                  'Siempre es negativa',
                  'Varía con la temperatura solamente'
                ],
                correctIndex: 1,
                explanation: 'La Ley de Hess establece que el cambio de entalpía es una función de estado, independiente del camino.'
              }
            ]
          }
        ]
      },
      {
        id: 'fuerzas-inter',
        title: 'Fuerzas Intermoleculares',
        lessons: [
          {
            id: 'fuerzas-1',
            title: 'Tipos de Fuerzas Intermoleculares',
            description: 'Van der Waals, dipolo-dipolo, puentes de hidrógeno',
            duration: 30,
            content: [
              'Fuerzas de London: presentes en todas las moléculas',
              'Dipolo-dipolo: entre moléculas polares',
              'Puentes de hidrógeno: H unido a N, O o F'
            ],
            quiz: [
              {
                id: 'fuerzas-q1',
                question: '¿Por qué el agua tiene un punto de ebullición tan alto comparado con H₂S?',
                options: [
                  'El agua es más pesada',
                  'El agua forma puentes de hidrógeno',
                  'El H₂S es un gas',
                  'El oxígeno es más electronegativo que el azufre'
                ],
                correctIndex: 1,
                explanation: 'El agua forma puentes de hidrógeno (O-H···O) que son mucho más fuertes que las fuerzas dipolo-dipolo del H₂S.'
              },
              {
                id: 'fuerzas-q2',
                question: '¿Cuál de estas sustancias NO puede formar puentes de hidrógeno?',
                options: ['NH₃', 'HF', 'CH₄', 'H₂O'],
                correctIndex: 2,
                explanation: 'El CH₄ no tiene H unido a N, O o F, por lo que no puede formar puentes de hidrógeno.'
              }
            ]
          }
        ]
      },
      {
        id: 'liquidos-solidos',
        title: 'Líquidos y Sólidos',
        lessons: [
          {
            id: 'estados-1',
            title: 'Propiedades de Líquidos y Sólidos',
            description: 'Viscosidad, tensión superficial, estructuras cristalinas',
            duration: 30,
            content: [
              'Viscosidad: resistencia al flujo',
              'Tensión superficial: energía por unidad de área',
              'Sólidos cristalinos vs amorfos'
            ],
            quiz: [
              {
                id: 'liq-q1',
                question: 'La tensión superficial del agua permite que:',
                options: [
                  'El agua hierva a 100°C',
                  'Algunos insectos caminen sobre el agua',
                  'El agua se congele a 0°C',
                  'El agua disuelva sales'
                ],
                correctIndex: 1,
                explanation: 'La alta tensión superficial del agua crea una "película" en la superficie que soporta objetos ligeros.'
              }
            ]
          }
        ]
      },
      {
        id: 'disoluciones',
        title: 'Propiedades de las Disoluciones',
        lessons: [
          {
            id: 'disol-1',
            title: 'Concentración y Propiedades Coligativas',
            description: 'Molaridad, molalidad, presión osmótica',
            duration: 35,
            content: [
              'Molaridad (M) = moles soluto / litros solución',
              'Molalidad (m) = moles soluto / kg solvente',
              'ΔTeb = Kb · m · i (elevación del punto de ebullición)'
            ],
            quiz: [
              {
                id: 'disol-q1',
                question: 'Si disuelves 58.5 g de NaCl (PM=58.5) en agua hasta completar 500 mL de solución, ¿cuál es la molaridad?',
                options: ['0.5 M', '1.0 M', '2.0 M', '0.25 M'],
                correctIndex: 2,
                explanation: 'n = 58.5g / 58.5g/mol = 1 mol. M = 1 mol / 0.5 L = 2 M'
              },
              {
                id: 'disol-q2',
                question: '¿Qué solución tiene mayor punto de ebullición?',
                options: ['1 m glucosa', '1 m NaCl', '1 m CaCl₂', 'Agua pura'],
                correctIndex: 2,
                explanation: 'CaCl₂ → Ca²⁺ + 2Cl⁻ produce 3 partículas (i=3), mayor elevación del punto de ebullición.'
              }
            ]
          }
        ]
      },
      {
        id: 'cinetica',
        title: 'Cinética Química',
        lessons: [
          {
            id: 'cinetica-1',
            title: 'Velocidad de Reacción',
            description: 'Factores que afectan la velocidad, ecuación de velocidad',
            duration: 35,
            content: [
              'v = k[A]ⁿ[B]ᵐ (ley de velocidad)',
              'Factores: temperatura, concentración, catalizadores',
              'Energía de activación (Ea)'
            ],
            quiz: [
              {
                id: 'cin-q1',
                question: 'Si la velocidad = k[A]²[B], ¿qué pasa si duplicamos [A]?',
                options: [
                  'La velocidad se duplica',
                  'La velocidad se cuadruplica',
                  'La velocidad se triplica',
                  'No cambia'
                ],
                correctIndex: 1,
                explanation: 'v = k[2A]²[B] = k·4[A]²[B] = 4v. Al duplicar [A], la velocidad se multiplica por 2² = 4'
              },
              {
                id: 'cin-q2',
                question: 'Un catalizador aumenta la velocidad de reacción porque:',
                options: [
                  'Aumenta la temperatura',
                  'Disminuye la energía de activación',
                  'Cambia el ΔH de la reacción',
                  'Aumenta la concentración de reactivos'
                ],
                correctIndex: 1,
                explanation: 'El catalizador proporciona un camino alternativo con menor energía de activación, sin cambiar el ΔH.'
              }
            ]
          }
        ]
      },
      {
        id: 'equilibrio',
        title: 'Equilibrio Químico',
        lessons: [
          {
            id: 'eq-1',
            title: 'Constante de Equilibrio',
            description: 'Kc, Kp y principio de Le Chatelier',
            duration: 40,
            content: [
              'Para aA + bB ⇌ cC + dD: Kc = [C]ᶜ[D]ᵈ/[A]ᵃ[B]ᵇ',
              'Le Chatelier: el sistema contrarresta los cambios',
              'Q vs K determina la dirección del equilibrio'
            ],
            quiz: [
              {
                id: 'eq-q1',
                question: 'Para N₂(g) + 3H₂(g) ⇌ 2NH₃(g), si aumentamos la presión:',
                options: [
                  'El equilibrio se desplaza hacia los reactivos',
                  'El equilibrio se desplaza hacia los productos',
                  'No hay cambio',
                  'La reacción se detiene'
                ],
                correctIndex: 1,
                explanation: 'Al aumentar la presión, el equilibrio favorece el lado con menos moles de gas. Reactivos: 4 moles, Productos: 2 moles.'
              },
              {
                id: 'eq-q2',
                question: 'Si Q < K para una reacción, entonces:',
                options: [
                  'El sistema está en equilibrio',
                  'La reacción procederá hacia la derecha (productos)',
                  'La reacción procederá hacia la izquierda (reactivos)',
                  'La reacción es imposible'
                ],
                correctIndex: 1,
                explanation: 'Q < K significa que hay más reactivos de lo que habría en el equilibrio, así que la reacción avanza hacia productos.'
              }
            ]
          }
        ]
      },
      {
        id: 'solubilidad',
        title: 'Equilibrio de Solubilidad',
        lessons: [
          {
            id: 'sol-1',
            title: 'Producto de Solubilidad (Kps)',
            description: 'Cálculos de solubilidad y precipitación',
            duration: 30,
            content: [
              'Para MₓAᵧ(s) ⇌ xMⁿ⁺(aq) + yAᵐ⁻(aq)',
              'Kps = [Mⁿ⁺]ˣ[Aᵐ⁻]ʸ',
              'Si Q > Kps, precipita'
            ],
            quiz: [
              {
                id: 'kps-q1',
                question: 'El Kps del AgCl es 1.8×10⁻¹⁰. ¿Cuál es la solubilidad molar del AgCl?',
                options: ['1.8×10⁻¹⁰ M', '1.3×10⁻⁵ M', '9×10⁻⁶ M', '1.8×10⁻⁵ M'],
                correctIndex: 1,
                explanation: 'AgCl → Ag⁺ + Cl⁻. Si s = solubilidad, Kps = s² = 1.8×10⁻¹⁰. s = √(1.8×10⁻¹⁰) ≈ 1.3×10⁻⁵ M'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'programacion',
    name: 'Fundamentos de Programación',
    icon: '💻',
    color: '#e17055',
    description: 'Variables, funciones y estructuras de datos',
    units: [
      {
        id: 'intro-prog',
        title: 'Introducción a la Programación',
        lessons: [
          {
            id: 'intro-1',
            title: 'Conceptos Básicos',
            description: 'Algoritmos, pseudocódigo y diagramas de flujo',
            duration: 25,
            content: [
              'Un algoritmo es una secuencia finita de pasos para resolver un problema',
              'El pseudocódigo describe algoritmos en lenguaje natural estructurado',
              'Los diagramas de flujo representan visualmente el flujo de un programa'
            ],
            quiz: [
              {
                id: 'intro-q1',
                question: '¿Cuál de las siguientes es una característica de un algoritmo?',
                options: [
                  'Puede tener pasos infinitos',
                  'Debe ser finito y tener un fin',
                  'Solo puede escribirse en Python',
                  'No requiere entrada ni salida'
                ],
                correctIndex: 1,
                explanation: 'Un algoritmo debe ser finito (terminar en algún momento), definido y efectivo.'
              },
              {
                id: 'intro-q2',
                question: 'En un diagrama de flujo, un rombo representa:',
                options: ['Una operación de entrada/salida', 'Un proceso', 'Una decisión', 'El inicio/fin'],
                correctIndex: 2,
                explanation: 'El rombo se usa para representar decisiones o condiciones (if/else).'
              }
            ]
          }
        ]
      },
      {
        id: 'variables',
        title: 'Variables y Tipos de Datos',
        lessons: [
          {
            id: 'var-1',
            title: 'Variables y Asignación',
            description: 'Declaración de variables y tipos básicos',
            duration: 30,
            content: [
              'Una variable es un espacio en memoria con un nombre',
              'Tipos básicos: int, float, string, boolean',
              'Asignación: variable = valor'
            ],
            quiz: [
              {
                id: 'var-q1',
                question: '¿Qué valor tendrá x después de: x = 5; x = x + 3?',
                options: ['5', '3', '8', '53'],
                correctIndex: 2,
                explanation: 'Primero x = 5, luego x = 5 + 3 = 8. La variable se actualiza.'
              },
              {
                id: 'var-q2',
                question: '¿Cuál es el tipo de dato de "Hola Mundo"?',
                options: ['int', 'float', 'string', 'boolean'],
                correctIndex: 2,
                explanation: 'El texto entre comillas es una cadena de caracteres (string).'
              },
              {
                id: 'var-q3',
                question: 'Si a = "3" y b = "5", ¿qué resultado da a + b?',
                options: ['8', '"8"', '"35"', 'Error'],
                correctIndex: 2,
                explanation: 'Como ambos son strings, el operador + concatena: "3" + "5" = "35"'
              }
            ]
          },
          {
            id: 'var-2',
            title: 'Strings y Listas',
            description: 'Manipulación de cadenas y estructuras básicas',
            duration: 35,
            content: [
              'Strings: secuencias de caracteres inmutables',
              'Indexación: string[0] accede al primer carácter',
              'Listas: colecciones ordenadas y mutables [a, b, c]'
            ],
            quiz: [
              {
                id: 'str-q1',
                question: 'Si texto = "Python", ¿qué devuelve texto[1]?',
                options: ['P', 'y', 'Py', 'Error'],
                correctIndex: 1,
                explanation: 'Los índices empiezan en 0. texto[0]="P", texto[1]="y"'
              },
              {
                id: 'str-q2',
                question: 'Si lista = [1, 2, 3], ¿qué hace lista.append(4)?',
                options: [
                  'Reemplaza el 3 por 4',
                  'Añade 4 al final: [1, 2, 3, 4]',
                  'Añade 4 al inicio: [4, 1, 2, 3]',
                  'Devuelve [1, 2, 3, 4] sin modificar la original'
                ],
                correctIndex: 1,
                explanation: 'append() añade un elemento al final de la lista, modificándola.'
              },
              {
                id: 'str-q3',
                question: '¿Cuál es el resultado de len("Hola")?',
                options: ['3', '4', '5', '"Hola"'],
                correctIndex: 1,
                explanation: 'len() devuelve la cantidad de caracteres. "Hola" tiene 4 letras.'
              }
            ]
          }
        ]
      },
      {
        id: 'funciones',
        title: 'Funciones',
        lessons: [
          {
            id: 'func-1',
            title: 'Definición y Llamada de Funciones',
            description: 'Crear funciones reutilizables con parámetros',
            duration: 35,
            content: [
              'def nombre_funcion(parametros):',
              '    código',
              '    return valor',
              'Las funciones permiten reutilizar código'
            ],
            quiz: [
              {
                id: 'func-q1',
                question: '¿Qué imprime este código?\ndef suma(a, b):\n    return a + b\nprint(suma(3, 4))',
                options: ['3', '4', '7', 'suma(3, 4)'],
                correctIndex: 2,
                explanation: 'La función suma recibe 3 y 4, retorna 3+4=7, y print lo muestra.'
              },
              {
                id: 'func-q2',
                question: '¿Cuál es la diferencia entre parámetro y argumento?',
                options: [
                  'Son lo mismo',
                  'Parámetro es en la definición, argumento es en la llamada',
                  'Argumento es en la definición, parámetro es en la llamada',
                  'Parámetro es para strings, argumento para números'
                ],
                correctIndex: 1,
                explanation: 'def func(parametro) - en definición. func(argumento) - en llamada.'
              }
            ]
          }
        ]
      },
      {
        id: 'estructuras',
        title: 'Estructuras de Control',
        lessons: [
          {
            id: 'control-1',
            title: 'Condicionales y Bucles',
            description: 'if/else, while, for',
            duration: 40,
            content: [
              'if condicion: / elif: / else:',
              'while condicion: (repite mientras sea verdadero)',
              'for elemento in secuencia: (itera sobre elementos)'
            ],
            quiz: [
              {
                id: 'ctrl-q1',
                question: '¿Cuántas veces se ejecuta el print?\nfor i in range(5):\n    print(i)',
                options: ['4', '5', '6', 'Infinitas'],
                correctIndex: 1,
                explanation: 'range(5) genera 0,1,2,3,4 - cinco valores, cinco iteraciones.'
              },
              {
                id: 'ctrl-q2',
                question: '¿Qué imprime?\nx = 10\nif x > 5:\n    print("A")\nelif x > 8:\n    print("B")\nelse:\n    print("C")',
                options: ['A', 'B', 'A y B', 'C'],
                correctIndex: 0,
                explanation: 'x=10 > 5 es True, imprime "A" y sale. El elif no se evalúa porque el if ya fue verdadero.'
              },
              {
                id: 'ctrl-q3',
                question: '¿Qué hace break en un bucle?',
                options: [
                  'Pausa el bucle temporalmente',
                  'Termina el bucle inmediatamente',
                  'Salta a la siguiente iteración',
                  'Reinicia el bucle'
                ],
                correctIndex: 1,
                explanation: 'break termina el bucle. continue salta a la siguiente iteración.'
              }
            ]
          }
        ]
      },
      {
        id: 'colecciones',
        title: 'Colecciones',
        lessons: [
          {
            id: 'col-1',
            title: 'Diccionarios y Conjuntos',
            description: 'Estructuras de datos clave-valor y conjuntos',
            duration: 35,
            content: [
              'Diccionario: {clave: valor} - acceso por clave',
              'Conjunto (set): {a, b, c} - elementos únicos',
              'Tupla: (a, b, c) - inmutable'
            ],
            quiz: [
              {
                id: 'col-q1',
                question: 'Si d = {"a": 1, "b": 2}, ¿qué devuelve d["a"]?',
                options: ['1', '2', '"a"', '{"a": 1}'],
                correctIndex: 0,
                explanation: 'd["a"] accede al valor asociado a la clave "a", que es 1.'
              },
              {
                id: 'col-q2',
                question: '¿Cuál es el resultado de set([1, 2, 2, 3, 3, 3])?',
                options: ['{1, 2, 2, 3, 3, 3}', '{1, 2, 3}', '[1, 2, 3]', 'Error'],
                correctIndex: 1,
                explanation: 'Un set elimina duplicados, quedando solo {1, 2, 3}'
              }
            ]
          }
        ]
      },
      {
        id: 'arreglos',
        title: 'Arreglos N-dimensionales',
        lessons: [
          {
            id: 'arr-1',
            title: 'Matrices y Arreglos 2D',
            description: 'Listas anidadas y acceso a elementos',
            duration: 35,
            content: [
              'Matriz: lista de listas [[1,2], [3,4]]',
              'Acceso: matriz[fila][columna]',
              'Iteración con bucles anidados'
            ],
            quiz: [
              {
                id: 'arr-q1',
                question: 'Si m = [[1,2,3], [4,5,6]], ¿qué es m[1][0]?',
                options: ['1', '2', '4', '5'],
                correctIndex: 2,
                explanation: 'm[1] = [4,5,6] (segunda fila). m[1][0] = 4 (primer elemento).'
              },
              {
                id: 'arr-q2',
                question: '¿Cuántos elementos tiene una matriz 3x4?',
                options: ['7', '12', '34', '43'],
                correctIndex: 1,
                explanation: 'Una matriz 3x4 tiene 3 filas × 4 columnas = 12 elementos.'
              }
            ]
          }
        ]
      },
      {
        id: 'archivos',
        title: 'Archivos: Entrada y Salida',
        lessons: [
          {
            id: 'arch-1',
            title: 'Lectura y Escritura de Archivos',
            description: 'Manejo de archivos de texto',
            duration: 30,
            content: [
              'open(archivo, modo) - "r" leer, "w" escribir, "a" añadir',
              'with open() as f: - manejo seguro',
              'f.read(), f.readline(), f.write()'
            ],
            quiz: [
              {
                id: 'arch-q1',
                question: '¿Qué modo de apertura borra el contenido existente?',
                options: ['"r"', '"w"', '"a"', '"r+"'],
                correctIndex: 1,
                explanation: '"w" (write) crea el archivo o lo sobrescribe si existe. "a" (append) añade al final.'
              },
              {
                id: 'arch-q2',
                question: '¿Por qué se recomienda usar "with open()"?',
                options: [
                  'Es más rápido',
                  'El archivo se cierra automáticamente al terminar',
                  'Permite leer archivos más grandes',
                  'Es la única forma de escribir'
                ],
                correctIndex: 1,
                explanation: 'with garantiza que el archivo se cierre correctamente incluso si hay errores.'
              }
            ]
          }
        ]
      },
      {
        id: 'procesamiento',
        title: 'Procesamiento de Datos',
        lessons: [
          {
            id: 'proc-1',
            title: 'Manipulación y Análisis Básico',
            description: 'Filtrado, ordenamiento y búsqueda',
            duration: 35,
            content: [
              'Filtrar: [x for x in lista if condicion]',
              'Ordenar: sorted(lista) o lista.sort()',
              'Búsqueda: elemento in lista'
            ],
            quiz: [
              {
                id: 'proc-q1',
                question: '¿Qué devuelve [x*2 for x in [1,2,3]]?',
                options: ['[1, 2, 3]', '[2, 4, 6]', '[1, 4, 9]', '[[2], [4], [6]]'],
                correctIndex: 1,
                explanation: 'List comprehension: multiplica cada elemento por 2. [1*2, 2*2, 3*2] = [2, 4, 6]'
              },
              {
                id: 'proc-q2',
                question: '¿Cuál es el resultado de sorted([3, 1, 4, 1, 5])?',
                options: ['[5, 4, 3, 1, 1]', '[1, 1, 3, 4, 5]', '[3, 1, 4, 1, 5]', '[1, 3, 4, 5]'],
                correctIndex: 1,
                explanation: 'sorted() devuelve una nueva lista ordenada de menor a mayor.'
              }
            ]
          }
        ]
      }
    ]
  }
];

// Función para obtener todas las preguntas de un curso
export function getAllQuizQuestions(courseId: string): Question[] {
  const course = courses.find(c => c.id === courseId);
  if (!course) return [];
  
  const questions: Question[] = [];
  course.units.forEach(unit => {
    unit.lessons.forEach(lesson => {
      questions.push(...lesson.quiz);
    });
  });
  return questions;
}

// Función para obtener preguntas aleatorias
export function getRandomQuestions(courseId: string, count: number): Question[] {
  const allQuestions = getAllQuizQuestions(courseId);
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
