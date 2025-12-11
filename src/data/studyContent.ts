// Contenido educativo completo para las sesiones de estudio

export interface Example {
  problem: string;
  solution: string;
  difficulty: 'easy' | 'medium' | 'hard';
  steps?: string[];
}

export interface SubTopic {
  id: string;
  title: string;
  theory: string[];
  formulas?: string[];
  examples: Example[];
  tips?: string[];
}

export interface TopicContent {
  id: string;
  lessonId: string;
  title: string;
  introduction: string;
  subtopics: SubTopic[];
  summary: string[];
}

// =============================================
// CÁLCULO - LÍMITES Y CONTINUIDAD
// =============================================

export const calculoLimitesContent: TopicContent[] = [
  {
    id: 'limites-concepto',
    lessonId: 'limites-1',
    title: 'Concepto de Límite',
    introduction: 'El límite es uno de los conceptos fundamentales del cálculo. Describe el comportamiento de una función cuando la variable independiente se aproxima a un valor específico, sin necesariamente alcanzarlo.',
    subtopics: [
      {
        id: 'definicion-intuitiva',
        title: 'Definición Intuitiva de Límite',
        theory: [
          'Decimos que el límite de f(x) cuando x tiende a "a" es igual a L, y escribimos:',
          'lim(x→a) f(x) = L',
          'si podemos hacer que f(x) esté tan cerca de L como queramos, tomando x suficientemente cerca de "a" (pero x ≠ a).',
          'El límite describe hacia dónde "va" la función, no necesariamente dónde "está".',
          'Es importante entender que el valor de f(a) puede ser diferente de L, o incluso puede no existir.'
        ],
        formulas: [
          'lim(x→a) f(x) = L',
          'Esto significa: ∀ε > 0, ∃δ > 0 tal que si 0 < |x - a| < δ, entonces |f(x) - L| < ε'
        ],
        examples: [
          {
            problem: 'Calcular lim(x→3) (2x + 1)',
            solution: 'Sustitución directa: 2(3) + 1 = 7',
            difficulty: 'easy',
            steps: [
              'Como la función es continua (polinomio), podemos sustituir directamente',
              'f(3) = 2(3) + 1 = 6 + 1 = 7',
              'Por lo tanto, lim(x→3) (2x + 1) = 7'
            ]
          },
          {
            problem: 'Calcular lim(x→2) (x² - 4)/(x - 2)',
            solution: 'Factorizando: (x-2)(x+2)/(x-2) = x+2, entonces el límite es 4',
            difficulty: 'medium',
            steps: [
              'Al sustituir x=2 obtenemos 0/0 (indeterminación)',
              'Factorizamos el numerador: x² - 4 = (x-2)(x+2)',
              'Simplificamos: (x-2)(x+2)/(x-2) = x+2 (para x≠2)',
              'Ahora sí podemos sustituir: lim(x→2) (x+2) = 4'
            ]
          },
          {
            problem: 'Calcular lim(x→0) (√(x+1) - 1)/x',
            solution: 'Racionalizando: 1/(√(x+1) + 1), el límite es 1/2',
            difficulty: 'hard',
            steps: [
              'Al sustituir x=0 obtenemos 0/0 (indeterminación)',
              'Multiplicamos por el conjugado: (√(x+1) - 1)(√(x+1) + 1) / x(√(x+1) + 1)',
              'El numerador queda: (x+1) - 1 = x',
              'Simplificamos: x / (x(√(x+1) + 1)) = 1/(√(x+1) + 1)',
              'Sustituyendo: 1/(√(0+1) + 1) = 1/(1+1) = 1/2'
            ]
          }
        ],
        tips: [
          'Siempre intenta la sustitución directa primero',
          'Si obtienes 0/0, busca factorizar o racionalizar',
          'Recuerda que el límite puede existir aunque la función no esté definida en ese punto'
        ]
      },
      {
        id: 'definicion-formal',
        title: 'Definición Formal (Épsilon-Delta)',
        theory: [
          'La definición formal del límite fue desarrollada por Cauchy y Weierstrass.',
          'lim(x→a) f(x) = L si y solo si:',
          'Para todo número ε > 0 (épsilon), existe un número δ > 0 (delta) tal que:',
          'Si 0 < |x - a| < δ, entonces |f(x) - L| < ε',
          'Intuitivamente: podemos hacer f(x) tan cercano a L como queramos (distancia < ε), si tomamos x suficientemente cercano a "a" (distancia < δ).'
        ],
        formulas: [
          '∀ε > 0, ∃δ > 0 : 0 < |x - a| < δ ⟹ |f(x) - L| < ε',
          'La condición 0 < |x - a| significa que x ≠ a'
        ],
        examples: [
          {
            problem: 'Demostrar que lim(x→2) (3x - 1) = 5 usando épsilon-delta',
            solution: 'Tomar δ = ε/3',
            difficulty: 'hard',
            steps: [
              'Queremos: |f(x) - L| < ε, es decir |(3x-1) - 5| < ε',
              'Simplificando: |3x - 6| < ε → |3(x-2)| < ε → 3|x-2| < ε',
              'Dividiendo: |x - 2| < ε/3',
              'Si elegimos δ = ε/3, entonces:',
              'Si |x - 2| < δ = ε/3, entonces |3x - 6| = 3|x-2| < 3(ε/3) = ε',
              'Esto demuestra que lim(x→2) (3x-1) = 5'
            ]
          }
        ]
      }
    ],
    summary: [
      'El límite describe el comportamiento de f(x) cuando x se aproxima a un valor',
      'La definición formal usa épsilon (tolerancia en y) y delta (tolerancia en x)',
      'El límite puede existir aunque f(a) no esté definida',
      'Técnicas comunes: sustitución directa, factorización, racionalización'
    ]
  },
  {
    id: 'limites-laterales',
    lessonId: 'limites-2',
    title: 'Límites Laterales',
    introduction: 'Los límites laterales nos permiten analizar el comportamiento de una función desde un solo lado (izquierda o derecha). Son fundamentales para entender discontinuidades y funciones definidas por partes.',
    subtopics: [
      {
        id: 'limite-izquierda',
        title: 'Límite por la Izquierda',
        theory: [
          'El límite por la izquierda se denota como: lim(x→a⁻) f(x)',
          'Describe el comportamiento cuando x se acerca a "a" desde valores menores que "a"',
          'También se escribe: lim(x→a⁻) f(x) = L',
          'Ejemplo visual: si a = 2, consideramos valores como 1.9, 1.99, 1.999...'
        ],
        formulas: [
          'lim(x→a⁻) f(x) = L',
          'x → a⁻ significa x < a y x → a'
        ],
        examples: [
          {
            problem: 'Para f(x) = |x|/x, calcular lim(x→0⁻) f(x)',
            solution: 'Para x < 0: |x|/x = -x/x = -1, entonces el límite es -1',
            difficulty: 'medium',
            steps: [
              'Cuando x < 0, tenemos |x| = -x',
              'Entonces f(x) = -x/x = -1 para todo x < 0',
              'Por lo tanto, lim(x→0⁻) |x|/x = -1'
            ]
          }
        ]
      },
      {
        id: 'limite-derecha',
        title: 'Límite por la Derecha',
        theory: [
          'El límite por la derecha se denota como: lim(x→a⁺) f(x)',
          'Describe el comportamiento cuando x se acerca a "a" desde valores mayores que "a"',
          'Ejemplo visual: si a = 2, consideramos valores como 2.1, 2.01, 2.001...'
        ],
        formulas: [
          'lim(x→a⁺) f(x) = L',
          'x → a⁺ significa x > a y x → a'
        ],
        examples: [
          {
            problem: 'Para f(x) = |x|/x, calcular lim(x→0⁺) f(x)',
            solution: 'Para x > 0: |x|/x = x/x = 1, entonces el límite es 1',
            difficulty: 'medium',
            steps: [
              'Cuando x > 0, tenemos |x| = x',
              'Entonces f(x) = x/x = 1 para todo x > 0',
              'Por lo tanto, lim(x→0⁺) |x|/x = 1'
            ]
          }
        ]
      },
      {
        id: 'existencia-limite',
        title: 'Condición de Existencia del Límite',
        theory: [
          'El límite lim(x→a) f(x) existe si y solo si:',
          '1. Existe lim(x→a⁻) f(x)',
          '2. Existe lim(x→a⁺) f(x)',
          '3. lim(x→a⁻) f(x) = lim(x→a⁺) f(x)',
          'Si los límites laterales son diferentes, el límite bilateral NO existe.'
        ],
        examples: [
          {
            problem: '¿Existe lim(x→0) |x|/x?',
            solution: 'No existe, porque los límites laterales son diferentes (-1 ≠ 1)',
            difficulty: 'easy',
            steps: [
              'lim(x→0⁻) |x|/x = -1 (calculado antes)',
              'lim(x→0⁺) |x|/x = 1 (calculado antes)',
              'Como -1 ≠ 1, el límite no existe'
            ]
          },
          {
            problem: 'Dada f(x) = {x² si x<1, 2x-1 si x≥1}, ¿existe lim(x→1) f(x)?',
            solution: 'Sí existe y es igual a 1',
            difficulty: 'hard',
            steps: [
              'Límite por la izquierda (usamos x²): lim(x→1⁻) x² = 1',
              'Límite por la derecha (usamos 2x-1): lim(x→1⁺) (2x-1) = 2(1)-1 = 1',
              'Como ambos límites son iguales a 1, el límite existe y vale 1'
            ]
          }
        ]
      }
    ],
    summary: [
      'El límite por la izquierda considera valores menores que "a"',
      'El límite por la derecha considera valores mayores que "a"',
      'El límite bilateral existe solo si ambos límites laterales existen y son iguales',
      'Los límites laterales son esenciales para funciones definidas por partes'
    ]
  },
  {
    id: 'limites-notables',
    lessonId: 'limites-3',
    title: 'Límites Notables',
    introduction: 'Existen ciertos límites que aparecen frecuentemente en cálculo y cuyo valor es importante conocer. Estos límites notables son herramientas fundamentales para resolver problemas más complejos.',
    subtopics: [
      {
        id: 'limite-seno',
        title: 'Límite Fundamental Trigonométrico',
        theory: [
          'El límite más importante en trigonometría es:',
          'lim(x→0) sen(x)/x = 1',
          'Este límite se puede demostrar geométricamente usando el círculo unitario.',
          'De este límite se derivan muchos otros límites trigonométricos.'
        ],
        formulas: [
          'lim(x→0) sen(x)/x = 1',
          'lim(x→0) (1-cos(x))/x = 0',
          'lim(x→0) tan(x)/x = 1',
          'lim(x→0) (1-cos(x))/x² = 1/2'
        ],
        examples: [
          {
            problem: 'Calcular lim(x→0) sen(3x)/x',
            solution: 'Multiplicamos y dividimos: 3·sen(3x)/(3x) = 3·1 = 3',
            difficulty: 'medium',
            steps: [
              'Queremos usar lim(u→0) sen(u)/u = 1',
              'Reescribimos: sen(3x)/x = 3·sen(3x)/(3x)',
              'Si u = 3x, cuando x→0, también u→0',
              'Entonces: 3·lim(u→0) sen(u)/u = 3·1 = 3'
            ]
          },
          {
            problem: 'Calcular lim(x→0) sen(5x)/sen(2x)',
            solution: '(5x/5x)·sen(5x) / (2x/2x)·sen(2x) = 5/2',
            difficulty: 'hard',
            steps: [
              'Reescribimos: [sen(5x)/(5x)]·(5x) / [sen(2x)/(2x)]·(2x)',
              '= [sen(5x)/(5x)] / [sen(2x)/(2x)] · (5x/2x)',
              '= 1/1 · (5/2) = 5/2'
            ]
          }
        ]
      },
      {
        id: 'limite-euler',
        title: 'Límite de Euler (Número e)',
        theory: [
          'El número e ≈ 2.71828... se define mediante el límite:',
          'e = lim(n→∞) (1 + 1/n)ⁿ',
          'También se puede escribir como:',
          'lim(x→0) (1 + x)^(1/x) = e',
          'Este límite es fundamental para logaritmos y exponenciales.'
        ],
        formulas: [
          'e = lim(n→∞) (1 + 1/n)ⁿ ≈ 2.71828',
          'lim(x→0) (1 + x)^(1/x) = e',
          'lim(x→∞) (1 + a/x)^x = e^a',
          'lim(x→0) (e^x - 1)/x = 1'
        ],
        examples: [
          {
            problem: 'Calcular lim(x→∞) (1 + 3/x)^x',
            solution: 'Usando la forma e^a: el límite es e³',
            difficulty: 'medium',
            steps: [
              'Usamos lim(x→∞) (1 + a/x)^x = e^a',
              'Aquí a = 3',
              'Por lo tanto, el límite es e³ ≈ 20.09'
            ]
          },
          {
            problem: 'Calcular lim(x→0) (e^(2x) - 1)/x',
            solution: 'Usando sustitución: 2·(e^(2x)-1)/(2x) = 2·1 = 2',
            difficulty: 'hard',
            steps: [
              'Queremos usar lim(u→0) (e^u - 1)/u = 1',
              'Reescribimos: (e^(2x) - 1)/x = 2·(e^(2x) - 1)/(2x)',
              'Si u = 2x, cuando x→0, también u→0',
              'Entonces: 2·lim(u→0) (e^u - 1)/u = 2·1 = 2'
            ]
          }
        ]
      },
      {
        id: 'limite-logaritmo',
        title: 'Límites con Logaritmos',
        theory: [
          'Los logaritmos también tienen límites notables importantes:',
          'lim(x→0⁺) ln(x) = -∞',
          'lim(x→∞) ln(x) = ∞ (pero crece muy lento)',
          'lim(x→0) ln(1+x)/x = 1'
        ],
        formulas: [
          'lim(x→0) ln(1+x)/x = 1',
          'lim(x→∞) ln(x)/x = 0',
          'lim(x→∞) x/e^x = 0'
        ],
        examples: [
          {
            problem: 'Calcular lim(x→0) ln(1+3x)/x',
            solution: '3·ln(1+3x)/(3x) = 3·1 = 3',
            difficulty: 'medium',
            steps: [
              'Usamos lim(u→0) ln(1+u)/u = 1',
              'Reescribimos: ln(1+3x)/x = 3·ln(1+3x)/(3x)',
              'Si u = 3x, el límite es 3·1 = 3'
            ]
          }
        ]
      }
    ],
    summary: [
      'lim(x→0) sen(x)/x = 1 - límite fundamental trigonométrico',
      'e = lim(n→∞) (1 + 1/n)ⁿ - definición del número e',
      'lim(x→0) (e^x - 1)/x = 1 - límite exponencial',
      'lim(x→0) ln(1+x)/x = 1 - límite logarítmico',
      'Estos límites se usan como "bloques de construcción" para resolver límites más complejos'
    ]
  }
];

