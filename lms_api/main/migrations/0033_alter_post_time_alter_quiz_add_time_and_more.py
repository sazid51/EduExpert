# Generated by Django 4.0.6 on 2022-08-25 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0032_alter_quiz_add_time_alter_quizqustions_add_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='time',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='add_time',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='quizqustions',
            name='add_time',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='reply',
            name='time',
            field=models.DateField(auto_now_add=True),
        ),
    ]
