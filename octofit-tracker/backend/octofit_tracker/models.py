from djongo import models
from django.contrib.auth.models import AbstractUser

from djongo import models
from django.contrib.auth.models import AbstractUser

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    members = models.ArrayReferenceField(to='User', on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

class User(AbstractUser):
    email = models.EmailField(unique=True)
    # team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True)
    # Use teams as a reverse relation from Team.members

class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    duration = models.FloatField()  # minutes
    calories = models.FloatField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    date = models.DateTimeField(auto_now_add=True)

class Leaderboard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.FloatField(default=0)