// =============================================
// QUÍMICA - TERMOQUÍMICA
// =============================================

export const quimicaTermoquimicaContent: TopicContent[] = [
  {
    id: 'termodinamica-intro',
    lessonId: 'termo-1',
    title: 'Introducción a la Termoquímica',
    introduction: 'La termoquímica estudia los cambios de energía que acompañan a las reacciones químicas. Comprender estos cambios es fundamental para predecir si una reacción ocurrirá espontáneamente y cómo se puede controlar.',
    subtopics: [
      {
        id: 'conceptos-basicos',
        title: 'Conceptos Fundamentales',
        theory: [
          'Sistema: la parte del universo que estamos estudiando',
          'Entorno: todo lo que rodea al sistema',
          'Sistema abierto: intercambia materia y energía con el entorno',
          'Sistema cerrado: solo intercambia energía (no materia)',
          'Sistema aislado: no intercambia ni materia ni energía',
          'Energía interna (U): suma de todas las energías de las partículas del sistema'
        ],
        formulas: [
          'ΔU = q + w (Primera Ley de la Termodinámica)',
          'q = calor transferido',
          'w = trabajo realizado'
        ],
        examples: [
          {
            problem: 'Un sistema absorbe 500 J de calor y realiza 200 J de trabajo. ¿Cuál es el cambio en la energía interna?',
            solution: 'ΔU = q + w = 500 + (-200) = 300 J',
            difficulty: 'easy',
            steps: [
              'Datos: q = +500 J (absorbe calor, positivo)',
              'w = -200 J (el sistema realiza trabajo, negativo)',
              'Aplicamos: ΔU = q + w = 500 + (-200) = 300 J',
              'La energía interna aumenta en 300 J'
            ]
          }
        ]
      },
      {
        id: 'entalpia',
        title: 'Entalpía (H)',
        theory: [
          'La entalpía H es una función de estado que representa el contenido calórico del sistema a presión constante.',
          'H = U + PV',
          'Para reacciones a presión constante: ΔH = q_p',
          'ΔH < 0: reacción exotérmica (libera calor)',
          'ΔH > 0: reacción endotérmica (absorbe calor)'
        ],
        formulas: [
          'H = U + PV',
          'ΔH = ΔU + PΔV (a presión constante)',
          'ΔH°rxn = Σ ΔH°f(productos) - Σ ΔH°f(reactivos)'
        ],
        examples: [
          {
            problem: 'La combustión del metano tiene ΔH = -890 kJ/mol. ¿Es exotérmica o endotérmica? ¿Qué significa?',
            solution: 'Es exotérmica porque ΔH < 0. Libera 890 kJ por cada mol de CH₄ quemado.',
            difficulty: 'easy',
            steps: [
              'ΔH = -890 kJ/mol (valor negativo)',
              'Como ΔH < 0, la reacción es EXOTÉRMICA',
              'Esto significa que libera energía al entorno',
              'CH₄ + 2O₂ → CO₂ + 2H₂O + 890 kJ'
            ]
          },
          {
            problem: 'Calcular ΔH° para: 2H₂(g) + O₂(g) → 2H₂O(l). Datos: ΔH°f[H₂O(l)] = -286 kJ/mol',
            solution: 'ΔH° = 2(-286) - 0 = -572 kJ',
            difficulty: 'medium',
            steps: [
              'Usamos: ΔH°rxn = Σ ΔH°f(productos) - Σ ΔH°f(reactivos)',
              'ΔH°f de elementos en estado estándar = 0',
              'ΔH° = 2·ΔH°f[H₂O(l)] - [2·ΔH°f(H₂) + ΔH°f(O₂)]',
              'ΔH° = 2(-286) - [0 + 0] = -572 kJ'
            ]
          }
        ],
        tips: [
          'Las entalpías de formación de elementos puros en estado estándar son CERO',
          'Exotérmica = libera calor = ΔH negativo',
          'Endotérmica = absorbe calor = ΔH positivo'
        ]
      }
    ],
    summary: [
      'La termoquímica estudia la energía en reacciones químicas',
      'Primera Ley: ΔU = q + w (conservación de energía)',
      'Entalpía (H) mide el calor a presión constante',
      'ΔH < 0: exotérmica; ΔH > 0: endotérmica'
    ]
  }
];

