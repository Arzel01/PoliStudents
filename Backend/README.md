# Pathwise Backend

This is a scaffold for the Pathwise backend (Django + DRF).

Quick setup (Windows / PowerShell):

1. Create a virtualenv and activate it:

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Apply migrations and create a superuser:

```powershell
python manage.py migrate
python manage.py createsuperuser
```

3. Run the dev server:

```powershell
python manage.py runserver
```

Environment variables expected:
- `OPENAI_API_KEY` — your OpenAI API key (used by `core.services.openai_service`).

Notes and next steps:
- The `core` app contains models for StudyMaterial, StudyRoute, StudySession, CalendarEvent, Profile and SubscriptionPlan.
- `core.services.openai_service.generate_study_route` shows how to call OpenAI; it uses `gpt-5-mini` as a placeholder model.
- Google Calendar sync, payment processing (Stripe) and background tasks (Celery) are scaffolded by dependencies but need concrete configuration and credentials.
- Frontend should call the API under `/api/` for materials, routes and calendar management.
