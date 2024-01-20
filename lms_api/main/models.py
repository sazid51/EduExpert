from distutils.command.upload import upload
import email
from tabnanny import verbose
from turtle import title
from unicodedata import category
from django.db import models
from django.core import serializers
from django.core.mail import send_mail

# Teacher Model
class Instructor(models.Model):
    first_name = models.CharField(max_length = 100)
    last_name = models.CharField(max_length = 100, null=True)
    profile_img = models.ImageField(upload_to='profile_photos/', null=True)
    email = models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    qualification=models.CharField(max_length=200)
    skills=models.CharField(max_length=200, null=True)
    

    class Meta:
        verbose_name_plural='01. Instructor'
    def __str__(self):
        return self.first_name

    def total_instructor_course(self):
        total_courses=Course.objects.filter(instructor=self).count()
        return total_courses

    def total_instructor_student(self):
        total_students=StudentCourseEnrollment.objects.filter(course__instructor=self).count()
        return total_students


# Course Model
class Course(models.Model):
    category=models.TextField(null=True)
    instructor=models.ForeignKey(Instructor, on_delete=models.CASCADE)
    title=models.CharField(max_length=150)
    description=models.TextField()
    price = models.IntegerField(null=True)
    duration = models.IntegerField(null=True)
    featured_img = models.ImageField(upload_to='course_imgs/', null=True)

    class Meta:
        verbose_name_plural='02. Courses'

    def related_course(self):
        related_course=Course.objects.filter(category__icontains=self.category)
        return serializers.serialize('json',related_course)

    def total_enrolled_students(self):
        total_enrolled_students=StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students

    def __str__(self):
        return self.title

    def course_rating(self):
        course_rating=CourseRating.objects.filter(course=self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']


# Chapter Model
class Chapter(models.Model):
    course=models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters', null=True)
    title=models.CharField(max_length=150)
    description=models.TextField()
    video = models.FileField(upload_to='course_videos/', null=True)
    remarks=models.TextField(null=True)

    class Meta:
        verbose_name_plural='03. Course Chapter'
    
    def __str__(self):
        return self.title

# Student Model
class Student(models.Model):
    first_name = models.CharField(max_length = 100)
    last_name = models.CharField(max_length = 100,null=True)
    profile_img = models.ImageField(upload_to='profile_photos/', null=True)
    email = models.CharField(max_length=100)
    password=models.CharField(max_length=100)
    interested_category=models.TextField()

    class Meta:
        verbose_name_plural='04. Students'
    
    def __str__(self):
        return self.first_name


# Student Course Enrollment
class StudentCourseEnrollment(models.Model):
    course=models.ForeignKey(Course,on_delete= models.CASCADE, related_name='enrolled_courses')
    student=models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrolled_student')
    enrollled_time=models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural="05. Enrolled Courses"

    def __str__(self):
        return f"{self.course} - {self.student}"

# Course Rating and Review
class CourseRating(models.Model):
    course=models.ForeignKey(Course,on_delete= models.CASCADE)
    student=models.ForeignKey(Student, on_delete=models.CASCADE)
    rating=models.PositiveBigIntegerField(default=0)
    review=models.TextField(null=True)
    review_time=models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural="06. Course Rating"

    def __str__(self):
        return f"{self.course} - {self.rating}"


# Student favourite Courses
class FavouriteCourse(models.Model):
    course=models.ForeignKey(Course,on_delete= models.CASCADE, null=True)
    student=models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    status=models.BooleanField(default=False)

    class Meta:
        verbose_name_plural="07. Student Favourite Courses"

    def __str__(self):
        return f"{self.course} - {self.student}"

# Quiz Model
class Quiz(models.Model):
    instructor=models.ForeignKey(Instructor, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length = 100)
    detail = models.CharField(max_length = 200)
    add_time=models.DateTimeField(auto_now_add=True)

    def assign_status(self):
        return CourseQuiz.objects.filter(quiz=self).count()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural="08. Quiz"

# Quiz Questions Model
class QuizQustions(models.Model):
    quiz=models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    question = models.CharField(max_length = 200, null=True)
    ans1 = models.CharField(max_length = 200)
    ans2 = models.CharField(max_length = 200)
    ans3 = models.CharField(max_length = 200)
    ans4 = models.CharField(max_length = 200)
    right_ans = models.CharField(max_length = 200)
    add_time=models.DateTimeField(auto_now_add=True)

    def __str__(self)->str:
        return self.question

    class Meta:
        verbose_name_plural="09. Quiz Questions"

# Add Quiz to the course
class CourseQuiz(models.Model):
    instructor=models.ForeignKey(Instructor, on_delete=models.CASCADE, null=True)
    course=models.ForeignKey(Course, on_delete=models.CASCADE, null=True)
    quiz=models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    add_time=models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural="10. Course Quiz"

# Quiz attempted by student
class AttemptQuiz(models.Model):
    student=models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    quiz=models.ForeignKey(Quiz, on_delete=models.CASCADE, null=True)
    question=models.ForeignKey(QuizQustions, on_delete=models.CASCADE, null=True)
    given_ans = models.CharField(max_length = 200, null=True)
    add_time=models.DateTimeField(auto_now_add=True)

    #

    class Meta:
        verbose_name_plural="11. Attempted Questions"


# Student favourite Courses
class Post(models.Model):
    course=models.ForeignKey(Course,on_delete= models.CASCADE, null=True)
    # instructor=models.ForeignKey(Instructor, on_delete=models.CASCADE)
    # student=models.ForeignKey(Student, on_delete=models.CASCADE)
    name = models.CharField(max_length = 200, null=True)
    uniq_id=models.IntegerField(null=True)
    body=models.TextField(null=True)
    time=models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural="12. Post"

# Student favourite Courses
class Reply(models.Model):
    post=models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length = 200, null=True)
    uniq_id=models.IntegerField(null=True)
    body=models.TextField(null=True)
    time=models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural="13. Reply"

# Quiz Questions Model
class FAQ(models.Model):
    question = models.CharField(max_length = 200)
    answer=models.TextField(null=True)

    def __str__(self)->str:
        return self.question

    class Meta:
        verbose_name_plural="14. FAQ"

# Contact Us
class Contact(models.Model):
    first_name=models.CharField(max_length=70)
    last_name=models.CharField(max_length=70)
    email=models.EmailField(max_length=70, null=True)
    query_txt=models.TextField()
    add_time=models.DateTimeField(auto_now_add=True)

    def __str__(self)->str:
        return self.query_txt

    def save(self, *args, **kwargs):
        send_mail(
            'Contact Query',
            'Here is the message.',
            'admin@eduexpert.com',
            [self.email],
            fail_silently=False,
            html_message=f'<p>{self.first_name} {self.last_name}</p><p>{self.query_txt}</p>'
        )

        return super(Contact,self).save(*args, **kwargs)
        
    class Meta:
        verbose_name_plural="15. Contact Us"