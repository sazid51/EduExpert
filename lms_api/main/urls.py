from django.urls import path
from . import views

urlpatterns = [
    #Instructor
    path('instructor/', views.InstructorList.as_view()),
    path('instructor/<int:pk>', views.InstructorDetail.as_view()),
    path('instructor-login',views.instructor_login),
    path('instructor/dashboard/<int:pk>', views.InstructorDashboard.as_view()),

    #Course
    path('course/', views.CourseList.as_view()),
    path('course/<int:pk>/', views.CourseDetail.as_view()),
    path('popular-course/', views.CourseRatingList.as_view()),

    # Search Courses
    path('search-course/<str:searchstring>', views.CourseList.as_view()),


    #Instructor Courses
    path('instructor-courses/<int:instructor_id>', views.InstructorCourseList.as_view()),
    path('instructor-course-detail/<int:pk>', views.InstructorCourseDetail.as_view()),

    # Instructor Quizes
    path('instructor-quiz-detail/<int:pk>', views.InstructorQuizDetail.as_view()),

    # Chapter
    path('chapter/', views.ChapterList.as_view()),
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    path('course-chapters/<int:course_id>', views.CourseChapterList.as_view()),

    # Student
    path('student/',views.StudentList.as_view()),
    path('student/<int:pk>', views.StudentDetail.as_view()),
    path('student-login',views.student_login),


    # Student Enroll Courese
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view()),
    path('student-enroll-course/<int:pk>', views.StudentEnrollCourseDetail.as_view()),
    path('fetch_enroll_status/<int:student_id>/<int:course_id>',views.fetch_enroll_status),
    path('fetch_enroll_students/<int:course_id>',views.EnrollStudentList.as_view()),
    path('fetch_enroll_courses/<int:student_id>/',views.EnrollStudentList.as_view()),
    path('add-fav-course/', views.FavouriteCourseList.as_view()),
    path('remove-fav-course/<int:student_id>/<int:course_id>', views.RemoveFavouriteCourseList),
    path('fetch_fav_status/<int:student_id>/<int:course_id>',views.fetch_fav_course),
    path('fetch_fav_courses/<int:student_id>/',views.FavouriteCourseList.as_view()),
    # path('fetch_recommended_courses/<int:studentId>/',views.EnrollStudentList.as_view()),

    # Course Rating
    path('rating/',views.RatingList.as_view()),
    path('rating/<int:pk>',views.RatingDetailView.as_view()),
    path('course-rating/<int:course_id>',views.CourseRatingList.as_view()),
    path('fetch_rating_status/<int:student_id>/<int:course_id>',views.fetch_rating_status),

    # Quiz
    path('quiz/',views.QuizList.as_view()),
    path('instructor-quiz/<int:instructor_id>', views.InstructorQuizList.as_view()),
    path('quiz/<int:pk>', views.QuizDetailView.as_view()),
    path('questions/', views.QuestionsList.as_view()),
    path('questions/<int:pk>', views.QuestionDetailView.as_view()),
    path('quiz-questions/<int:quiz_id>', views.QuizQuestionList.as_view()),
    path('quiz-questions/<int:quiz_id>/<int:limit>', views.QuizQuestionList.as_view()),
    path('quiz-assign-course/', views.AssignQuizList.as_view()),
    path('fetch-quiz-assign-status/<int:quiz_id>/<int:course_id>', views.fetch_quiz_assign_status),
    path('fetch_assigned_quiz/<int:course_id>', views.CourseQuizList.as_view()),
    path('attempt-quiz/', views.AttemptQuizList.as_view()),
    path('quiz-questions/<int:quiz_id>/next-question/<int:question_id>', views.QuizQuestionList.as_view()),
    path('fetch-quiz-attempt-status/<int:quiz_id>/<int:student_id>', views.fetch_quiz_attempt_status),
    path('attempted-quiz/<int:quiz_id>', views.AttemptQuizList.as_view()),
    path('fetch-quiz-result/<int:quiz_id>/<int:student_id>', views.fetch_quiz_result_status),
    

    # Discussion Forum
    # Post
    path('post/', views.PostList.as_view()),
    path('post/<int:pk>/', views.PostDetail.as_view()),
    path('course-post/<int:course_id>', views.CoursePostList.as_view()),
    path('course-post-detail/<int:pk>', views.CoursePostDetail.as_view()),

    # Reply
    path('reply/', views.ReplyList.as_view()),
    path('reply/<int:pk>', views.ReplyDetailView.as_view()),
    path('post-reply/<int:post_id>', views.PostReplyList.as_view()),
    path('post-reply-detail/<int:pk>', views.PostReplyDetail.as_view()),

    # FAQ
    path('faq/', views.FaqList.as_view()),
     path('faq/<int:pk>', views.FaqDetailView.as_view()),

    #Flatpage
    path('pages/', views.FlatPagesList.as_view()),
    path('pages/<int:pk>/<str:page_slug>/', views.FlatPagesDetail.as_view()),

    #contact us
    path('contact-us/', views.ContactList.as_view()),

    # Student Testimonial
    path('student-testimonial/',views.CourseRatingList.as_view()),
    
]