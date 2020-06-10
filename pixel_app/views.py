from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from .models import Color, Palette, Art

import json

def index(request):
    palettes = Palette.objects.all()
    context = {'palettes': palettes}
    for palette in palettes:
        print(palette)
        for color in palette.color_set.all():
            print(color)
    return render(request, 'pixel_app/index.html', context)

def save_palette(request):
    colors = request.POST['colors'].split(',')
    print(colors)
    palette = Palette(name=request.POST['colors'])
    palette.save()
    for color in colors:
        color = Color(name=color, palette=palette)
        color.save()

    return HttpResponseRedirect(reverse("pixel_app:index"))

def choose_palette(request, id):
    palette = Palette.objects.get(id=id)
    print(json.dumps(palette.colors()))
    return render(request, 'pixel_app/draw.html', {'pallete': palette, 'colors': palette.colors()})

def save_pic(request):
    pixels_string = request.POST['pixels-string']
    pixels_list = json.loads(pixels_string)
    pixels_dict = {'pixels': pixels_list}
    pixels = json.dumps(pixels_dict)
    art = Art(name=request.POST['name'], json_str=pixels)
    art.show()
    art.save()
    return HttpResponseRedirect(reverse("pixel_app:index"))
