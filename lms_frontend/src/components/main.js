/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import ScrollToTop from '../scrollOnTop';
import Footer from './footer';
import Home from './home';
import Navbar from './navbar';
import { Routes, Route } from 'react-router-dom';
import About from './about';
import CourseDetail from './courseDetail';
import InstructorDetail from './InstructorDetail';
import CategoryCourses from './CategoryCourses';
import AllCourses from './AllCourses';

// Student
import Login from './user/login';
import Register from './user/Register';
import Dashboard from './user/dashboard';
import FavouriteCourses from './user/favCourses';
// import RecommendedCourses from './user/recommendedCourses';
import StudentProfile from './user/profile';
import StudentLogOut from './user/StudentLogout';

// Instructor
import InstructorLogin from './Instructor/InstructorLogin';
import InstructorRegister from './Instructor/InstructorRegister';
import InstructorDashboard from './Instructor/InstructorDashboard';
import AddCourses from './Instructor/AddCourses';
import InstructorCourses from './Instructor/InstructorCourses';
import InstructorProfile from './Instructor/InstructorProfile';
import InstaractorLogout from './Instructor/InstructorLogout';
import AddChapter from './Instructor/AddChapter';
import EditChapter from './Instructor/EditChapter';
import EditCourse from './Instructor/EditCourse';
import MyCourses from './user/mycourses';
import CourseChapters from './Instructor/CourseChapters';
import EnrolledStudents from './Instructor/EnrolledStudents';
import AddQuiz from './Instructor/AddQuiz';
import AllQuizes from './Instructor/AllQuizes';
import EditQuiz from './Instructor/EditQuiz';
import AddQuizQuestions from './Instructor/AddQuizQuestion';
import AllQuestions from './Instructor/AllQuestions';
import EditQuestion from './Instructor/EditQuestions';
import AssignQuiz from './Instructor/AssignQuiz';
import CourseQuiz from './user/CourseQuizList';
import TakeQuiz from './user/TakeQuiz';
import Post from './discussion_forum/Post';
import Reply from './discussion_forum/Reply';
import EditPost from './discussion_forum/EditPost';
import EditReply from './discussion_forum/EditReply';
import TakeQuiz1 from './user/TakenQuiz1';
import FAQ from './FAQ';
import Page from './Page';
import Search from './Search';
import ContactUs from './ContactUs';
import AttemptedStudents from './Instructor/AttemptedStudents';

function Main() {
  return (
    <div className="Main">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search/:searchstring" element={<Search />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/student-login" element={<Login />} />
        <Route path="/student-logout" element={<StudentLogOut />} />
        <Route path="/student-register" element={<Register />} />
        <Route path="/student-dashboard" element={<Dashboard />} />
        <Route path="/student-courses" element={<MyCourses />} />
        <Route path="/student-fav-courses" element={<FavouriteCourses />} />
        {/* <Route path="/student-recom-courses" element={<RecommendedCourses />} /> */}
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/instructor-login" element={<InstructorLogin />} />
        <Route path="/instructor-logout" element={<InstaractorLogout />} />
        <Route path="/instructor-register" element={<InstructorRegister />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor-courses" element={<InstructorCourses />} />
        <Route
          path="/enrolled-students/:course_id"
          element={<EnrolledStudents />}
        />
        <Route path="/add-courses" element={<AddCourses />} />
        <Route path="/edit-course/:course_id" element={<EditCourse />} />
        <Route path="/add-chapter/:course_id" element={<AddChapter />} />
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
        <Route path="/instructor-profile" element={<InstructorProfile />} />
        <Route
          path="/instructor-detail/:instructor_id"
          element={<InstructorDetail />}
        />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/all-chapters/:course_id" element={<CourseChapters />} />
        <Route path="/category/:category_slug" element={<CategoryCourses />} />

        {/* Quiz Routes */}
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/quiz" element={<AllQuizes />} />
        <Route path="/all-questions/:quiz_id" element={<AllQuestions />} />
        <Route path="/add-question/:quiz_id" element={<AddQuizQuestions />} />
        <Route path="/edit-question/:question_id" element={<EditQuestion />} />
        <Route path="/edit-quiz/:quiz_id" element={<EditQuiz />} />
        <Route path="/assign-quiz/:course_id" element={<AssignQuiz />} />
        <Route path="/course-quiz/:course_id" element={<CourseQuiz />} />
        <Route path="/take-quiz/:quiz_id" element={<TakeQuiz />} />
        {/* <Route path="/take-quiz/:quiz_id" element={<TakeQuiz1 />} /> */}
        <Route
          path="/attempted-students/:quiz_id"
          element={<AttemptedStudents />}
        />

        {/* Discussion Forum */}
        <Route path="/course-post/:course_id" element={<Post />} />
        <Route path="/edit-post/:post_id" element={<EditPost />} />
        <Route path="/post-reply/:post_id" element={<Reply />} />
        <Route path="/edit-reply/:reply_id" element={<EditReply />} />

        {/* FAQ */}
        <Route path="/faq" element={<FAQ />} />

        <Route path="/pages/:page_id/:page_slug" element={<Page />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
