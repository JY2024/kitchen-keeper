# Generated by Django 5.0.6 on 2024-05-11 13:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kitchen_keeper', '0006_recipe_unsplash_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='unsplash_url',
        ),
    ]