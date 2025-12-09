import os
import openai
from datetime import datetime, timedelta
import json

# Simple wrapper for OpenAI calls. Expects OPENAI_API_KEY in env.


def generate_demo_study_route(title: str, technique: str, session_config: dict) -> dict:
    """
    Generate a demo study route without API call.
    Returns a structured study plan based on technique and session configuration.
    """
    session_type = session_config.get('type', 'specific_period')
    
    # Calculate sessions based on config
    if session_type == 'specific_period':
        start_date = session_config.get('start_date', datetime.now().strftime('%Y-%m-%d'))
        end_date = session_config.get('end_date', (datetime.now() + timedelta(days=14)).strftime('%Y-%m-%d'))
        session_duration = session_config.get('duration', 45)
        sessions_per_day = session_config.get('sessions_per_day', 1)
    else:  # custom_sessions
        total_sessions = session_config.get('total_sessions', 10)
        session_duration = session_config.get('duration', 45)
        start_date = datetime.now().strftime('%Y-%m-%d')
    
    # Generate lessons based on technique
    technique_configs = {
        'pomodoro': {
            'name': 'Técnica Pomodoro',
            'description': 'Sesiones de 25 minutos con descansos de 5 minutos',
            'session_duration': 25,
            'break_duration': 5,
        },
        'spaced_repetition': {
            'name': 'Repetición Espaciada',
            'description': 'Revisión en intervalos crecientes para mejor retención',
            'intervals': [1, 3, 7, 14, 30],  # days
        },
        'active_recall': {
            'name': 'Recuerdo Activo',
            'description': 'Práctica de recuperación con preguntas y cuestionarios',
        },
        'concept_map': {
            'name': 'Mapas Conceptuales',
            'description': 'Organización visual de conceptos y relaciones',
        },
        'feynman': {
            'name': 'Técnica Feynman',
            'description': 'Explica el concepto como si enseñaras a un niño',
        },
    }
    
    technique_info = technique_configs.get(technique, technique_configs['concept_map'])
    
    # Generate structured lessons
    lessons = [
        {
            'id': 1,
            'title': f'Introducción a {title}',
            'summary': 'Revisión general del tema y objetivos de aprendizaje',
            'duration': session_duration,
            'activities': [
                'Lectura inicial del material',
                'Identificar conceptos clave',
                'Crear preguntas de estudio'
            ],
            'quiz': [
                {'question': '¿Cuáles son los conceptos principales del tema?', 'type': 'open'},
                {'question': '¿Por qué es importante este tema?', 'type': 'open'},
            ]
        },
        {
            'id': 2,
            'title': 'Conceptos Fundamentales',
            'summary': 'Profundización en los conceptos básicos',
            'duration': session_duration,
            'activities': [
                'Estudio detallado de definiciones',
                'Crear resúmenes propios',
                'Relacionar con conocimientos previos'
            ],
            'quiz': [
                {'question': 'Define los conceptos clave en tus propias palabras', 'type': 'open'},
                {'question': '¿Cómo se relacionan los conceptos entre sí?', 'type': 'open'},
            ]
        },
        {
            'id': 3,
            'title': 'Aplicación Práctica',
            'summary': 'Ejercicios y ejemplos prácticos',
            'duration': session_duration,
            'activities': [
                'Resolver ejercicios de práctica',
                'Analizar casos de estudio',
                'Crear ejemplos propios'
            ],
            'quiz': [
                {'question': '¿Cómo aplicarías estos conceptos?', 'type': 'open'},
                {'question': 'Describe un ejemplo práctico', 'type': 'open'},
            ]
        },
        {
            'id': 4,
            'title': 'Análisis Profundo',
            'summary': 'Conexiones avanzadas y pensamiento crítico',
            'duration': session_duration,
            'activities': [
                'Analizar relaciones complejas',
                'Comparar diferentes perspectivas',
                'Identificar patrones'
            ],
            'quiz': [
                {'question': '¿Cuáles son las limitaciones de estos conceptos?', 'type': 'open'},
                {'question': '¿Qué preguntas quedan sin responder?', 'type': 'open'},
            ]
        },
        {
            'id': 5,
            'title': 'Revisión y Consolidación',
            'summary': 'Repaso final y preparación para evaluación',
            'duration': session_duration,
            'activities': [
                'Revisar todos los conceptos',
                'Practicar con preguntas de repaso',
                'Identificar áreas de mejora'
            ],
            'quiz': [
                {'question': 'Resume todo el tema en un párrafo', 'type': 'open'},
                {'question': '¿Qué aprendiste que no sabías antes?', 'type': 'open'},
            ]
        },
    ]
    
    # Generate scheduled sessions
    sessions = []
    start = datetime.strptime(start_date, '%Y-%m-%d') if isinstance(start_date, str) else start_date
    
    for i, lesson in enumerate(lessons):
        session_date = start + timedelta(days=i * 2)  # Every 2 days
        sessions.append({
            'id': i + 1,
            'lesson_id': lesson['id'],
            'title': lesson['title'],
            'date': session_date.strftime('%Y-%m-%d'),
            'time': '10:00',
            'duration': lesson['duration'],
            'completed': False,
        })
    
    return {
        'title': f'Plan de Estudio: {title}',
        'technique': technique,
        'technique_info': technique_info,
        'total_duration': sum(l['duration'] for l in lessons),
        'estimated_days': len(lessons) * 2,
        'lessons': lessons,
        'sessions': sessions,
        'progress': {
            'completed_sessions': 0,
            'total_sessions': len(sessions),
            'percentage': 0
        }
    }


