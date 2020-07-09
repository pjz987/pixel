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

    increment = 5 
    print('*'*40)
    print(increment)

    img = Image.new('RGB', (500, 500))
    draw = ImageDraw.Draw(img)

    for pixel in pixels_list:
        draw.rectangle(((pixel['x'], pixel['y']), (pixel['x'] + increment, pixel['y'] + increment)), fill=pixel['color'].strip())

    pixels_dict = {'pixels': pixels_list}
    pixels = json.dumps(pixels_dict)

    print(img.size)
    # img.save('media/art/' + request.POST['name'] + '.png')
    # print('*'*40)
    # print(img.info)

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

def edit(request, pk):
    art = Art.objects.get(pk=pk)
    print('Art')
    print(art.name)
    pixels_str = art.json_str
    print('JSON')
    print(pixels_str)
    pixels_dict = json.loads(pixels_str)
    colors_list = []
    for pixel in pixels_dict['pixels']:
        colors_list.append(pixel['color'])
    color_set = set(colors_list)
    print(color_set)
    color_dict = {'colors': list(color_set)}
    print(color_dict)
    colors = json.dumps({'colors':list(set(colors_list))})
    print(colors)
    return render(request, 'pixel_app/draw2.html', {'pixels_str': pixels_dict, 'colors': color_dict, 'get_palettes': {'url': reverse('pixel_app:get_palettes')}})

"""
Views for draw2
"""

def get_palettes(request):
    palettes = []
    for palette in Palette.objects.all():
        colors = [{'name': color.name, 'pk': color.pk} for color in palette.color_set.all()]
        palettes.append({
            'pk': palette.pk,
            'name': palette.name,
            'colors': colors,
        })
    return JsonResponse({'palettes': palettes})

def draw(request):
    context = {'get_palettes': {'url': reverse('pixel_app:get_palettes')}}
    return render(request, 'pixel_app/draw2.html', context)