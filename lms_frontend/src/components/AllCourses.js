/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api/course/';

function AllCourses() {
  const [courseData, setCourseData] = useState([]);
  const [nextUrl, setnextUrl] = useState();
  const [previousUrl, setpreviousUrl] = useState();

  //Fetch courses when page load
  useEffect(() => {
    fetchdata(baseUrl);
  }, []);

  const paginationHandler = (url) => {
    fetchdata(url);
  };

  function fetchdata(url) {
    try {
      axios.get(url).then((res) => {
        setnextUrl(res.data.next);
        setpreviousUrl(res.data.previous);
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-4 mb-4">
      {/* Start All Courses */}
      <h2 className="pb-1 mb-2 text-center fw-bold">Our All Courses</h2>
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

      {/* End All Courses */}
      {/* Pagination Starts */}
      <nav aria-label="Page navigation mt-5">
        <ul className="pagination justify-content-center">
          {previousUrl && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginationHandler(previousUrl)}
              >
                <i class="bi bi-arrow-left"></i>Previous
              </button>
            </li>
          )}
          {nextUrl && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginationHandler(nextUrl)}
              >
                <i class="bi bi-arrow-right"></i>Next
              </button>
            </li>
          )}
        </ul>
      </nav>
      {/* Pagination Ends */}
    </div>
  );
}

export default AllCourses;
