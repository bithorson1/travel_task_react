from django.shortcuts import render
from rest_framework import generics, permissions

from .authentication.token import MyTokenObtainPairSerializer
from .models import TravelRequest
from .serializers import TravelRequestSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

class TravelRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = TravelRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TravelRequest.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AdminTravelListView(generics.ListAPIView):
    queryset = TravelRequest.objects.all()
    serializer_class = TravelRequestSerializer
    permission_classes = [permissions.IsAdminUser]

class TravelRequestDetailView(generics.RetrieveUpdateAPIView):
    queryset = TravelRequest.objects.all()
    serializer_class = TravelRequestSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        if self.request.user.is_staff or self.request.user.is_superuser:
            return TravelRequest.objects.all()
        return TravelRequest.objects.filter(user=self.request.user)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer