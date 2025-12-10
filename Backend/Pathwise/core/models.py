from django.conf import settings
from django.db import models
from django.utils import timezone


class SubscriptionPlan(models.Model):
    PLAN_FREE = 'free'
    PLAN_STUDENT = 'student'
    PLAN_PERSONAL = 'personal'
    PLAN_ENTERPRISE = 'enterprise'

    PLAN_CHOICES = [
        (PLAN_FREE, 'Gratuito'),
        (PLAN_STUDENT, 'Estudiante'),
        (PLAN_PERSONAL, 'Personal'),
        (PLAN_ENTERPRISE, 'Empresa'),
    ]

    # Precios mensuales: Free=$0, Student=$5, Personal=$15, Enterprise=$150
    DEFAULT_PRICES = {
        PLAN_FREE: 0,
        PLAN_STUDENT: 5,
        PLAN_PERSONAL: 15,
        PLAN_ENTERPRISE: 150,
    }

    name = models.CharField(max_length=50, choices=PLAN_CHOICES, unique=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    monthly_quota = models.IntegerField(default=10)  # AI chatbot calls per month
    can_add_custom_subjects = models.BooleanField(default=False)  # Can add their own study material
    can_use_ai_chatbot = models.BooleanField(default=False)  # Access to AI personalization
    max_subjects = models.IntegerField(default=3)  # Max subjects in study plan
    description = models.TextField(blank=True)
    features = models.JSONField(default=list)  # List of features for display

    def __str__(self):
        return f"{self.get_name_display()} (${self.price}/mes)"
    
    @classmethod
    def get_default_features(cls, plan_name):
        """Get default features for each plan type"""
        features = {
            cls.PLAN_FREE: [
                "Acceso a materias predeterminadas",
                "Técnicas de estudio básicas",
                "Seguimiento de racha",
                "Calendario básico",
            ],
            cls.PLAN_STUDENT: [
                "Todo del plan gratuito",
                "Agregar materias personalizadas",
                "Chatbot IA para personalizar estudios",
                "50 consultas IA/mes",
                "Búsqueda en recursos académicos",
            ],
            cls.PLAN_PERSONAL: [
                "Todo del plan estudiante",
                "150 consultas IA/mes",
                "Materias ilimitadas",
                "Exportar planes de estudio",
                "Soporte prioritario",
            ],
            cls.PLAN_ENTERPRISE: [
                "Todo del plan personal",
                "Consultas IA ilimitadas",
                "Panel de administración",
                "Reportes y analíticas",
                "API access",
                "Soporte dedicado 24/7",
            ],
        }
        return features.get(plan_name, [])


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
    # Competition points
    total_points = models.IntegerField(default=0)
    weekly_points = models.IntegerField(default=0)
    avatar_emoji = models.CharField(max_length=10, default='🧑‍🎓')
    
    def update_streak(self):
        """Update streak based on current date"""
        today = timezone.now().date()
        if self.streak_last_activity:
            days_diff = (today - self.streak_last_activity).days
            if days_diff == 1:
                # Consecutive day
                self.streak_current += 1
                self.streak_longest = max(self.streak_longest, self.streak_current)
            elif days_diff > 1:
                # Streak broken
                self.streak_current = 1
        else:
            self.streak_current = 1
        
        self.streak_last_activity = today
        self.streak_days = self.streak_current
        self.save()
        return self.streak_current

    def add_points(self, points):
        """Add points for completing activities"""
        self.total_points += points
        self.weekly_points += points
        self.save()

    def __str__(self):
        return self.user.username


class Friendship(models.Model):
    """Track friend relationships and friend requests"""
    STATUS_PENDING = 'pending'
    STATUS_ACCEPTED = 'accepted'
    STATUS_REJECTED = 'rejected'
    
    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_ACCEPTED, 'Accepted'),
        (STATUS_REJECTED, 'Rejected'),
    ]
    
    from_user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='friendship_requests_sent'
    )
    to_user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='friendship_requests_received'
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('from_user', 'to_user')
    
    def __str__(self):
        return f"{self.from_user} -> {self.to_user} ({self.status})"


class LeaderboardEntry(models.Model):
    """Weekly leaderboard snapshots for rankings"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    week_start = models.DateField()
    rank_global = models.IntegerField(null=True, blank=True)
    rank_friends = models.IntegerField(null=True, blank=True)
    points = models.IntegerField(default=0)
    streak_at_time = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'week_start')
        ordering = ['-week_start', '-points']
    
    def __str__(self):
        return f"{self.user} - Week {self.week_start} (Rank: {self.rank_global})"


class Achievement(models.Model):
    """Badges and achievements for gamification"""
    CATEGORY_STREAK = 'streak'
    CATEGORY_STUDY = 'study'
    CATEGORY_QUIZ = 'quiz'
    CATEGORY_SOCIAL = 'social'
    
    CATEGORY_CHOICES = [
        (CATEGORY_STREAK, 'Racha'),
        (CATEGORY_STUDY, 'Estudio'),
        (CATEGORY_QUIZ, 'Quiz'),
        (CATEGORY_SOCIAL, 'Social'),
    ]
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50)  # e.g., 'flame', 'trophy', 'star'
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    points_reward = models.IntegerField(default=50)
    requirement_value = models.IntegerField(default=1)  # e.g., streak of 7 days
    
    def __str__(self):
        return f"{self.name} ({self.category})"


class UserAchievement(models.Model):
    """Track which achievements users have unlocked"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    unlocked_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'achievement')
    
    def __str__(self):
        return f"{self.user} unlocked {self.achievement.name}"


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
    points_earned = models.IntegerField(default=0)
    technique_used = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"Session {self.id} at {self.date}"
    
    def complete_session(self):
        """Mark session as complete and award points"""
        if not self.completed:
            self.completed = True
            # Points based on duration: ~10 points per 5 minutes
            self.points_earned = (self.duration_minutes // 5) * 10
            self.save()
            
            # Update user profile
            if self.user:
                profile = self.user.profile
                profile.update_streak()
                profile.add_points(self.points_earned)
            
            return self.points_earned
        return 0


class QuizResult(models.Model):
    """Track quiz results for competition"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='quiz_results')
    session = models.ForeignKey(StudySession, on_delete=models.CASCADE, null=True, blank=True)
    total_questions = models.IntegerField()
    correct_answers = models.IntegerField()
    score_percentage = models.FloatField()
    points_earned = models.IntegerField(default=0)
    completed_at = models.DateTimeField(auto_now_add=True)
    
    def calculate_points(self):
        """Calculate points based on quiz performance"""
        base_points = self.correct_answers * 10
        bonus = 0
        if self.score_percentage >= 90:
            bonus = 50
        elif self.score_percentage >= 70:
            bonus = 25
        self.points_earned = base_points + bonus
        self.save()
        
        # Update user profile
        if self.user:
            self.user.profile.add_points(self.points_earned)
        
        return self.points_earned

    def __str__(self):
        return f"{self.user} - {self.score_percentage}% ({self.correct_answers}/{self.total_questions})"


class CalendarEvent(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    start = models.DateTimeField()
    end = models.DateTimeField()
    google_event_id = models.CharField(max_length=255, blank=True, null=True)
    notified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} ({self.start})"
