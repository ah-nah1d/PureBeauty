# Generated by Django 5.1.2 on 2024-10-21 17:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_alter_featuredhome_featured_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='featuredhome',
            name='featured_category',
        ),
    ]
