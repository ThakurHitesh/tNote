from rest_framework import serializers
from api.models import User
from api.constants import CONST_USER_NAME_LENGTH, CONST_PASSWORD_LENGTH

class UserWriteSerializer(serializers.ModelSerializer):
    """
    write serializer for user model
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        if validated_data.get('username'):
            instance.username = validated_data['username']
        if validated_data.get('first_name'):
            instance.first_name = validated_data['first_name']
        if validated_data.get('last_name'):
            instance.last_name = validated_data['last_name']
        if validated_data.get('email'):
            instance.email = validated_data['email']
        if validated_data.get('password'):
            user = self.model.objects.filter(id=instance.id)[0]
            user[0].set_password(validated_data["password"])
            user[0].save()
        instance.save()
        return instance

class UserReadSerializer(serializers.ModelSerializer):
    """
    read serializer for user model
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_active', 'created_at', 'deleted_at', 'modified_at', 'is_deleted']

class UserLoginSerializer(serializers.Serializer):
    """
    login serializer for user model
    """
    username = serializers.CharField(max_length=CONST_USER_NAME_LENGTH)
    password = serializers.CharField(max_length=CONST_PASSWORD_LENGTH)