from django.urls import path
from .views import timelogs  # <-- function-based

urlpatterns = [
    path('timelogs/', timelogs, name='timelog-list-create'),
]
