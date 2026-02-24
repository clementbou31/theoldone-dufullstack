from rest_framework import serializers
from .models import CustomUsers
from django.contrib.auth.hashers import make_password, check_password

class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validate_data):
        validate_data['password'] = make_password(validate_data['password'])
        return super().create(validate_data)
