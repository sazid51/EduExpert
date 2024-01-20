from django.contrib import admin
from . import models

admin.site.register(models.Instructor)
admin.site.register(models.Course)
admin.site.register(models.Chapter)
admin.site.register(models.Student)
admin.site.register(models.StudentCourseEnrollment)
admin.site.register(models.CourseRating)
admin.site.register(models.FavouriteCourse)
admin.site.register(models.Quiz)
admin.site.register(models.QuizQustions)
admin.site.register(models.CourseQuiz)
admin.site.register(models.AttemptQuiz)
admin.site.register(models.Post)
admin.site.register(models.Reply)
admin.site.register(models.Contact)