from django.db import models

class TimeLog(models.Model):
    website = models.CharField(max_length=255)
    duration = models.FloatField()  # in minutes
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.website} - {self.duration} min"
