# Generated by Django 3.0.6 on 2020-06-10 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pixel_app', '0004_art_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='art',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='art/'),
        ),
    ]
