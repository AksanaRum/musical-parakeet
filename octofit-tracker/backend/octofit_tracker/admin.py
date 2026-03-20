from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout

# Register your models here (if using Django ORM, but with djongo, admin can be used for MongoDB collections)
admin.site.register(User)
admin.site.register(Team)
admin.site.register(Activity)
admin.site.register(Leaderboard)
admin.site.register(Workout)
