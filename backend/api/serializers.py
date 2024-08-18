# something that takes in a python obj and convert into json 
# data that can be used in communication with other applications
# json <-> python
#user model is built into django and represents a user model

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}   #we only want to accept password when we create a new user, not return it when we return a user

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) #** to split up the key:values in dict
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

    