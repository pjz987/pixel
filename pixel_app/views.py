from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile

from .models import Color, Palette, Art

from io import StringIO, BytesIO
import json
from PIL import Image, ImageDraw

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
    # output = BytesIO.BytesIO
    palette = Palette.objects.get(id=id)
    print(json.dumps(palette.colors()))
    return render(request, 'pixel_app/draw.html', {'pallete': palette, 'colors': palette.colors()})

def save_pic(request):
    pixels_string = request.POST['pixels-string']
    pixels_list = json.loads(pixels_string)
    increment = int(request.POST['increment'])

    img = Image.new('RGB', (500, 500))
    draw = ImageDraw.Draw(img)

    for pixel in pixels_list:
        draw.rectangle(((pixel['x'], pixel['y']), (pixel['x'] + increment, pixel['y'] + increment)), fill=pixel['color'])

    pixels_dict = {'pixels': pixels_list}
    pixels = json.dumps(pixels_dict)
    img.save('media/art/' + request.POST['name'] + '.png')
    print('*'*40)
    print(img.info)

    """BytesIO and InMemoryUploadedFile"""
    # temp_img = img
    # temp_img_io = BytesIO()
    # temp_img.save(temp_img_io, format='PNG')
    # image_file = InMemoryUploadedFile(temp_img_io, None, request.POST['name'] + '.png', 'image/png', temp_img_io.length, None)

    art = Art(name=request.POST['name'], json_str=pixels)
    art.save()

    """BytesIO and ContentFile"""
    img_io = BytesIO()
    img.save(img_io, 'PNG')
    art.image.save(art.name + '.png', ContentFile(img_io.getvalue()), save=True)

    return HttpResponseRedirect(reverse("pixel_app:index"))

def gallery(request):
    gallery = Art.objects.all()
    return render(request, 'pixel_app/gallery.html', {'gallery': gallery})