def generate_study_route(title: str, text: str, technique: str = 'concept_map', session_config: dict = None) -> dict:
    """
    Calls OpenAI to analyze `text` (uploaded material) and generate a study route.
    Returns a dict with lessons and sessions.
    For demo mode, returns a pre-built study plan.
    """
    session_config = session_config or {}
    api_key = os.environ.get('OPENAI_API_KEY')
    
    if not api_key:
        # DEMO MODE: Return a well-structured demo study route
        return generate_demo_study_route(title, technique, session_config)

    openai.api_key = api_key
    
    session_info = ""
    if session_config:
        if session_config.get('type') == 'specific_period':
            session_info = f"""
            Configuración de sesiones:
            - Período: {session_config.get('start_date')} a {session_config.get('end_date')}
            - Duración por sesión: {session_config.get('duration', 45)} minutos
            - Sesiones por día: {session_config.get('sessions_per_day', 1)}
            """
        else:
            session_info = f"""
            Configuración de sesiones:
            - Total de sesiones: {session_config.get('total_sessions', 10)}
            - Duración por sesión: {session_config.get('duration', 45)} minutos
            """
    
    prompt = f"""Eres un asistente que convierte material de estudio en un plan de estudio estructurado.

Título: {title}
Técnica preferida: {technique}
{session_info}

Material:
{text[:15000]}

Genera un JSON con esta estructura exacta:
{{
    "title": "Plan de Estudio: [título]",
    "technique": "{technique}",
    "technique_info": {{
        "name": "Nombre de la técnica",
        "description": "Descripción breve"
    }},
    "lessons": [
        {{
            "id": 1,
            "title": "Título de la lección",
            "summary": "Resumen",
            "duration": 45,
            "activities": ["actividad1", "actividad2"],
            "quiz": [
                {{"question": "pregunta", "type": "open"}}
            ]
        }}
    ],
    "sessions": [
        {{
            "id": 1,
            "lesson_id": 1,
            "title": "Título",
            "date": "YYYY-MM-DD",
            "time": "HH:MM",
            "duration": 45,
            "completed": false
        }}
    ]
}}

Asegúrate de que el JSON sea válido y parseable."""

    try:
        resp = openai.ChatCompletion.create(
            model='gpt-4',
            messages=[{'role': 'user', 'content': prompt}],
            max_tokens=2000,
            temperature=0.3,
        )
        content = resp['choices'][0]['message']['content']
        
        # Try to parse JSON
        start = content.find('{')
        end = content.rfind('}')
        if start != -1 and end != -1:
            json_text = content[start:end + 1]
            return json.loads(json_text)
        else:
            return generate_demo_study_route(title, technique, session_config)
    except Exception as e:
        # Fallback to demo mode on error
        return generate_demo_study_route(title, technique, session_config)