// =============================================
// PROGRAMACIÓN - FUNDAMENTOS
// =============================================

export const programacionContent: TopicContent[] = [
  {
    id: 'variables-tipos',
    lessonId: 'prog-variables',
    title: 'Variables y Tipos de Datos',
    introduction: 'Las variables son contenedores que almacenan datos en la memoria. Entender los tipos de datos es fundamental para escribir programas correctos y eficientes.',
    subtopics: [
      {
        id: 'que-es-variable',
        title: '¿Qué es una Variable?',
        theory: [
          'Una variable es un espacio en memoria con un nombre que almacena un valor.',
          'El nombre de la variable es un identificador que usamos para acceder al valor.',
          'Las variables pueden cambiar su valor durante la ejecución del programa.',
          'En Python, las variables se crean al asignarles un valor (no se declaran tipo).'
        ],
        examples: [
          {
            problem: 'Crear variables para almacenar nombre, edad y si es estudiante',
            solution: 'nombre = "Ana"\nedad = 20\nes_estudiante = True',
            difficulty: 'easy',
            steps: [
              'nombre = "Ana"  # Variable tipo string (cadena)',
              'edad = 20  # Variable tipo int (entero)',
              'es_estudiante = True  # Variable tipo bool (booleano)'
            ]
          }
        ]
      },
      {
        id: 'tipos-datos',
        title: 'Tipos de Datos Primitivos',
        theory: [
          'int: números enteros (1, 42, -7)',
          'float: números decimales (3.14, -0.5, 2.0)',
          'str: cadenas de texto ("Hola", \'Python\')',
          'bool: valores lógicos (True, False)',
          'Python es de tipado dinámico: el tipo se infiere automáticamente'
        ],
        examples: [
          {
            problem: 'Identificar el tipo de: 42, 3.14, "Hola", True',
            solution: '42→int, 3.14→float, "Hola"→str, True→bool',
            difficulty: 'easy',
            steps: [
              'type(42) → <class \'int\'>',
              'type(3.14) → <class \'float\'>',
              'type("Hola") → <class \'str\'>',
              'type(True) → <class \'bool\'>'
            ]
          },
          {
            problem: 'Convertir "123" a entero y sumarle 7',
            solution: 'int("123") + 7 = 130',
            difficulty: 'medium',
            steps: [
              'texto = "123"  # Es un string',
              'numero = int(texto)  # Convertimos a entero: 123',
              'resultado = numero + 7  # 123 + 7 = 130',
              'print(resultado)  # Muestra: 130'
            ]
          }
        ],
        tips: [
          'Usa type(variable) para verificar el tipo',
          'int(), float(), str() convierten entre tipos',
          'Los strings con números deben convertirse antes de hacer operaciones matemáticas'
        ]
      },
      {
        id: 'operadores',
        title: 'Operadores Básicos',
        theory: [
          'Aritméticos: + - * / // % **',
          '/ división normal, // división entera, % módulo (residuo), ** potencia',
          'Comparación: == != < > <= >=',
          'Lógicos: and, or, not',
          'Asignación: = += -= *= /='
        ],
        examples: [
          {
            problem: 'Calcular: 17 // 5, 17 % 5, 2 ** 10',
            solution: '17//5=3, 17%5=2, 2**10=1024',
            difficulty: 'easy',
            steps: [
              '17 // 5 = 3  # División entera (descarta decimales)',
              '17 % 5 = 2  # Módulo (residuo de 17÷5)',
              '2 ** 10 = 1024  # 2 elevado a la 10'
            ]
          },
          {
            problem: 'Verificar si un número es par usando el operador módulo',
            solution: 'numero % 2 == 0',
            difficulty: 'medium',
            steps: [
              'numero = 8',
              'es_par = (numero % 2 == 0)  # True si el residuo es 0',
              'print(f"{numero} es par: {es_par}")  # "8 es par: True"'
            ]
          },
          {
            problem: 'Escribir una expresión que verifique si una persona puede votar (edad >= 18) y es ciudadano',
            solution: '(edad >= 18) and es_ciudadano',
            difficulty: 'hard',
            steps: [
              'edad = 20',
              'es_ciudadano = True',
              'puede_votar = (edad >= 18) and es_ciudadano',
              'print(puede_votar)  # True'
            ]
          }
        ]
      }
    ],
    summary: [
      'Variables almacenan datos en memoria con un nombre identificador',
      'Tipos primitivos: int, float, str, bool',
      'Python tiene tipado dinámico (infiere el tipo)',
      'Operadores: aritméticos (+,-,*,/,//,%,**), comparación, lógicos'
    ]
  },
  {
    id: 'funciones-intro',
    lessonId: 'prog-funciones',
    title: 'Funciones en Python',
    introduction: 'Las funciones son bloques de código reutilizable que realizan una tarea específica. Permiten organizar el código, evitar repetición y hacer los programas más modulares.',
    subtopics: [
      {
        id: 'definir-funciones',
        title: 'Definición de Funciones',
        theory: [
          'Se definen con la palabra clave "def"',
          'Sintaxis: def nombre_funcion(parametros):',
          'El cuerpo de la función debe estar indentado',
          'Se usa "return" para devolver un valor',
          'Sin return, la función devuelve None'
        ],
        examples: [
          {
            problem: 'Crear una función que salude a una persona por su nombre',
            solution: 'def saludar(nombre):\n    return f"Hola, {nombre}!"',
            difficulty: 'easy',
            steps: [
              'def saludar(nombre):',
              '    mensaje = f"Hola, {nombre}!"',
              '    return mensaje',
              '',
              '# Uso:',
              'print(saludar("Ana"))  # "Hola, Ana!"'
            ]
          },
          {
            problem: 'Crear una función que calcule el área de un círculo dado el radio',
            solution: 'def area_circulo(radio):\n    return 3.14159 * radio ** 2',
            difficulty: 'medium',
            steps: [
              'import math  # Para usar pi con precisión',
              '',
              'def area_circulo(radio):',
              '    area = math.pi * radio ** 2',
              '    return area',
              '',
              '# Uso:',
              'print(area_circulo(5))  # 78.54...'
            ]
          },
          {
            problem: 'Crear una función que determine si un número es primo',
            solution: 'Usar bucle para verificar divisibilidad',
            difficulty: 'hard',
            steps: [
              'def es_primo(n):',
              '    if n < 2:',
              '        return False',
              '    for i in range(2, int(n**0.5) + 1):',
              '        if n % i == 0:',
              '            return False',
              '    return True',
              '',
              '# Uso:',
              'print(es_primo(17))  # True',
              'print(es_primo(15))  # False'
            ]
          }
        ]
      },
      {
        id: 'parametros-argumentos',
        title: 'Parámetros y Argumentos',
        theory: [
          'Parámetros: variables en la definición de la función',
          'Argumentos: valores pasados al llamar la función',
          'Parámetros por defecto: def func(x, y=10)',
          'Argumentos por nombre: func(y=5, x=3)',
          '*args: número variable de argumentos posicionales',
          '**kwargs: número variable de argumentos con nombre'
        ],
        examples: [
          {
            problem: 'Crear función con parámetro por defecto para calcular potencia',
            solution: 'def potencia(base, exp=2):\n    return base ** exp',
            difficulty: 'medium',
            steps: [
              'def potencia(base, exp=2):',
              '    return base ** exp',
              '',
              '# Usos:',
              'print(potencia(5))     # 25 (usa exp=2 por defecto)',
              'print(potencia(5, 3))  # 125 (5 al cubo)',
              'print(potencia(2, 10)) # 1024'
            ]
          }
        ]
      }
    ],
    summary: [
      'Las funciones se definen con "def nombre(params):"',
      'return devuelve un valor (None si se omite)',
      'Los parámetros pueden tener valores por defecto',
      'Las funciones promueven la reutilización y organización del código'
    ]
  }
];

