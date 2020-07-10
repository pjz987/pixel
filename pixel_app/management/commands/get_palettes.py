from django.core.management.base import BaseCommand
from pixel_app.models import LospecPalette, LospecColor
import requests
import json

class Command(BaseCommand):

    def handle(self, *args, **options):

        page = 0
        while True:
            url = f'https://lospec.com/palette-list/load?colorNumberFilterType=any&colorNumber=8&page={page}&tag=&sortingType=default'
            
            response = requests.get(url)
            data = json.loads(response.text)
            palettes = data['palettes']

            if not palettes:
                break

            for palette in palettes:
                if 'user' in palette:
                    creator = palette['user']['name']
                else:
                    creator = ''
                lospec_palette, created = LospecPalette.objects.get_or_create(
                    _id=palette['_id'],
                    creator=creator,
                    title=palette['title'],
                    description=palette['description'],
                )
                lospec_palette.save()

                if created:
                    for color in palette['colors']:
                        lospec_color = LospecColor(
                            color=color,
                            palette = lospec_palette
                        )
                        lospec_color.save()

            page += 1
