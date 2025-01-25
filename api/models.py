from django.db import models

# Create your models here.
class Players(models,models):
    title= models.CharField(max_length=255)
    description= models.TextField(max_length=1080)
    image=models.CharField(max_length=255)