# Generated by Django 5.1.2 on 2024-10-21 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_alter_featuredhome_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='featuredhome',
            old_name='category',
            new_name='featured_category',
        ),
        migrations.RemoveField(
            model_name='featuredhome',
            name='is_active',
        ),
        migrations.AddField(
            model_name='category',
            name='is_featured',
            field=models.BooleanField(default=False),
        ),
    ]