/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPlayer from 'react-player';

const siteUrl = 'http://127.0.0.1:8000/';
const baseUrl = 'http://127.0.0.1:8000/api';

function CourseDetail() {
  const [courseData, setCourseData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [instructorData, setInstructorData] = useState([]);
  const [relatedCourseData, setRelatedCourseData] = useState([]);
  const [studentLoginStatus, setStudentLoginStatus] = useState();
  const [enrollStatus, setEnrollStatus] = useState();
  const [favStatus, setFavStatus] = useState();
  const [ratingStatus, setRatingStatus] = useState();
  const [avgRating, setAvgRating] = useState(0);
  const [play, setPlay] = useState();

  const [instructorLoginStatus, setInstructorLoginStatus] = useState();

  let { course_id } = useParams();
  const studentId = localStorage.getItem('studentId');

  //Fetch course when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/course/' + course_id).then((res) => {
        setCourseData(res.data);
        setChapterData(res.data.course_chapters);
        setInstructorData(res.data.instructor);
        setRelatedCourseData(JSON.parse(res.data.related_course));
        if (res.data.course_rating !== '' && res.data.course_rating !== null) {
          setAvgRating(res.data.course_rating);
        }
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios
        .get(baseUrl + '/fetch_enroll_status/' + studentId + '/' + course_id)
        .then((res) => {
          if (res.data.bool === true) {
            setEnrollStatus('success');
          }
        });
    } catch (error) {
      console.log(error);
    }

    // Fetch Fav Course Status
    try {
      axios
        .get(baseUrl + '/fetch_fav_status/' + studentId + '/' + course_id)
        .then((res) => {
          if (res.data.bool === true) {
            setFavStatus('success');
          } else {
            setFavStatus('');
          }
        });
    } catch (error) {
      console.log(error);
    }

    // Fetch Rating Status
    try {
      axios
        .get(baseUrl + '/fetch_rating_status/' + studentId + '/' + course_id)
        .then((res) => {
          if (res.data.bool === true) {
            setRatingStatus('success');
          }
        });
    } catch (error) {
      console.log(error);
    }

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus === 'true') {
      setStudentLoginStatus('success');
    }

    const instructorLoginStatus = localStorage.getItem('instructorLoginStatus');
    if (instructorLoginStatus === 'true') {
      setInstructorLoginStatus('success');
    }
  }, [course_id, studentId]);
  // const module_id = moduleData[0];
  // console.log(module_id);
  console.log(relatedCourseData);

  const enrollCourse = () => {
    const _formData = new FormData();
    _formData.append('course', course_id);
    _formData.append('student', studentId);
    Swal.fire({
      title: 'Confirm Your Payment',
      text: 'Go for Payment Options',
      icon: 'info',
      confirmButtonText: 'Continue',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .post(baseUrl + '/student-enroll-course/', _formData)
            .then((res) => {
              Swal.fire({
                title: 'Enrolled Successfully To This Course',
                icon: 'success',
                toast: true,
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
              });
              setEnrollStatus('success');
              setTimeout(() => {}, 2000);
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const markFav = () => {
    const _formData = new FormData();
    _formData.append('course', course_id);
    _formData.append('student', studentId);
    _formData.append('status', true);
    try {
      axios.post(baseUrl + '/add-fav-course/', _formData).then((res) => {
        Swal.fire({
          title: 'This Course has been added as Favourite',
          icon: 'success',
          toast: true,
          timer: 2000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setFavStatus('success');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFav = () => {
    const _formData = new FormData();
    _formData.append('course', course_id);
    _formData.append('student', studentId);
    _formData.append('status', false);
    try {
      axios
        .get(
          baseUrl + '/remove-fav-course/' + studentId + '/' + course_id,
          _formData
        )
        .then((res) => {
          Swal.fire({
            title: 'This course has been remove from favourite',
            icon: 'success',
            toast: true,
            timer: 2000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setFavStatus('');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const closeVideo = () => {
    setPlay(false);
  };

  const playVideo = () => {
    setPlay(true);
  };

  // Add Rating
  const [ratingData, setRatingData] = useState({
    rating: '',
    review: '',
  });

  // add rating data
  const handleChange = (e) => {
    setRatingData({
      ...ratingData,
      [e.target.name]: e.target.value,
    });
  };
  const submitForm = () => {
    const _formData = new FormData();
    _formData.append('course', course_id);
    _formData.append('student', studentId);
    _formData.append('rating', ratingData.rating);
    _formData.append('review', ratingData.review);

    try {
      axios.post(baseUrl + '/rating/', _formData).then((res) => {
        Swal.fire({
          title: 'Rating has been added',
          icon: 'success',
          toast: true,
          timer: 1000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4 mt-3">
          <img
            src={courseData.featured_img}
            className="img-thumbnail"
            alt="..."
          />
        </div>
        <div className="col-8 mt-3">
          <h3>{courseData.title}</h3>
          <p>{courseData.description}</p>
          <p className="fw-bold">
            Course By:{' '}
            <Link to={`/instructor-detail/` + instructorData.id}>
              {instructorData.first_name} {instructorData.last_name}
            </Link>
          </p>
          <p className="fw-bold">Category: {courseData.category}</p>
          <p className="fw-bold">
            Approximate Duration: {courseData.duration} hour(s)
          </p>
          <p className="fw-bold">
            Total Enrolled: {courseData.total_enrolled_students} Student(s)
          </p>
          <p className="fw-bold">
            Rating: {avgRating}/5
            {enrollStatus === 'success' && studentLoginStatus === 'success' && (
              <>
                {ratingStatus !== 'success' && (
                  <button
                    className="btn btn-success btn-sm ms-3"
                    data-bs-toggle="modal"
                    data-bs-target="#ratingModal"
                  >
                    Rate Now
                  </button>
                )}

                {ratingStatus === 'success' && (
                  <small className="badge bg-info text-dark ms-3">
                    You have rated this course
                  </small>
                )}

                <div
                  className="modal fade"
                  id="ratingModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="ratingModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-md" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="ratingModalLabel">
                          Rate for "{courseData.title}"
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="form-group">
                            <label for="rating">Rating</label>
                            <select
                              onChange={handleChange}
                              className="form-control"
                              name="rating"
                            >
                              <option value="">---Select Your Rating---</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label for="review">Review</label>
                            <textarea
                              onChange={handleChange}
                              name="review"
                              className="form-control"
                              rows={5}
                            ></textarea>
                          </div>
                          <button
                            onClick={submitForm}
                            type="submit"
                            className="btn btn-primary mt-3"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </p>
          <p>
            {enrollStatus === 'success' && studentLoginStatus === 'success' && (
              <span></span>
            )}
            {studentLoginStatus === 'success' && enrollStatus !== 'success' && (
              <button
                type="button"
                onClick={enrollCourse}
                className="btn btn-success"
              >
                Enroll Now
              </button>
            )}

            {studentLoginStatus === 'success' &&
              enrollStatus !== 'success' &&
              favStatus !== 'success' && (
                <p>
                  <button
                    type="button"
                    onClick={markFav}
                    title="Add as Favourite"
                    className="heartIcon1 ms-2"
                  >
                    <i className="bi bi-heart-fill"></i>
                  </button>
                </p>
              )}
            {studentLoginStatus === 'success' &&
              enrollStatus !== 'success' &&
              favStatus === 'success' && (
                <p>
                  <button
                    type="button"
                    onClick={removeFav}
                    title="Remove from Favourite"
                    className="heartIcon2 ms-2"
                  >
                    <i className="bi bi-heart-fill"></i>
                  </button>
                </p>
              )}
            {studentLoginStatus !== 'success' &&
              instructorLoginStatus !== 'success' && (
                <Link to="/student-login">Login to Enroll the Course</Link>
              )}
            {enrollStatus === 'success' && studentLoginStatus === 'success' && (
              <Link to={`/course-post/` + courseData.id}>
                Join Discussion Forum
              </Link>
            )}
          </p>
        </div>

        {/* --- Course Videos --- */}
        <div className="card mt-4 mb-4">
          <div className="card-header bg-dark text-light h4 fw-bold mt-2 mb-2">
            Course Videos
          </div>
          <ul className="list-group list-group-flush">
            {chapterData &&
              chapterData.map((chapter) => (
                <li className="list-group-item" key={chapter.id}>
                  {chapter.title}
                  {studentLoginStatus === 'success' &&
                    enrollStatus !== 'success' &&
                    instructorLoginStatus !== 'success' && (
                      <>
                        <span className="float-end">
                          Enroll to See the Course Video
                        </span>
                      </>
                    )}
                  {enrollStatus === 'success' &&
                    studentLoginStatus === 'success' &&
                    instructorLoginStatus !== 'success' && (
                      <>
                        <span className="float-end">
                          {/* <span className="me-5">1 Hour 30 Minutes</span> */}
                          <button
                            onclick={playVideo}
                            className="btn btn-sm btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target={`#videoModal_${chapter.id}`}
                          >
                            <i class="bi bi-play-circle-fill"></i>
                          </button>
                        </span>
                        {/* Video Modal */}
                        <div
                          className="modal fade"
                          id={`videoModal_${chapter.id}`}
                          tabindex="-1"
                          aria-labelledby={`videoModalLabel_${chapter.id}`}
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id={`videoModalLabel_${chapter.id}`}
                                >
                                  {chapter.title}
                                </h5>
                                <button
                                  onclick={closeVideo}
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div className="ratio ratio-16x9">
                                  <ReactPlayer
                                    key={`frame_${chapter.id}`}
                                    url={chapter.video}
                                    width="100%"
                                    height="100%"
                                    playing={play}
                                    controls
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                  {/* Video Modal End */}
                </li>
              ))}
            {enrollStatus === 'success' &&
              instructorLoginStatus !== 'success' &&
              studentLoginStatus === 'success' && (
                <li className="list-group-item">
                  Take the Quiz{' '}
                  <span className="float-end">
                    <Link to={'/course-quiz/' + courseData.id}>Quiz List</Link>
                  </span>
                </li>
              )}
          </ul>
        </div>

        {/* --- Course Reviews --- */}

        {/* Related Courses */}
        <h3 className="pb-1 fw-bold mb-3 mt-5">Related Courses </h3>
        <div className="row gy-2 mb-4">
          {relatedCourseData.map((rcourse, index) => (
            <div className="col-lg-3 col-md-4">
              <div className="box bg-primary h-100 d-flex flex-column text-white rounded course-box">
                <img
                  src={`${siteUrl}media/${rcourse.fields.featured_img}`}
                  className="rounded"
                  alt={rcourse.fields.title}
                />
                <h4 className="mt-1 p-2">{rcourse.fields.title}</h4>
                <div className="p-2 mt-auto">
                  <h5 className="">BDT {rcourse.fields.price}</h5>
                  <Link
                    target="__blank"
                    className="btn mt-auto btn-dark"
                    to={`/detail/${rcourse.pk}`}
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
