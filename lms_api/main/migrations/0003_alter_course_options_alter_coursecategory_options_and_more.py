# Generated by Django 4.0.6 on 2022-07-22 15:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_coursecategory_student_alter_teacher_options_course'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='course',
            options={'verbose_name_plural': '3. Courses'},
        ),
        migrations.AlterModelOptions(
            name='coursecategory',
            options={'verbose_name_plural': '2. Course Categories'},
        ),
        migrations.AlterModelOptions(
            name='student',
            options={'verbose_name_plural': '4. Students'},
        ),
        migrations.AlterModelOptions(
            name='teacher',
            options={'verbose_name_plural': '1. Teachers'},
        ),
    ]