# Generated by Django 3.0.6 on 2020-06-01 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pixel_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='color',
            name='name',
            field=models.CharField(default='None', max_length=100),
        ),
    ]
