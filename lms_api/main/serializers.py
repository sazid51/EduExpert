from dataclasses import fields
from urllib import request
from rest_framework import serializers
from . import models
from django.contrib.flatpages.models import FlatPage

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Instructor
        fields = ['id', 'first_name', 'last_name','profile_img', 'email','password','qualification','skills']

class InstructorDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Instructor
        fields = ['total_instructor_course', 'total_instructor_student']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Course
        fields = ['id', 'category',  'instructor','title', 'description', 'price', 'duration', 'featured_img','course_chapters','related_course','total_enrolled_students', 'course_rating']

    def __init__(self, *args, **kwargs):
        super(CourseSerializer,self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth=1

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Chapter
        fields = ['id',  'course','title', 'description', 'video', 'remarks']

    def __init__(self, *args, **kwargs):
        super(ChapterSerializer,self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth=1

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Student
        fields = ['id', 'first_name', 'last_name','profile_img', 'email','password','interested_category']

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.StudentCourseEnrollment
        fields = ['id', 'course', 'student','enrollled_time']

    def __init__(self, *args, **kwargs):
            super(StudentCourseEnrollSerializer,self).__init__(*args, **kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method =='GET':
                self.Meta.depth=2

class FavouriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.FavouriteCourse
        fields = ['id', 'course', 'student','status']

    def __init__(self, *args, **kwargs):
            super(FavouriteCourseSerializer,self).__init__(*args, **kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method =='GET':
                self.Meta.depth=2

class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.CourseRating
        fields = ['id', 'course', 'student', 'rating', 'review', 'review_time']
        
    def __init__(self, *args, **kwargs):
        super(CourseRatingSerializer,self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth=1

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Quiz
        fields = ['id', 'instructor', 'title', 'detail', 'assign_status' , 'add_time']

    def __init__(self, *args, **kwargs):
        super(QuizSerializer,self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth=1

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.QuizQustions
        fields = ['id',  'quiz','question', 'ans1', 'ans2', 'ans3', 'ans4', 'right_ans']

    def __init__(self, *args, **kwargs):
        super(QuestionSerializer,self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth=1

class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.CourseQuiz
        fields = ['id','instructor', 'course', 'quiz', 'add_time']

    def __init__(self, *args, **kwargs):
            super(CourseQuizSerializer,self).__init__(*args, **kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method =='GET':
                self.Meta.depth=2

class AttemptQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.AttemptQuiz
        fields = ['id','student', 'quiz', 'question', 'given_ans', 'add_time']

    def __init__(self, *args, **kwargs):
            super(AttemptQuizSerializer,self).__init__(*args, **kwargs)
            request=self.context.get('request')
            self.Meta.depth=0
            if request and request.method =='GET':
                self.Meta.depth=2

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Post
        fields = ['id', 'course',  'name','uniq_id', 'body', 'time']

    def __init__(self, *args, **kwargs):
        super(PostSerializer,self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth=1

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Reply
        fields = ['id', 'post',  'name','uniq_id', 'body', 'time']

    def __init__(self, *args, **kwargs):
        super(ReplySerializer,self).__init__(*args, **kwargs)
        request=self.context.get('request')
        self.Meta.depth=0
        if request and request.method =='GET':
            self.Meta.depth=1

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.FAQ
        fields = ['id', 'question', 'answer']

class FlatPagesSerializer(serializers.ModelSerializer):
    class Meta:
        model= FlatPage
        fields=['id', 'title', 'content', 'url']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Contact
        fields=['id', 'first_name', 'last_name', 'email', 'query_txt']