// =============================================
// MAPA DE CONTENIDO POR LESSON ID
// =============================================

// =============================================
// CÁLCULO - DERIVADAS
// =============================================

export const calculoDerivdasContent: TopicContent[] = [
  {
    id: 'derivadas-definicion',
    lessonId: 'derivadas-1',
    title: 'Definición de Derivada',
    introduction: 'La derivada es uno de los conceptos centrales del cálculo. Representa la tasa de cambio instantánea de una función y tiene interpretaciones geométricas (pendiente de la tangente) y físicas (velocidad instantánea).',
    subtopics: [
      {
        id: 'concepto-derivada',
        title: 'Concepto y Definición',
        theory: [
          'La derivada de f en x se define como:',
          "f'(x) = lim(h→0) [f(x+h) - f(x)]/h",
          'También se escribe como df/dx o Df(x)',
          'Geométricamente, es la pendiente de la recta tangente a la curva en ese punto',
          'Físicamente, representa la velocidad instantánea si f es posición'
        ],
        formulas: [
          "f'(x) = lim(h→0) [f(x+h) - f(x)]/h",
          "f'(a) = lim(x→a) [f(x) - f(a)]/(x - a)"
        ],
        examples: [
          {
            problem: 'Calcular la derivada de f(x) = x² usando la definición',
            solution: "f'(x) = 2x",
            difficulty: 'medium',
            steps: [
              "f'(x) = lim(h→0) [(x+h)² - x²]/h",
              '= lim(h→0) [x² + 2xh + h² - x²]/h',
              '= lim(h→0) [2xh + h²]/h',
              '= lim(h→0) h(2x + h)/h',
              '= lim(h→0) (2x + h) = 2x'
            ]
          },
          {
            problem: 'Calcular f\'(2) para f(x) = 3x² - 2x + 1',
            solution: "f'(2) = 10",
            difficulty: 'easy',
            steps: [
              "Primero hallamos f'(x) = 6x - 2",
              "Luego evaluamos: f'(2) = 6(2) - 2 = 12 - 2 = 10"
            ]
          }
        ],
        tips: [
          'La derivada existe solo si el límite existe',
          'Una función puede ser continua pero no derivable (ej: |x| en x=0)'
        ]
      },
      {
        id: 'interpretacion-geometrica',
        title: 'Interpretación Geométrica',
        theory: [
          "f'(a) es la pendiente de la recta tangente a y = f(x) en el punto (a, f(a))",
          'Ecuación de la recta tangente: y - f(a) = f\'(a)(x - a)',
          "Si f'(a) > 0, la función crece en ese punto",
          "Si f'(a) < 0, la función decrece en ese punto",
          "Si f'(a) = 0, posible máximo, mínimo o punto de inflexión"
        ],
        examples: [
          {
            problem: 'Hallar la ecuación de la recta tangente a f(x) = x² en x = 3',
            solution: 'y = 6x - 9',
            difficulty: 'medium',
            steps: [
              'f(3) = 9, así que el punto es (3, 9)',
              "f'(x) = 2x, entonces f'(3) = 6",
              'Ecuación: y - 9 = 6(x - 3)',
              'y = 6x - 18 + 9 = 6x - 9'
            ]
          }
        ]
      }
    ],
    summary: [
      "f'(x) = lim(h→0) [f(x+h) - f(x)]/h define la derivada",
      'Geométricamente es la pendiente de la tangente',
      'Físicamente representa la tasa de cambio instantánea'
    ]
  },
  {
    id: 'reglas-derivacion',
    lessonId: 'derivadas-2',
    title: 'Reglas de Derivación',
    introduction: 'Las reglas de derivación nos permiten calcular derivadas de forma sistemática sin usar la definición cada vez. Son herramientas esenciales para trabajar con funciones complejas.',
    subtopics: [
      {
        id: 'reglas-basicas',
        title: 'Reglas Básicas',
        theory: [
          'Constante: d/dx(c) = 0',
          'Potencia: d/dx(xⁿ) = n·xⁿ⁻¹',
          'Constante por función: d/dx(c·f) = c·f\'',
          'Suma/Resta: d/dx(f ± g) = f\' ± g\''
        ],
        formulas: [
          'd/dx(c) = 0',
          'd/dx(xⁿ) = n·xⁿ⁻¹',
          'd/dx(eˣ) = eˣ',
          'd/dx(ln x) = 1/x',
          'd/dx(sen x) = cos x',
          'd/dx(cos x) = -sen x'
        ],
        examples: [
          {
            problem: 'Derivar f(x) = 3x⁴ - 2x³ + 5x - 7',
            solution: "f'(x) = 12x³ - 6x² + 5",
            difficulty: 'easy',
            steps: [
              'd/dx(3x⁴) = 12x³',
              'd/dx(-2x³) = -6x²',
              'd/dx(5x) = 5',
              'd/dx(-7) = 0',
              "f'(x) = 12x³ - 6x² + 5"
            ]
          }
        ]
      },
      {
        id: 'regla-producto-cociente',
        title: 'Regla del Producto y Cociente',
        theory: [
          "Producto: (f·g)' = f'·g + f·g'",
          "Cociente: (f/g)' = (f'·g - f·g')/g²"
        ],
        examples: [
          {
            problem: 'Derivar h(x) = x²·sen(x)',
            solution: "h'(x) = 2x·sen(x) + x²·cos(x)",
            difficulty: 'medium',
            steps: [
              'Usamos la regla del producto: (f·g)\' = f\'·g + f·g\'',
              'f = x², f\' = 2x',
              'g = sen(x), g\' = cos(x)',
              "h'(x) = 2x·sen(x) + x²·cos(x)"
            ]
          },
          {
            problem: 'Derivar h(x) = (x² + 1)/(x - 1)',
            solution: "h'(x) = (x² - 2x - 1)/(x-1)²",
            difficulty: 'hard',
            steps: [
              'Usamos la regla del cociente',
              'f = x² + 1, f\' = 2x',
              'g = x - 1, g\' = 1',
              "h'(x) = [2x(x-1) - (x²+1)·1]/(x-1)²",
              '= [2x² - 2x - x² - 1]/(x-1)²',
              '= (x² - 2x - 1)/(x-1)²'
            ]
          }
        ]
      },
      {
        id: 'regla-cadena',
        title: 'Regla de la Cadena',
        theory: [
          'Para funciones compuestas: d/dx[f(g(x))] = f\'(g(x))·g\'(x)',
          'Se deriva "de afuera hacia adentro"',
          'Es la regla más importante para funciones complejas'
        ],
        examples: [
          {
            problem: 'Derivar h(x) = (3x + 2)⁵',
            solution: "h'(x) = 15(3x + 2)⁴",
            difficulty: 'medium',
            steps: [
              'f(u) = u⁵, g(x) = 3x + 2',
              "f'(u) = 5u⁴, g'(x) = 3",
              "h'(x) = 5(3x+2)⁴ · 3 = 15(3x+2)⁴"
            ]
          },
          {
            problem: 'Derivar h(x) = sen(x²)',
            solution: "h'(x) = 2x·cos(x²)",
            difficulty: 'medium',
            steps: [
              'Función exterior: sen(u), interior: u = x²',
              "h'(x) = cos(x²) · 2x = 2x·cos(x²)"
            ]
          }
        ]
      }
    ],
    summary: [
      'd/dx(xⁿ) = n·xⁿ⁻¹ - Regla de la potencia',
      "(f·g)' = f'·g + f·g' - Regla del producto",
      "(f/g)' = (f'·g - f·g')/g² - Regla del cociente",
      "d/dx[f(g(x))] = f'(g(x))·g'(x) - Regla de la cadena"
    ]
  }
];

