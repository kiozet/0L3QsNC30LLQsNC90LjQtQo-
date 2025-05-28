from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from . import serializers
from .models import Photo
from .serializers import PhotoSerializer, UserSerializer, CustomTokenObtainPairSerializer
from django.contrib.auth import get_user_model
import os
from datetime import datetime
from .services import ImageProcessor

User = get_user_model()


class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Photo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        image_file = self.request.FILES.get('image')
        if not image_file:
            raise serializers.ValidationError({"image": "No image provided"})

        original_name, ext = os.path.splitext(image_file.name)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        edited_image_name = f"{original_name}_edited_{timestamp}{ext}"

        # Сначала сохраняем фото
        photo = serializer.save(
            user=self.request.user,
            edited_image_name=edited_image_name
        )

        # Затем обрабатываем через YOLOv5
        try:
            processor = ImageProcessor()
            detections = processor.get_bounding_box_corners(photo.image.path)

            # Обновляем запись с результатами детекции
            photo.detections = detections
            photo.save()
        except Exception as e:
            print(f"Image processing failed: {str(e)}")
            # Можно добавить логирование ошибки


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=serializer.validated_data['username'],
                email=serializer.validated_data.get('email', ''),
                password=serializer.validated_data['password']
            )
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
