# Generated by Django 5.0.6 on 2024-05-13 02:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kitchen_keeper', '0005_setting'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FoodItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('group', models.CharField(max_length=20)),
                ('exp_date', models.TextField()),
                ('quantity', models.FloatField()),
                ('unsplash_url', models.CharField(max_length=200)),
                ('desc', models.CharField(max_length=200)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='food_items', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]