# Generated by Django 5.1.2 on 2024-10-21 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_alter_category_name_alter_product_brand_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='featuredhome',
            name='category',
            field=models.ManyToManyField(to='store.category'),
        ),
    ]