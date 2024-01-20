import email
from pyexpat import model
from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

from django.contrib.flatpages.models import FlatPage

from rest_framework import generics
from rest_framework import permissions
from . import models
from .serializers import ChapterSerializer, CourseSerializer, InstructorSerializer, StudentSerializer,StudentCourseEnrollSerializer, CourseRatingSerializer, InstructorDashboardSerializer,FavouriteCourseSerializer, QuizSerializer, QuestionSerializer, CourseQuizSerializer,AttemptQuizSerializer, PostSerializer, ReplySerializer, FAQSerializer,FlatPagesSerializer,ContactSerializer

from rest_framework.pagination import PageNumberPagination

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 4

# Instructor Views
class InstructorList(generics.ListCreateAPIView):
    queryset=models.Instructor.objects.all()
    serializer_class=InstructorSerializer
    # permission_classes=[permissions.IsAuthenticated]

class InstructorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Instructor.objects.all()
    serializer_class=InstructorSerializer
    # permission_classes=[permissions.IsAuthenticated]

class InstructorDashboard(generics.RetrieveAPIView):
    queryset=models.Instructor.objects.all()
    serializer_class=InstructorDashboardSerializer

@csrf_exempt
def instructor_login(request):
    email=request.POST['email']
    password=request.POST['password']
    try:
        instructorData=models.Instructor.objects.get(email=email, password=password)
    except models.Instructor.DoesNotExist:
        instructorData=None
    if instructorData:
        return JsonResponse({'bool':True, 'instructor_id':instructorData.id})
    else:
        return JsonResponse({'bool':False})

