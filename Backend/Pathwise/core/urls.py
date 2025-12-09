from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'plans', views.SubscriptionPlanViewSet, basename='plans')
router.register(r'profiles', views.ProfileViewSet, basename='profiles')
router.register(r'materials', views.StudyMaterialViewSet, basename='materials')
router.register(r'routes', views.StudyRouteViewSet, basename='routes')
router.register(r'calendar', views.CalendarEventViewSet, basename='calendar')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('streak/', views.StreakView.as_view(), name='streak'),
]
