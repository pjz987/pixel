from django.contrib import admin

from .models import Palette, Color, Art, LospecColor, LospecPalette

admin.site.register(Palette)
admin.site.register(Color)
admin.site.register(Art)
admin.site.register(LospecColor)
admin.site.register(LospecPalette)