# Generated by Django 3.2.10 on 2022-01-19 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_alter_post_dated_on'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='dated_on',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]