from rest_framework import serializers
from .models import Photo
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class PhotoSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    detections = serializers.JSONField(read_only=True)

    class Meta:
        model = Photo
        fields = ['id', 'title', 'image', 'edited_image_name', 'uploaded_at', 'user', 'detections']
        read_only_fields = ['uploaded_at', 'edited_image_name', 'user', 'detections']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data