// =============================================
// CÁLCULO - INTEGRALES
// =============================================

export const calculoIntegralesContent: TopicContent[] = [
  {
    id: 'integrales-indefinidas',
    lessonId: 'int-indef-1',
    title: 'Integrales Indefinidas',
    introduction: 'La integral indefinida es la operación inversa de la derivada. Encontrar una integral indefinida significa hallar todas las funciones cuya derivada es la función dada.',
    subtopics: [
      {
        id: 'antiderivada',
        title: 'Concepto de Antiderivada',
        theory: [
          'F(x) es antiderivada de f(x) si F\'(x) = f(x)',
          'La integral indefinida incluye todas las antiderivadas: ∫f(x)dx = F(x) + C',
          'C es la constante de integración (número arbitrario)',
          'Por cada función hay infinitas antiderivadas que difieren en una constante'
        ],
        formulas: [
          '∫xⁿdx = xⁿ⁺¹/(n+1) + C (n ≠ -1)',
          '∫1/x dx = ln|x| + C',
          '∫eˣdx = eˣ + C',
          '∫cos(x)dx = sen(x) + C',
          '∫sen(x)dx = -cos(x) + C'
        ],
        examples: [
          {
            problem: 'Calcular ∫(3x² + 2x - 1)dx',
            solution: 'x³ + x² - x + C',
            difficulty: 'easy',
            steps: [
              '∫3x²dx = 3·x³/3 = x³',
              '∫2xdx = 2·x²/2 = x²',
              '∫(-1)dx = -x',
              'Resultado: x³ + x² - x + C'
            ]
          },
          {
            problem: 'Calcular ∫(eˣ + 1/x)dx',
            solution: 'eˣ + ln|x| + C',
            difficulty: 'medium',
            steps: [
              '∫eˣdx = eˣ',
              '∫(1/x)dx = ln|x|',
              'Resultado: eˣ + ln|x| + C'
            ]
          }
        ]
      },
      {
        id: 'sustitucion',
        title: 'Método de Sustitución',
        theory: [
          'Para integrales de la forma ∫f(g(x))·g\'(x)dx',
          'Se hace u = g(x), entonces du = g\'(x)dx',
          'La integral se transforma en ∫f(u)du',
          'Al final se sustituye u de vuelta por g(x)'
        ],
        examples: [
          {
            problem: 'Calcular ∫2x·cos(x²)dx',
            solution: 'sen(x²) + C',
            difficulty: 'medium',
            steps: [
              'Sea u = x², entonces du = 2xdx',
              '∫2x·cos(x²)dx = ∫cos(u)du',
              '= sen(u) + C = sen(x²) + C'
            ]
          },
          {
            problem: 'Calcular ∫x/(x²+1)dx',
            solution: '½ln(x²+1) + C',
            difficulty: 'hard',
            steps: [
              'Sea u = x²+1, entonces du = 2xdx',
              'xdx = du/2',
              '∫x/(x²+1)dx = ∫(1/u)·(du/2) = ½∫(1/u)du',
              '= ½ln|u| + C = ½ln(x²+1) + C'
            ]
          }
        ]
      }
    ],
    summary: [
      '∫f(x)dx = F(x) + C donde F\'(x) = f(x)',
      '∫xⁿdx = xⁿ⁺¹/(n+1) + C es la regla de potencias',
      'La sustitución simplifica integrales de funciones compuestas',
      'Siempre incluir la constante C en integrales indefinidas'
    ]
  },
  {
    id: 'integrales-definidas',
    lessonId: 'int-def-1',
    title: 'Integrales Definidas',
    introduction: 'La integral definida representa el área neta bajo una curva entre dos puntos. Es una de las herramientas más poderosas del cálculo con aplicaciones en física, ingeniería y economía.',
    subtopics: [
      {
        id: 'teorema-fundamental',
        title: 'Teorema Fundamental del Cálculo',
        theory: [
          'Si F es antiderivada de f en [a,b]:',
          '∫ₐᵇ f(x)dx = F(b) - F(a)',
          'Esto conecta las integrales con las derivadas',
          'Se escribe [F(x)]ₐᵇ = F(b) - F(a)'
        ],
        examples: [
          {
            problem: 'Calcular ∫₀² x²dx',
            solution: '8/3',
            difficulty: 'easy',
            steps: [
              'Antiderivada: F(x) = x³/3',
              '∫₀² x²dx = [x³/3]₀²',
              '= (2³/3) - (0³/3)',
              '= 8/3 - 0 = 8/3'
            ]
          },
          {
            problem: 'Calcular ∫₁ᵉ (1/x)dx',
            solution: '1',
            difficulty: 'medium',
            steps: [
              'Antiderivada de 1/x es ln|x|',
              '∫₁ᵉ (1/x)dx = [ln|x|]₁ᵉ',
              '= ln(e) - ln(1)',
              '= 1 - 0 = 1'
            ]
          }
        ]
      },
      {
        id: 'area-curvas',
        title: 'Área Entre Curvas',
        theory: [
          'Área entre f(x) y g(x) de a a b (con f ≥ g):',
          'A = ∫ₐᵇ [f(x) - g(x)]dx',
          'Primero determinar cuál función está arriba',
          'Si se cruzan, dividir en intervalos'
        ],
        examples: [
          {
            problem: 'Hallar el área entre y = x² y y = x desde x=0 hasta x=1',
            solution: '1/6',
            difficulty: 'medium',
            steps: [
              'En [0,1], x ≥ x² (línea arriba de parábola)',
              'A = ∫₀¹ (x - x²)dx',
              '= [x²/2 - x³/3]₀¹',
              '= (1/2 - 1/3) - 0 = 3/6 - 2/6 = 1/6'
            ]
          }
        ]
      }
    ],
    summary: [
      '∫ₐᵇ f(x)dx = F(b) - F(a) - Teorema Fundamental',
      'La integral definida calcula área neta bajo la curva',
      'Área entre curvas: ∫[f(x) - g(x)]dx',
      'El resultado es un número, no incluye constante C'
    ]
  }
];

