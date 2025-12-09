from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, login
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import StudyMaterial, StudyRoute, CalendarEvent, SubscriptionPlan, Profile, StudySession
from .serializers import (
    StudyMaterialSerializer,
    StudyRouteSerializer,
    CalendarEventSerializer,
    SubscriptionPlanSerializer,
    ProfileSerializer,
    RegisterSerializer,
    UserSerializer,
)
from .services.openai_service import generate_study_route

User = get_user_model()


# ============== DEMO MODE - No Authentication Required ==============
# For production, change AllowAny to IsAuthenticated

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubscriptionPlanViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [AllowAny]


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.select_related('user', 'plan').all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]  # DEMO MODE

    def get_queryset(self):
        # Return all profiles for demo
        return Profile.objects.all()


@method_decorator(csrf_exempt, name='dispatch')
class StudyMaterialViewSet(viewsets.ModelViewSet):
    serializer_class = StudyMaterialSerializer
    permission_classes = [AllowAny]  # DEMO MODE
    authentication_classes = []

    def get_queryset(self):
        return StudyMaterial.objects.all()

    def perform_create(self, serializer):
        # For demo, use first user or create a demo user
        demo_user, _ = User.objects.get_or_create(
            username='demo_user',
            defaults={'email': 'demo@pathwise.com'}
        )
        serializer.save(owner=demo_user)

    @action(detail=True, methods=['post'])
    def generate_route(self, request, pk=None):
        material = self.get_object()
        technique = request.data.get('technique', 'concept_map')
        session_config = request.data.get('session_config', {})
        
        text = material.extracted_text or material.description or material.title
        
        # Generate AI study route
        ai_result = generate_study_route(material.title, text, technique, session_config)
        
        demo_user, _ = User.objects.get_or_create(
            username='demo_user',
            defaults={'email': 'demo@pathwise.com'}
        )
        
        route = StudyRoute.objects.create(
            owner=demo_user,
            title=f"Plan de Estudio: {material.title}",
            content=ai_result,
            technique=technique
        )
        serializer = StudyRouteSerializer(route)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@method_decorator(csrf_exempt, name='dispatch')
class StudyRouteViewSet(viewsets.ModelViewSet):
    serializer_class = StudyRouteSerializer
    permission_classes = [AllowAny]  # DEMO MODE
    authentication_classes = []

    def get_queryset(self):
        return StudyRoute.objects.all()


@method_decorator(csrf_exempt, name='dispatch')
class CalendarEventViewSet(viewsets.ModelViewSet):
    serializer_class = CalendarEventSerializer
    permission_classes = [AllowAny]  # DEMO MODE
    authentication_classes = []

    def get_queryset(self):
        return CalendarEvent.objects.all()

    def perform_create(self, serializer):
        demo_user, _ = User.objects.get_or_create(
            username='demo_user',
            defaults={'email': 'demo@pathwise.com'}
        )
        serializer.save(owner=demo_user)


# Streak API endpoint
@method_decorator(csrf_exempt, name='dispatch')
class StreakView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        """Get current streak info"""
        demo_user, _ = User.objects.get_or_create(
            username='demo_user',
            defaults={'email': 'demo@pathwise.com'}
        )
        profile, _ = Profile.objects.get_or_create(user=demo_user)
        
        return Response({
            'current_streak': profile.streak_current,
            'longest_streak': profile.streak_longest,
            'total_sessions': StudySession.objects.filter(user=demo_user).count(),
        })

    def post(self, request):
        """Complete a quiz/session to increase streak"""
        from django.utils import timezone
        from datetime import timedelta
        
        demo_user, _ = User.objects.get_or_create(
            username='demo_user',
            defaults={'email': 'demo@pathwise.com'}
        )
        profile, _ = Profile.objects.get_or_create(user=demo_user)
        
        today = timezone.now().date()
        yesterday = today - timedelta(days=1)
        
        # Check if already completed today
        if profile.streak_last_activity == today:
            return Response({
                'message': 'Ya completaste tu actividad de hoy!',
                'current_streak': profile.streak_current,
                'longest_streak': profile.streak_longest,
                'increased': False
            })
        
        # Update streak
        if profile.streak_last_activity == yesterday:
            profile.streak_current += 1
        else:
            profile.streak_current = 1
        
        if profile.streak_current > profile.streak_longest:
            profile.streak_longest = profile.streak_current
        
        profile.streak_last_activity = today
        profile.save()
        
        # Create study session record
        StudySession.objects.create(
            user=demo_user,
            duration_minutes=30,
            completed=True
        )
        
        return Response({
            'message': '¡Racha aumentada!',
            'current_streak': profile.streak_current,
            'longest_streak': profile.streak_longest,
            'increased': True
        })
