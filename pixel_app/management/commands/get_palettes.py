from django.core.management.base import BaseCommand

import requests
import json

class Command(BaseCommand):

    def handle(self, *args, **options):

        url = 'https://lospec.com/palette-list/load?colorNumberFilterType=any&colorNumber=8&page=1&tag=&sortingType=default'
        
        response = requests.get(url)
        data = json.loads(response.text)
        palettes = data['palettes']