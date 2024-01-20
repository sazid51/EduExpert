/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import './home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';

const baseUrl = 'http://127.0.0.1:8000/api';

function Home() {
  const [courseData, setCourseData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  const [popularCourse, setPopularCourse] = useState([]);

  //Fetch courses when page load
  useEffect(() => {
    document.title = 'EduExpert | Learn From Expert';
    try {
      axios.get(baseUrl + '/course/?result=4').then((res) => {
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + '/popular-course/?popular=4').then((res) => {
        setPopularCourse(res.data);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    // fetch student testimonial
    try {
      axios.get(baseUrl + '/student-testimonial/?result=5').then((res) => {
        setTestimonialData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {/* home section starts */}
      <div>
        <div className="home" id="home">
          <div className="container">
            <div className="pt-5 mt-5">
              <h1>Education From Home</h1>
              <h3 className="text-light fw-light">
                Welcome to Edu Expert. Now learning is more accessible and easy
                for you from home. Learn and explore yourself with our Edu
                Expert learners community.
              </h3>
              <Link to="/all-courses">
                <button type="submit" className="btn btn-primary fs-5 mt-5">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div style={{ backgroundColor: 'rgba(135, 206, 250, 0.2)' }}>
        <div className="container">
          <div className="row mt-3 mb-3">
            <div className="col-12 col-lg-6 mb-3 rounded">
              {/* <ReactPlayer
                key="AboutVideo"
                // url="../Photos/Edu Expert.mp4"
                width="100%"
                height="100%"
                controls
                className="rounded mt-2"
              /> */}
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/d0fYfPCLWAg"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="col-12 col-lg-6 mt-5 mb-3">
              <h3 className="fw-bold">Why Choose Us?</h3>
              <p>
                Here we you will find the most promising and updated courses. We
                have bunch of proficient instructor to teach you through their
                quality content. These contents are in our mother language,
                Bangla. Anyone can easily understand and learn many things form
                here.
              </p>
              <p>
                We have dicussion forum for each courses, which is operated by
                course's expert. You can join with a proactive community throug
                this. Here you can seek for help and can also share your ideas
                and innovations.
              </p>
              {/* <Link to="#">
                <button type="button" className="btn btn-primary fs-5 mt-3">
                  Learn More
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        {/* Latest Courses */}
        <h3 className="pb-1 fw-bold mb-4">
          Latest Courses{' '}
          <Link to="/all-courses" className="float-end">
            See All
          </Link>
        </h3>
        <div className="row gy-2 mt-2 mb-4">
          {courseData &&
            courseData.map((course, index) => (
              <div className="col-lg-3 col-md-4 pb-3">
                <div className="box bg-primary h-100 d-flex flex-column text-white rounded course-box">
                  <img
                    src={course.featured_img}
                    className="rounded"
                    alt={course.title}
                  />
                  <h4 className="mt-1 p-2">{course.title}</h4>
                  <div className="p-2 mt-auto">
                    <h5 className="">BDT {course.price}</h5>
                    <Link
                      className="btn mt-auto btn-dark"
                      to={`/detail/${course.id}`}
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* Latest Courses */}

        {/* Popular Courses */}
        <h3 className="pb-1 fw-bold mb-4 mt-5">
          Popular Courses{' '}
          <Link to="/all-courses" className="float-end">
            See All
          </Link>
        </h3>
        <div className="row gy-2">
          {popularCourse &&
            popularCourse.map((row, index) => (
              <div className="col-lg-3 col-md-4 pb-3">
                <div className="box bg-primary h-100 d-flex flex-column text-white rounded course-box">
                  <img
                    src={row.course.featured_img}
                    className="rounded"
                    alt={row.course.title}
                  />
                  <h4 className="mt-1 p-2">{row.course.title}</h4>
                  <div className="p-2 mt-auto">
                    <h5 className="">BDT {row.course.price}</h5>
                    <Link
                      className="btn mt-auto btn-dark"
                      to={`/detail/${row.course.id}`}
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* End Popular Courses*/}
        {/* Popular Instructor */}
        <h3 className="pb-1 fw-bold mb-4 mt-5">Our Expert Instructors </h3>
        <div className="row gy-2">
          <div className="col-lg-3 col-md-4">
            <div className="box d-flex flex-column align-items-center text-dark h-100 rounded inst-box">
              <img src="../InstructorPhotos/iqbal sir.jpg" alt="..." />
              <h4 className="mt-3">
                <p id="name" className="text-primary">
                  Dr. Md. Iqbal Hasan Sarker
                </p>
              </h4>
              <h5 className="p-2 text-center">
                Data Science, Machine Learning, Cyber Security Expert
              </h5>
              <div className="social-link mb-4 mt-auto">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="lin"
                >
                  <FaFacebook />
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="lin"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="box d-flex flex-column align-items-center text-dark h-100 rounded inst-box">
              <img src="../InstructorPhotos/sabiha mam.jpg" alt="..." />
              <h4 className="mt-3">
                <p id="name" className="text-primary">
                  Sabiha Anan
                </p>
              </h4>
              <h5 className="p-2 text-center">
                Data Science, Machine Learning Expert
              </h5>
              <div className="social-link mb-4 mt-auto">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="lin"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="lin"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="box d-flex flex-column align-items-center text-dark h-100 rounded inst-box">
              <img src="../InstructorPhotos/rizbi sir.jpg" alt="..." />
              <h4 className="mt-3">
                <p id="name" className="text-primary">
                  Md. Atiqul Islam Rizvi
                </p>
              </h4>
              <h5 className="p-2 text-center">Machine Learning Expert</h5>
              <div className="social-link mb-4 mt-auto">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="lin"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="lin"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="box d-flex flex-column align-items-center text-dark h-100 rounded inst-box">
              <img src="../InstructorPhotos/sharif sir.jpg" alt="..." />
              <h4 className="mt-3">
                <p id="name" className="text-primary">
                  Omar Sharif
                </p>
              </h4>
              <h5 className="p-2 text-center">Deep Learning Expert</h5>
              <div className="social-link mb-4 mt-auto">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="lin"
                >
                  <FaFacebook />
                </a>

                <a href="https://www.linkedin.com/" className="lin">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* End Popular Instructor */}
        {/* Student Testimonial */}
        <h3 className="pb-1 fw-bold mb-4 mt-5">Student Testimonial </h3>
        <div
          id="student-testimonial"
          className="carousel slide bg-success text-white py-5 mb-4"
          data-bs-ride="true"
        >
          <div className="carousel-indicators">
            {testimonialData &&
              testimonialData.map((row, index) => (
                <button
                  type="button"
                  data-bs-target="#student-testimonial"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current="true"
                  aria-label={`Slide${index + 1}`}
                ></button>
              ))}
          </div>
          <div className="carousel-inner">
            {testimonialData &&
              testimonialData.map((row, i) => (
                <div
                  className={
                    i === 0
                      ? 'carousel-item active text-center'
                      : 'carousel-item text-center'
                  }
                >
                  <figure className="text-center">
                    <blockquote className="blockquote">
                      <p>{row.review}</p>
                    </blockquote>
                    <figcaption className="blockquote-footer text-dark">
                      <cite title="Source Title">
                        {row.student.first_name} {row.student.last_name}
                      </cite>
                      <br />
                      {row.course.title}
                    </figcaption>
                  </figure>
                </div>
              ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#student-testimonial"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#student-testimonial"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* End Student Testomonial */}
      </div>
    </>
  );
}

export default Home;
