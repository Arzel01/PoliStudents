from django.conf import settings
from django.db import models


class SubscriptionPlan(models.Model):
    PLAN_FREE = 'free'
    PLAN_STUDENT = 'student'
    PLAN_PERSONAL = 'personal'
    PLAN_ENTERPRISE = 'enterprise'

    PLAN_CHOICES = [
        (PLAN_FREE, 'Free'),
        (PLAN_STUDENT, 'Student'),
        (PLAN_PERSONAL, 'Personal'),
        (PLAN_ENTERPRISE, 'Enterprise'),
    ]

    name = models.CharField(max_length=50, choices=PLAN_CHOICES, unique=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    monthly_quota = models.IntegerField(default=10)  # example: AI calls per month

    def __str__(self):
        return f"{self.get_name_display()} (${self.price})"


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True)
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.SET_NULL, null=True, blank=True)
    streak_days = models.IntegerField(default=0)
    last_study_date = models.DateField(null=True, blank=True)
    # Enhanced streak tracking
    streak_current = models.IntegerField(default=0)
    streak_longest = models.IntegerField(default=0)
    streak_last_activity = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.username


class StudyMaterial(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='materials/', null=True, blank=True)
    extracted_text = models.TextField(blank=True)  # text extracted from upload/scan

    def __str__(self):
        return f"{self.title} ({self.owner})"


class StudyRoute(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.JSONField(default=dict)  # structure with lessons, sessions, etc.
    technique = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"Route: {self.title} by {self.owner}"


class StudySession(models.Model):
    route = models.ForeignKey(StudyRoute, on_delete=models.CASCADE, related_name='sessions', null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    duration_minutes = models.IntegerField(default=25)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"Session {self.id} at {self.date}"


class CalendarEvent(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    start = models.DateTimeField()
    end = models.DateTimeField()
    google_event_id = models.CharField(max_length=255, blank=True, null=True)
    notified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} ({self.start})"
