from django.contrib import admin

from .models import Palette, Color, Art

admin.site.register(Palette)
admin.site.register(Color)
admin.site.register(Art)