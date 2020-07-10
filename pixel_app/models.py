from django.db import models

from PIL import Image, ImageDraw
import json

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


class Art(models.Model):
    name = models.CharField(max_length=200, default="Untitled")
    json_str = models.TextField()
    image = models.ImageField(upload_to='art/', null=True, blank=True)

    def __str__(self):
        return self.name

    def show(self):
        pixels = json.loads(self.json_str)['pixels']
        w = 500
        h = 500
        img = Image.new('RGB', (w, h))
        draw = ImageDraw.Draw(img)

        for pixel in pixels:
            draw.rectangle(((pixel['x'], pixel['y']), (pixel['x'] + 50, pixel['y'] + 50)), fill=pixel['color'])
        
        img.show()
        print(img)
        return img
        # self.image = img
        # self.save()
        # img.save(f'../media/pics/{self.name}.png')
    
    def show_image(self):
        print(self.image.url)
        return self.image.url

class LospecPalette(models.Model):
    _id = models.CharField(max_length=24)
    creator = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    description = models.TextField()

class LospecColor(models.Model):
    color = models.CharField(max_length=7)
    palette = models.ForeignKey(LospecPalette, on_delete=models.PROTECT, related_name='colors')