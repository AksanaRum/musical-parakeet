from rest_framework import serializers
from bson import ObjectId

# Custom field to handle ObjectId serialization
class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)

    def to_internal_value(self, data):
        return ObjectId(data)

# User Serializer
class UserSerializer(serializers.Serializer):
    id = ObjectIdField(read_only=True)
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=30, required=False)
    last_name = serializers.CharField(max_length=30, required=False)
    date_joined = serializers.DateTimeField(read_only=True)

# Team Serializer
class TeamSerializer(serializers.Serializer):
    id = ObjectIdField(read_only=True)
    name = serializers.CharField(max_length=100)
    members = serializers.ListField(child=ObjectIdField(), required=False)
    created_at = serializers.DateTimeField(read_only=True)

# Activity Serializer
class ActivitySerializer(serializers.Serializer):
    id = ObjectIdField(read_only=True)
    user = ObjectIdField()
    type = serializers.CharField(max_length=100)
    duration = serializers.FloatField()
    calories = serializers.FloatField()
    timestamp = serializers.DateTimeField()

# Leaderboard Serializer
class LeaderboardSerializer(serializers.Serializer):
    id = ObjectIdField(read_only=True)
    user = ObjectIdField()
    score = serializers.FloatField()

# Workout Serializer
class WorkoutSerializer(serializers.Serializer):
    id = ObjectIdField(read_only=True)
    user = ObjectIdField()
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=500)
    date = serializers.DateTimeField()
