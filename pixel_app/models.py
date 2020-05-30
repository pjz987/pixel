from django.db import models

class Palette(models.Model):
    name = models.CharField(max_length=100)

class Color(models.Model):
    palette = models.ForeignKey(Palette, on_delete=models.CASCADE)