from django.db import models

class Palette(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
    def colors(self):
        colors = self.color_set.all()
        return {'colors': [color.name for color in colors]}

class Color(models.Model):
    name = models.CharField(max_length=100, default="None")
    palette = models.ForeignKey(Palette, on_delete=models.CASCADE)

    def __str__(self):
        return self.name