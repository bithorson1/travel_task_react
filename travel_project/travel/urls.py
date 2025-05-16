from django.urls import path
from .views import RegisterView, TravelRequestListCreateView, AdminTravelListView, TravelRequestDetailView, \
    MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView




urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('requests/', TravelRequestListCreateView.as_view()),
    path('api/admin/requests/', AdminTravelListView.as_view()),
    path('api/admin/requests/<int:pk>/', TravelRequestDetailView.as_view()),
]
