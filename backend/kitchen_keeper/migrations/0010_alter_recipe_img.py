# Generated by Django 5.0.6 on 2024-05-11 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kitchen_keeper', '0009_alter_recipe_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='img',
            field=models.CharField(default='', max_length=2000000),
        ),
    ]