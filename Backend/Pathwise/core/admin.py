from django.contrib import admin
from .models import SubscriptionPlan, Profile, StudyMaterial, StudyRoute, StudySession, CalendarEvent


@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'monthly_quota')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'plan', 'streak_days')


@admin.register(StudyMaterial)
class StudyMaterialAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'uploaded_at')


@admin.register(StudyRoute)
class StudyRouteAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'created_at')


@admin.register(StudySession)
class StudySessionAdmin(admin.ModelAdmin):
    list_display = ('route', 'date', 'duration_minutes', 'completed')


@admin.register(CalendarEvent)
class CalendarEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'start', 'end', 'notified')
