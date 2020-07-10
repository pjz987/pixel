from django.urls import path

from . import views

app_name = 'pixel_app'

urlpatterns = [
    path('', views.index, name='index'),
    path('save-palette/', views.save_palette, name='save_palette'),
    path('choose-palette/<int:id>/', views.choose_palette, name='choose_palette'),
    path('save-pic/', views.save_pic, name='save_pic'),
    path('gallery/', views.gallery, name='gallery'),
    path('edit/<int:pk>/', views.edit, name='edit'),
    path('get-palettes/', views.get_palettes, name='get_palettes'),
    path('draw/', views.draw, name='draw'),
    path('lospec-palettes/', views.lospec_palettes, name='lospec_palettes'),
    path('save-lospec-palette/<int:pk>/', views.save_lospec_palette, name='save_lospec_palette'),
]