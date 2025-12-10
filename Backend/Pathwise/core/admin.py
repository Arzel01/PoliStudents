from django.contrib import admin
from .models import (
    SubscriptionPlan, Profile, StudyMaterial, StudyRoute, StudySession, 
    CalendarEvent, Friendship, LeaderboardEntry, Achievement, 
    UserAchievement, QuizResult
)


@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'monthly_quota')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'plan', 'streak_current', 'streak_longest', 'total_points', 'avatar_emoji')
    list_filter = ('plan',)
    search_fields = ('user__username', 'user__email')


@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    list_display = ('from_user', 'to_user', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('from_user__username', 'to_user__username')


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ('user', 'week_start', 'rank_global', 'rank_friends', 'points', 'streak_at_time')
    list_filter = ('week_start',)
    ordering = ['-week_start', 'rank_global']


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'points_reward', 'requirement_value')
    list_filter = ('category',)


@admin.register(UserAchievement)
class UserAchievementAdmin(admin.ModelAdmin):
    list_display = ('user', 'achievement', 'unlocked_at')
    list_filter = ('achievement',)
    search_fields = ('user__username',)


@admin.register(QuizResult)
class QuizResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_questions', 'correct_answers', 'score_percentage', 'points_earned', 'completed_at')
    list_filter = ('completed_at',)
    search_fields = ('user__username',)


@admin.register(StudyMaterial)
class StudyMaterialAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'uploaded_at')


@admin.register(StudyRoute)
class StudyRouteAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'created_at')


@admin.register(StudySession)
class StudySessionAdmin(admin.ModelAdmin):
    list_display = ('route', 'user', 'date', 'duration_minutes', 'completed', 'points_earned')
    list_filter = ('completed', 'technique_used')


@admin.register(CalendarEvent)
class CalendarEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'start', 'end', 'notified')