// =============================================
// QUÍMICA - CONTENIDO ADICIONAL
// =============================================

export const quimicaAdicionalContent: TopicContent[] = [
  {
    id: 'fuerzas-intermoleculares',
    lessonId: 'fuerzas-1',
    title: 'Fuerzas Intermoleculares',
    introduction: 'Las fuerzas intermoleculares son interacciones entre moléculas que determinan propiedades físicas como punto de fusión, ebullición y solubilidad. Son más débiles que los enlaces covalentes o iónicos.',
    subtopics: [
      {
        id: 'tipos-fuerzas',
        title: 'Tipos de Fuerzas Intermoleculares',
        theory: [
          'Fuerzas de London (dispersión): presentes en TODAS las moléculas',
          'Se originan por dipolo instantáneo inducido',
          'Aumentan con el tamaño/masa molecular',
          'Dipolo-dipolo: entre moléculas polares permanentes',
          'Puentes de hidrógeno: H unido a N, O o F interactuando con N, O o F'
        ],
        formulas: [
          'Fuerza relativa: London < Dipolo-dipolo < Puente H < Iónico',
          'Punto ebullición ∝ fuerzas intermoleculares'
        ],
        examples: [
          {
            problem: '¿Por qué el H₂O tiene mayor punto de ebullición que el H₂S?',
            solution: 'El agua forma puentes de hidrógeno, el H₂S solo tiene fuerzas de London',
            difficulty: 'medium',
            steps: [
              'H₂O: O es muy electronegativo → forma puentes de H',
              'H₂S: S es menos electronegativo → solo fuerzas de London',
              'Puentes de H son más fuertes → mayor Teb para H₂O',
              'Teb(H₂O) = 100°C vs Teb(H₂S) = -60°C'
            ]
          },
          {
            problem: 'Ordenar por punto de ebullición: CH₄, CH₃OH, CH₃F',
            solution: 'CH₄ < CH₃F < CH₃OH',
            difficulty: 'hard',
            steps: [
              'CH₄: solo fuerzas de London (apolar)',
              'CH₃F: dipolo-dipolo (polar, pero sin puente H)',
              'CH₃OH: puentes de hidrógeno (O-H)',
              'Orden: CH₄ (-161°C) < CH₃F (-78°C) < CH₃OH (65°C)'
            ]
          }
        ]
      }
    ],
    summary: [
      'Fuerzas de London: en todas las moléculas, dependen del tamaño',
      'Dipolo-dipolo: entre moléculas polares',
      'Puentes de hidrógeno: los más fuertes, requieren H-F, H-O o H-N',
      'Determinan propiedades físicas: Teb, Tf, solubilidad'
    ]
  },
  {
    id: 'disoluciones',
    lessonId: 'disol-1',
    title: 'Disoluciones y Concentración',
    introduction: 'Una disolución es una mezcla homogénea de dos o más sustancias. Comprender las unidades de concentración es esencial para cálculos químicos y preparación de soluciones.',
    subtopics: [
      {
        id: 'unidades-concentracion',
        title: 'Unidades de Concentración',
        theory: [
          'Molaridad (M): moles de soluto / litros de disolución',
          'Molalidad (m): moles de soluto / kg de disolvente',
          '% masa: (masa soluto / masa total) × 100',
          '% volumen: (vol soluto / vol total) × 100',
          'Fracción molar: moles componente / moles totales'
        ],
        formulas: [
          'M = n/V (mol/L)',
          'm = n/kg disolvente',
          'ppm = (masa soluto / masa total) × 10⁶'
        ],
        examples: [
          {
            problem: 'Calcular la molaridad de una solución con 58.5g de NaCl en 500mL de solución',
            solution: 'M = 2 mol/L',
            difficulty: 'easy',
            steps: [
              'MM(NaCl) = 23 + 35.5 = 58.5 g/mol',
              'moles NaCl = 58.5g / 58.5 g/mol = 1 mol',
              'V = 500 mL = 0.5 L',
              'M = 1 mol / 0.5 L = 2 M'
            ]
          },
          {
            problem: '¿Cuántos gramos de NaOH se necesitan para preparar 250mL de solución 0.5M?',
            solution: '5 gramos',
            difficulty: 'medium',
            steps: [
              'n = M × V = 0.5 mol/L × 0.25 L = 0.125 mol',
              'MM(NaOH) = 23 + 16 + 1 = 40 g/mol',
              'masa = n × MM = 0.125 × 40 = 5 g'
            ]
          }
        ]
      },
      {
        id: 'diluciones',
        title: 'Diluciones',
        theory: [
          'Al diluir, los moles de soluto permanecen constantes',
          'M₁V₁ = M₂V₂ (fórmula de dilución)',
          'Siempre se agrega soluto al disolvente, no al revés'
        ],
        examples: [
          {
            problem: '¿Qué volumen de HCl 12M se necesita para preparar 500mL de HCl 2M?',
            solution: '83.3 mL',
            difficulty: 'medium',
            steps: [
              'M₁V₁ = M₂V₂',
              '12M × V₁ = 2M × 500mL',
              'V₁ = (2 × 500) / 12 = 83.3 mL'
            ]
          }
        ]
      }
    ],
    summary: [
      'Molaridad = mol soluto / L solución',
      'M₁V₁ = M₂V₂ para diluciones',
      'Molalidad se usa para propiedades coligativas',
      'Siempre verificar unidades en los cálculos'
    ]
  },
  {
    id: 'equilibrio-quimico',
    lessonId: 'eq-1',
    title: 'Equilibrio Químico',
    introduction: 'El equilibrio químico se alcanza cuando las velocidades de reacción directa e inversa son iguales. Las concentraciones permanecen constantes pero la reacción continúa a nivel molecular.',
    subtopics: [
      {
        id: 'constante-equilibrio',
        title: 'Constante de Equilibrio',
        theory: [
          'Para aA + bB ⇌ cC + dD:',
          'Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ',
          'K grande (>10³): equilibrio favorece productos',
          'K pequeña (<10⁻³): equilibrio favorece reactivos',
          'K solo depende de la temperatura'
        ],
        formulas: [
          'Kc = [productos]ⁿ / [reactivos]ᵐ',
          'Kp = Kc(RT)^Δn (para gases)',
          'Δn = moles productos - moles reactivos (gaseosos)'
        ],
        examples: [
          {
            problem: 'Para N₂ + 3H₂ ⇌ 2NH₃, escribir la expresión de Kc',
            solution: 'Kc = [NH₃]² / ([N₂][H₂]³)',
            difficulty: 'easy',
            steps: [
              'Productos: 2NH₃ → [NH₃]²',
              'Reactivos: N₂ + 3H₂ → [N₂][H₂]³',
              'Kc = [NH₃]² / ([N₂][H₂]³)'
            ]
          },
          {
            problem: 'Si Kc = 4.0 y [A] = 0.5M, [B] = 1.0M en A + B ⇌ C, hallar [C]',
            solution: '[C] = 2.0 M',
            difficulty: 'medium',
            steps: [
              'Kc = [C] / ([A][B])',
              '4.0 = [C] / (0.5 × 1.0)',
              '[C] = 4.0 × 0.5 = 2.0 M'
            ]
          }
        ]
      },
      {
        id: 'principio-le-chatelier',
        title: 'Principio de Le Chatelier',
        theory: [
          'Si se perturba un sistema en equilibrio, este se desplaza para contrarrestar la perturbación',
          'Aumentar concentración de reactivo → equilibrio hacia productos',
          'Aumentar presión → equilibrio hacia menos moles de gas',
          'Aumentar temperatura: favorece reacción endotérmica'
        ],
        examples: [
          {
            problem: 'N₂ + 3H₂ ⇌ 2NH₃ (ΔH<0). ¿Cómo aumentar el rendimiento de NH₃?',
            solution: 'Aumentar presión, disminuir temperatura, aumentar [N₂] o [H₂]',
            difficulty: 'hard',
            steps: [
              'Aumentar P: 4 moles gas → 2 moles (favorece productos)',
              'Disminuir T: reacción exotérmica favorece productos',
              'Aumentar [reactivos]: desplaza hacia productos',
              'Eliminar NH₃: también desplaza hacia productos'
            ]
          }
        ]
      }
    ],
    summary: [
      'Kc = [productos]ⁿ/[reactivos]ᵐ en equilibrio',
      'K grande → más productos; K pequeña → más reactivos',
      'Le Chatelier: el sistema contrarresta las perturbaciones',
      'La temperatura es el único factor que cambia K'
    ]
  },
  {
    id: 'cinetica-quimica',
    lessonId: 'cinetica-1',
    title: 'Cinética Química',
    introduction: 'La cinética química estudia la velocidad de las reacciones y los factores que la afectan. Es fundamental para optimizar procesos industriales y entender mecanismos de reacción.',
    subtopics: [
      {
        id: 'velocidad-reaccion',
        title: 'Velocidad de Reacción',
        theory: [
          'Velocidad = cambio de concentración / tiempo',
          'Para A → B: v = -d[A]/dt = d[B]/dt',
          'Ley de velocidad: v = k[A]ᵐ[B]ⁿ',
          'k = constante de velocidad',
          'm, n = órdenes de reacción (se determinan experimentalmente)'
        ],
        formulas: [
          'v = k[A]ᵐ[B]ⁿ',
          'Orden total = m + n',
          'Unidades de k dependen del orden'
        ],
        examples: [
          {
            problem: 'Si v = k[A]²[B] y duplicamos [A], ¿cómo cambia v?',
            solution: 'La velocidad se cuadruplica (×4)',
            difficulty: 'medium',
            steps: [
              'v₁ = k[A]²[B]',
              'v₂ = k[2A]²[B] = k·4[A]²[B]',
              'v₂ = 4v₁',
              'La velocidad aumenta 4 veces'
            ]
          }
        ]
      },
      {
        id: 'factores-velocidad',
        title: 'Factores que Afectan la Velocidad',
        theory: [
          'Concentración: mayor [] → mayor velocidad',
          'Temperatura: ↑T → ↑k → ↑velocidad (regla: ×2 por cada 10°C)',
          'Catalizadores: disminuyen Ea sin consumirse',
          'Área superficial: más superficie → más colisiones'
        ],
        formulas: [
          'k = A·e^(-Ea/RT) (Ecuación de Arrhenius)',
          'Ea = energía de activación',
          'ln(k₂/k₁) = (Ea/R)(1/T₁ - 1/T₂)'
        ],
        examples: [
          {
            problem: 'Una reacción tiene Ea = 50 kJ/mol. Si aumentamos T de 300K a 310K, ¿cuánto cambia k?',
            solution: 'k aumenta aproximadamente 2 veces',
            difficulty: 'hard',
            steps: [
              'ln(k₂/k₁) = (Ea/R)(1/T₁ - 1/T₂)',
              '= (50000/8.314)(1/300 - 1/310)',
              '= 6014 × (0.000108) ≈ 0.65',
              'k₂/k₁ = e^0.65 ≈ 1.9 ≈ 2'
            ]
          }
        ]
      }
    ],
    summary: [
      'v = k[A]ᵐ[B]ⁿ - Ley de velocidad',
      'k depende de T según Arrhenius: k = A·e^(-Ea/RT)',
      'Catalizadores bajan Ea sin consumirse',
      'Mayor T, [] o área superficial → mayor velocidad'
    ]
  }
];

