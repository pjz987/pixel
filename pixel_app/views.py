from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.urls import reverse

from .models import Color, Palette

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
    return HttpResponse(palette)