from django.urls import path

from . import views

app_name = 'pixel_app'

urlpatterns = [
    path('', views.index, name='index'),
    path('save-palette/', views.save_palette, name="save_palette"),
    path('choose-palette/<int:id>/', views.choose_palette, name="choose_palette"),
    path('save-pic/', views.save_pic, name="save_pic"),
]