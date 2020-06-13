from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile

from pixel_app.models import Art

import json
from PIL import Image, ImageDraw
from io import BytesIO

class Command(BaseCommand):

    def handle(self, *args, **options):

        art = Art.objects.all()
        for artwork in art:
            if artwork.image:
                print(artwork)
            
            else:
                # print("*"*90)
                # print(artwork.json_str)
                pixels = json.loads(artwork.json_str)['pixels']

                img = Image.new('RGB', (500, 500))
                draw = ImageDraw.Draw(img)

                for pixel in pixels:
                    draw.rectangle(((pixel['x'], pixel['y']), (pixel['x'] + 50, pixel['y'] + 50)), fill=pixel['color'])
                
                img_io = BytesIO()
                img.save(img_io,'PNG')
                artwork.image.save(artwork.name + '.png', ContentFile(img_io.getvalue()), save=True)
                # img.show()