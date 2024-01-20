/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const baseUrl = 'http://127.0.0.1:8000/api';

function Search() {
  const [courseData, setCourseData] = useState([]);
  const { searchstring } = useParams();

  //Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/search-course/' + searchstring).then((res) => {
        setCourseData(res.data.results);
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="container mt-4 mb-4">
      {/* Start All Courses */}
      <h3 className="pb-1 mb-2 text-center">
        Search results for <span className="text-primary">{searchstring}</span>{' '}
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

      {/* End All Courses */}
      {/* Pagination Starts */}
      {/* Pagination Ends */}
    </div>
  );
}

export default Search;