// =============================================
// PROGRAMACIÓN - CONTENIDO ADICIONAL
// =============================================

export const programacionAdicionalContent: TopicContent[] = [
  {
    id: 'intro-python',
    lessonId: 'intro-1',
    title: 'Introducción a Python',
    introduction: 'Python es un lenguaje de programación de alto nivel, interpretado y de propósito general. Es conocido por su sintaxis clara y legible, lo que lo hace ideal para principiantes y expertos por igual.',
    subtopics: [
      {
        id: 'que-es-python',
        title: '¿Qué es Python?',
        theory: [
          'Lenguaje interpretado: se ejecuta línea por línea',
          'Tipado dinámico: no hay que declarar tipos',
          'Multiparadigma: soporta programación orientada a objetos, funcional e imperativa',
          'Amplia biblioteca estándar',
          'Gran comunidad y muchas librerías de terceros'
        ],
        examples: [
          {
            problem: 'Escribir tu primer programa en Python',
            solution: 'print("¡Hola, Mundo!")',
            difficulty: 'easy',
            steps: [
              '# Mi primer programa',
              'print("¡Hola, Mundo!")',
              '',
              '# Ejecutar: python archivo.py',
              '# Salida: ¡Hola, Mundo!'
            ]
          }
        ]
      },
      {
        id: 'entorno-desarrollo',
        title: 'Entorno de Desarrollo',
        theory: [
          'IDLE: viene incluido con Python',
          'VS Code: editor popular con extensión Python',
          'PyCharm: IDE completo para Python',
          'Jupyter Notebook: ideal para ciencia de datos',
          'Google Colab: Jupyter en la nube, gratuito'
        ],
        examples: [
          {
            problem: 'Ejecutar Python en modo interactivo',
            solution: 'python en terminal',
            difficulty: 'easy',
            steps: [
              '# En terminal escribir: python',
              '>>> 2 + 2',
              '4',
              '>>> print("Hola")',
              'Hola',
              '>>> exit()  # Para salir'
            ]
          }
        ]
      }
    ],
    summary: [
      'Python es interpretado, de alto nivel y fácil de aprender',
      'print() muestra información en pantalla',
      'Se puede usar en modo interactivo o ejecutar archivos .py',
      'Excelente para principiantes y para aplicaciones profesionales'
    ]
  },
  {
    id: 'estructuras-control',
    lessonId: 'control-1',
    title: 'Estructuras de Control',
    introduction: 'Las estructuras de control permiten tomar decisiones y repetir acciones en nuestros programas. Son fundamentales para crear programas que respondan a diferentes situaciones.',
    subtopics: [
      {
        id: 'condicionales',
        title: 'Condicionales (if-elif-else)',
        theory: [
          'if evalúa una condición y ejecuta código si es True',
          'elif permite verificar condiciones adicionales',
          'else se ejecuta si ninguna condición anterior fue True',
          'La indentación (4 espacios) es OBLIGATORIA en Python'
        ],
        examples: [
          {
            problem: 'Determinar si un número es positivo, negativo o cero',
            solution: 'Usar if-elif-else',
            difficulty: 'easy',
            steps: [
              'numero = 5',
              '',
              'if numero > 0:',
              '    print("Positivo")',
              'elif numero < 0:',
              '    print("Negativo")',
              'else:',
              '    print("Cero")'
            ]
          },
          {
            problem: 'Calcular el descuento según el monto de compra',
            solution: 'Múltiples elif para rangos',
            difficulty: 'medium',
            steps: [
              'monto = 150',
              '',
              'if monto >= 200:',
              '    descuento = 0.20  # 20%',
              'elif monto >= 100:',
              '    descuento = 0.10  # 10%',
              'elif monto >= 50:',
              '    descuento = 0.05  # 5%',
              'else:',
              '    descuento = 0',
              '',
              'total = monto * (1 - descuento)',
              'print(f"Total: ${total}")'
            ]
          }
        ]
      },
      {
        id: 'bucles',
        title: 'Bucles (for y while)',
        theory: [
          'for: itera sobre una secuencia (lista, rango, string)',
          'while: repite mientras una condición sea True',
          'range(n): genera números de 0 a n-1',
          'break: sale del bucle inmediatamente',
          'continue: salta a la siguiente iteración'
        ],
        examples: [
          {
            problem: 'Imprimir números del 1 al 5 con for',
            solution: 'for i in range(1, 6):',
            difficulty: 'easy',
            steps: [
              'for i in range(1, 6):',
              '    print(i)',
              '',
              '# Salida:',
              '# 1',
              '# 2',
              '# 3',
              '# 4',
              '# 5'
            ]
          },
          {
            problem: 'Sumar números hasta que el usuario ingrese 0',
            solution: 'Usar while con break',
            difficulty: 'medium',
            steps: [
              'suma = 0',
              '',
              'while True:',
              '    num = int(input("Número (0 para terminar): "))',
              '    if num == 0:',
              '        break',
              '    suma += num',
              '',
              'print(f"Suma total: {suma}")'
            ]
          },
          {
            problem: 'Imprimir solo números pares del 1 al 10',
            solution: 'Usar continue para saltar impares',
            difficulty: 'medium',
            steps: [
              'for i in range(1, 11):',
              '    if i % 2 != 0:  # Si es impar',
              '        continue',
              '    print(i)',
              '',
              '# Salida: 2 4 6 8 10'
            ]
          }
        ]
      }
    ],
    summary: [
      'if-elif-else para tomar decisiones',
      'for para iterar sobre secuencias',
      'while para repetir mientras se cumpla una condición',
      'break sale del bucle, continue salta a la siguiente iteración',
      'La indentación define los bloques de código'
    ]
  },
  {
    id: 'colecciones-python',
    lessonId: 'col-1',
    title: 'Colecciones en Python',
    introduction: 'Python ofrece varias estructuras de datos integradas para almacenar colecciones de elementos. Cada una tiene características y usos específicos.',
    subtopics: [
      {
        id: 'listas',
        title: 'Listas',
        theory: [
          'Colección ordenada y mutable',
          'Se definen con corchetes: [1, 2, 3]',
          'Pueden contener elementos de diferentes tipos',
          'Índices desde 0; índices negativos desde el final',
          'Métodos: append(), insert(), remove(), pop(), sort()'
        ],
        examples: [
          {
            problem: 'Crear una lista y agregar/eliminar elementos',
            solution: 'Usar métodos de lista',
            difficulty: 'easy',
            steps: [
              'frutas = ["manzana", "banana"]',
              'frutas.append("naranja")  # Agregar al final',
              'print(frutas)  # ["manzana", "banana", "naranja"]',
              '',
              'frutas.insert(1, "pera")  # Insertar en posición 1',
              'print(frutas)  # ["manzana", "pera", "banana", "naranja"]',
              '',
              'frutas.remove("banana")  # Eliminar por valor',
              'print(frutas)  # ["manzana", "pera", "naranja"]'
            ]
          },
          {
            problem: 'Acceder a elementos y hacer slicing',
            solution: 'Usar índices y rangos',
            difficulty: 'medium',
            steps: [
              'nums = [0, 1, 2, 3, 4, 5]',
              'print(nums[0])    # 0 (primer elemento)',
              'print(nums[-1])   # 5 (último elemento)',
              'print(nums[2:5])  # [2, 3, 4] (del 2 al 4)',
              'print(nums[:3])   # [0, 1, 2] (primeros 3)',
              'print(nums[3:])   # [3, 4, 5] (desde el 3)',
              'print(nums[::2])  # [0, 2, 4] (cada 2)'
            ]
          }
        ]
      },
      {
        id: 'diccionarios',
        title: 'Diccionarios',
        theory: [
          'Colección de pares clave:valor',
          'Se definen con llaves: {"clave": valor}',
          'Las claves deben ser únicas e inmutables',
          'Acceso por clave, no por índice',
          'Métodos: keys(), values(), items(), get()'
        ],
        examples: [
          {
            problem: 'Crear un diccionario de estudiante',
            solution: 'Definir con {} y acceder con []',
            difficulty: 'easy',
            steps: [
              'estudiante = {',
              '    "nombre": "Ana",',
              '    "edad": 20,',
              '    "carrera": "Ingeniería"',
              '}',
              '',
              'print(estudiante["nombre"])  # Ana',
              'estudiante["edad"] = 21  # Modificar',
              'estudiante["promedio"] = 9.5  # Agregar nuevo'
            ]
          },
          {
            problem: 'Iterar sobre un diccionario',
            solution: 'Usar items() para clave y valor',
            difficulty: 'medium',
            steps: [
              'notas = {"mate": 9, "fisica": 8, "quimica": 9.5}',
              '',
              '# Iterar sobre claves',
              'for materia in notas:',
              '    print(materia)',
              '',
              '# Iterar sobre valores',
              'for nota in notas.values():',
              '    print(nota)',
              '',
              '# Iterar sobre ambos',
              'for materia, nota in notas.items():',
              '    print(f"{materia}: {nota}")'
            ]
          }
        ]
      }
    ],
    summary: [
      'Listas: ordenadas, mutables, usan []',
      'Diccionarios: pares clave:valor, usan {}',
      'Tuplas: ordenadas, inmutables, usan ()',
      'Sets: sin duplicados, no ordenados, usan {}',
      'Elegir según necesidad: orden, mutabilidad, duplicados'
    ]
  }
];

export const contentMap: Record<string, TopicContent> = {};

// Registrar contenido de Cálculo
calculoLimitesContent.forEach(content => {
  contentMap[content.lessonId] = content;
});

// Registrar contenido de Derivadas
calculoDerivdasContent.forEach(content => {
  contentMap[content.lessonId] = content;
});

// Registrar contenido de Integrales
calculoIntegralesContent.forEach(content => {
  contentMap[content.lessonId] = content;
});

// Registrar contenido de Química  
quimicaTermoquimicaContent.forEach(content => {
  contentMap[content.lessonId] = content;
});

// Registrar contenido adicional de Química
quimicaAdicionalContent.forEach(content => {
  contentMap[content.lessonId] = content;
});

// Registrar contenido de Programación
programacionContent.forEach(content => {
  contentMap[content.lessonId] = content;
});

// Registrar contenido adicional de Programación
programacionAdicionalContent.forEach(content => {
  contentMap[content.lessonId] = content;
});

// Función para obtener contenido por lessonId
export function getContentForLesson(lessonId: string): TopicContent | null {
  return contentMap[lessonId] || null;
}
