# Generated by Django 4.0.6 on 2022-08-25 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0030_post_reply'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='reply',
            options={'verbose_name_plural': '13. Reply'},
        ),
        migrations.RemoveField(
            model_name='post',
            name='instructor',
        ),
        migrations.RemoveField(
            model_name='post',
            name='student',
        ),
        migrations.RemoveField(
            model_name='reply',
            name='instructor',
        ),
        migrations.RemoveField(
            model_name='reply',
            name='student',
        ),
        migrations.AddField(
            model_name='post',
            name='name',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='uniq_id',
            field=models.IntegerField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='reply',
            name='name',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='reply',
            name='uniq_id',
            field=models.IntegerField(max_length=20, null=True),
        ),
    ]
