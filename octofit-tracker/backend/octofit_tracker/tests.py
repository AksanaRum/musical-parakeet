from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class BasicModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')

    def test_create_user(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(name='Test User', email='test@example.com', team=team)
        self.assertEqual(str(user), 'test@example.com')

    def test_create_activity(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(name='Test User', email='test@example.com', team=team)
        activity = Activity.objects.create(user=user, type='run', duration=30, date='2023-01-01')
        self.assertEqual(activity.type, 'run')

    def test_create_workout(self):
        team = Team.objects.create(name='Test Team')
        workout = Workout.objects.create(name='Pushups', description='Do 20 pushups')
        workout.suggested_for.add(team)
        self.assertEqual(workout.name, 'Pushups')

    def test_create_leaderboard(self):
        team = Team.objects.create(name='Test Team')
        leaderboard = Leaderboard.objects.create(team=team, points=100)
        self.assertEqual(leaderboard.points, 100)
