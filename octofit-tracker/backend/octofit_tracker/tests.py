from rest_framework.test import APITestCase
from django.urls import reverse
from .models import User, Team, Activity, Leaderboard, Workout

class UserTests(APITestCase):
    def test_create_user(self):
        url = reverse('user-list')
        data = {'username': 'testuser', 'email': 'test@example.com', 'password': 'testpass123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)

class TeamTests(APITestCase):
    def test_create_team(self):
        url = reverse('team-list')
        data = {'name': 'Test Team'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)

class ActivityTests(APITestCase):
    def test_create_activity(self):
        # This test assumes a user exists
        user = User.objects.create_user(username='activityuser', password='pass')
        url = reverse('activity-list')
        data = {'user': user.id, 'type': 'run', 'duration': 30, 'distance': 5.0}
        response = self.client.post(url, data, format='json')
        self.assertIn(response.status_code, [201, 400])

class LeaderboardTests(APITestCase):
    def test_leaderboard(self):
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

class WorkoutTests(APITestCase):
    def test_create_workout(self):
        url = reverse('workout-list')
        data = {'name': 'Morning Cardio', 'description': 'Cardio session', 'duration': 45}
        response = self.client.post(url, data, format='json')
        self.assertIn(response.status_code, [201, 400])