# Course API View
class CourseList(generics.ListCreateAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer
    pagination_class=StandardResultsSetPagination

    def get_queryset(self):
        qs = super().get_queryset()
        if 'result' in self.request.GET:
            limit=int(self.request.GET['result'])
            qs=models.Course.objects.all().order_by('-id')[:limit]
        if 'searchstring' in self.kwargs:
            search=self.kwargs['searchstring']
            if search:
                qs=models.Course.objects.filter(Q(title__icontains=search)|Q(category__icontains=search))
        return qs



class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer

# Instructor Course API View
class InstructorCourseList(generics.ListCreateAPIView):
    serializer_class=CourseSerializer

    def get_queryset(self):
        instructor_id=self.kwargs['instructor_id']
        instructor=models.Instructor.objects.get(pk=instructor_id)
        
        return models.Course.objects.filter(instructor=instructor)

class InstructorCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer

class InstructorQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Quiz.objects.all()
    serializer_class=QuizSerializer


# Add Chapter View
class ChapterList(generics.ListCreateAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer


# Detail Chapter List
class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer

# Course Chapter List
class CourseChapterList(generics.ListCreateAPIView):
    serializer_class=ChapterSerializer

    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=models.Course.objects.get(pk=course_id)
        
        return models.Chapter.objects.filter(course=course)

#Student Data
class StudentList(generics.ListCreateAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentSerializer

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentSerializer

@csrf_exempt
def student_login(request):
    email=request.POST['email']
    password=request.POST['password']
    try:
        studentData=models.Student.objects.get(email=email, password=password)
    except models.Student.DoesNotExist:
        studentData=None
    if studentData:
        return JsonResponse({'bool':True, 'student_id':studentData.id})
    else:
        return JsonResponse({'bool':False})

# Course Enroll Student Views
class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer

class StudentEnrollCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer


def fetch_enroll_status(request,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    enrollStatus=models.StudentCourseEnrollment.objects.filter(course=course, student=student).count()
    if enrollStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

class EnrollStudentList(generics.ListAPIView):
    queryset=models.StudentCourseEnrollment.objects.all()
    serializer_class=StudentCourseEnrollSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=models.Course.objects.get(pk=course_id)    
            return models.StudentCourseEnrollment.objects.filter(course=course)

        elif 'teacher_id' in self.kwargs:
            instructor_id=self.kwargs['instructor_id']
            instructor=models.Instructor.objects.get(pk=instructor_id)
            return models.StudentCourseEnrollment.objects.filter(course_instructor=instructor).distinct()

        elif 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollment.objects.filter(student=student).distinct()


# Student Favourite Courses Viwes
class FavouriteCourseList(generics.ListCreateAPIView):
    queryset=models.FavouriteCourse.objects.all()
    serializer_class=FavouriteCourseSerializer

    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.FavouriteCourse.objects.filter(student=student).distinct()


def RemoveFavouriteCourseList(request,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favStatus=models.FavouriteCourse.objects.filter(course=course, student=student).delete()
    if favStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

def fetch_fav_course(request,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    favStatus=models.FavouriteCourse.objects.filter(course=course, student=student).first()
    if favStatus and favStatus.status==True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})


# Rating and Review Views
class RatingList(generics.ListCreateAPIView):
    queryset=models.CourseRating.objects.all()
    serializer_class=CourseRatingSerializer

class RatingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.CourseRating.objects.all()
    serializer_class=CourseRatingSerializer

class CourseRatingList(generics.ListAPIView):
    queryset=models.CourseRating.objects.all()
    serializer_class=CourseRatingSerializer

    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql="SELECT *,AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN main_course as c ON cr.course_id=c.id GROUP BY c.id ORDER BY avg_rating desc LIMIT 4"
            return models.CourseRating.objects.raw(sql)

        if 'all' in self.request.GET:
            sql="SELECT *,AVG(cr.rating) as avg_rating FROM main_courserating as cr INNER JOIN main_course as c ON cr.course_id=c.id GROUP BY c.id ORDER BY avg_rating desc"
            return models.CourseRating.objects.raw(sql)
        return models.CourseRating.objects.filter(course__isnull=False).order_by('-rating')[:5]

def fetch_rating_status(request,student_id,course_id):
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    ratingStatus=models.CourseRating.objects.filter(course=course, student=student).count()
    if ratingStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

# quiz Views
class QuizList(generics.ListCreateAPIView):
    queryset=models.Quiz.objects.all()
    serializer_class=QuizSerializer

# Detail Quiz View
class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Quiz.objects.all()
    serializer_class=QuizSerializer

# Instructor Quiz API View
class InstructorQuizList(generics.ListCreateAPIView):
    serializer_class=QuizSerializer

    def get_queryset(self):
        instructor_id=self.kwargs['instructor_id']
        instructor=models.Instructor.objects.get(pk=instructor_id)
        
        return models.Quiz.objects.filter(instructor=instructor)

# Quiz Question List
class QuizQuestionList(generics.ListCreateAPIView):
    serializer_class=QuestionSerializer

    def get_queryset(self):
        quiz_id=self.kwargs['quiz_id']
        quiz=models.Quiz.objects.get(pk=quiz_id)
        if 'limit' in self.kwargs:
            return models.QuizQustions.objects.filter(quiz=quiz).order_by('id')[:1]
        elif 'question_id' in self.kwargs:
            current_question=self.kwargs['question_id']
            return models.QuizQustions.objects.filter(quiz=quiz,id__gt=current_question).order_by('id')[:1]
        else:
            return models.QuizQustions.objects.filter(quiz=quiz)

# Questions View
class QuestionsList(generics.ListCreateAPIView):
    queryset=models.QuizQustions.objects.all()
    serializer_class=QuestionSerializer


# Detail Questions List
class QuestionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.QuizQustions.objects.all()
    serializer_class=QuestionSerializer

# Quiz Assignment in Course Views
class AssignQuizList(generics.ListCreateAPIView):
    queryset=models.CourseQuiz.objects.all()
    serializer_class=CourseQuizSerializer

def fetch_quiz_assign_status(request,quiz_id,course_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    assignStatus=models.CourseQuiz.objects.filter(course=course, quiz=quiz).count()
    if assignStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

# Course Quiz Viwes
class CourseQuizList(generics.ListCreateAPIView):
    queryset=models.CourseQuiz.objects.all()
    serializer_class=CourseQuizSerializer

    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=models.Course.objects.get(pk=course_id)
            return models.CourseQuiz.objects.filter(course=course)

# Attempt Quiz Viwes
class AttemptQuizList(generics.ListCreateAPIView):
    queryset=models.AttemptQuiz.objects.all()
    serializer_class=AttemptQuizSerializer

    def get_queryset(self):
        if 'quiz_id' in self.kwargs:
            quiz_id=self.kwargs['quiz_id']
            quiz=models.Quiz.objects.get(pk=quiz_id)
            return models.AttemptQuiz.objects.raw(f'SELECT * FROM main_attemptquiz WHERE quiz_id={int(quiz_id)} GROUP by student_id')


def fetch_quiz_attempt_status(request,quiz_id,student_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    student=models.Student.objects.filter(id=student_id).first()
    attemptStatus=models.AttemptQuiz.objects.filter(student=student, question__quiz=quiz).count()
    if attemptStatus>0:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

def fetch_quiz_result_status(request,quiz_id,student_id):
    quiz=models.Quiz.objects.filter(id=quiz_id).first()
    student=models.Student.objects.filter(id=student_id).first()
    total_questions=models.QuizQustions.objects.filter(quiz=quiz).count()
    total_attempted_questions=models.AttemptQuiz.objects.filter(quiz=quiz, student=student).values('student').count()
    attempted_questions=models.AttemptQuiz.objects.filter(quiz=quiz,student=student)

    total_correct_questions=0
    for attempt in attempted_questions:
        if attempt.given_ans==attempt.question.right_ans:
            total_correct_questions+=1

    return JsonResponse({'total_questions':total_questions, 'total_attempted_questions':total_attempted_questions , 'total_correct_questions':total_correct_questions})


# Main Post API View
class PostList(generics.ListCreateAPIView):
    queryset=models.Post.objects.all()
    serializer_class=PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Post.objects.all()
    serializer_class=PostSerializer


class CoursePostList(generics.ListCreateAPIView):
    serializer_class=PostSerializer

    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=models.Course.objects.get(pk=course_id)
        
        return models.Post.objects.filter(course=course).order_by('-id')

class CoursePostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Post.objects.all()
    serializer_class=PostSerializer

# Reply View
class ReplyList(generics.ListCreateAPIView):
    queryset=models.Reply.objects.all()
    serializer_class=ReplySerializer


class ReplyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Reply.objects.all()
    serializer_class=ReplySerializer

class PostReplyList(generics.ListCreateAPIView):
    serializer_class=ReplySerializer

    def get_queryset(self):
        post_id=self.kwargs['post_id']
        post=models.Post.objects.get(pk=post_id)
        
        return models.Reply.objects.filter(post=post)

class PostReplyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Reply.objects.all()
    serializer_class=ReplySerializer

# FAQ
class FaqList(generics.ListCreateAPIView):
    queryset=models.FAQ.objects.all()
    serializer_class=FAQSerializer

# Detail FAQ List
class FaqDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.FAQ.objects.all()
    serializer_class=FAQSerializer


#flatpage view
class FlatPagesList(generics.ListAPIView):
    queryset= FlatPage.objects.all()
    serializer_class=FlatPagesSerializer

class FlatPagesDetail(generics.RetrieveAPIView):
    queryset= FlatPage.objects.all()
    serializer_class=FlatPagesSerializer

# Contact Views
class ContactList(generics.ListCreateAPIView):
    queryset=models.Contact.objects.all()
    serializer_class=ContactSerializer
    # permission_classes=[permissions.IsAuthenticated]