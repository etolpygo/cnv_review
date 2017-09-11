from django.db import models

class Case(models.Model):
    TestOrderID = models.CharField(max_length=20, primary_key=True)
    PatientID = models.CharField(max_length=20, blank=False)
    created = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ('created',)