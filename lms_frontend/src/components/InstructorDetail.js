/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function InstructorDetail() {
  const [instructorData, setInstructorData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const { instructor_id } = useParams();

  useEffect(() => {
    //Fetch current instructor data
    try {
      axios.get(baseUrl + '/instructor/' + instructor_id).then((res) => {
        setInstructorData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios
        .get(baseUrl + '/instructor-courses/' + instructor_id)
        .then((res) => {
          setCourseData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [instructor_id]);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3 mb-2">
          <div className="box d-flex flex-column align-items-center text-dark rounded instructor-box">
            {instructorData.profile_img && (
              <img
                src={instructorData.profile_img}
                width=""
                alt=""
                className="mt-2 mb-2"
              />
            )}
            {!instructorData.profile_img && (
              <img
                src="../Photos/dummy.jpg"
                width="300"
                alt=""
                className="mt-2 mb-2"
              />
            )}
          </div>
        </div>
        <div className="col-md-8 mb-2 mt-5">
          <h4 className="profile-dash">
            <i class="profileIcon bi bi-person"></i>
            {instructorData.first_name} {instructorData.last_name}
          </h4>
          <h6 className="profile-dash mt-3 ms-2">
            <i class="mailIcon bi bi-envelope"></i> {instructorData.email}
          </h6>
          <h6 className="profile-dash ms-2">
            <i class="mailIcon bi bi-lightbulb-fill"></i>{' '}
            {instructorData.skills} expert
          </h6>
        </div>
      </div>
      <div className="card mt-4 mb-4">
        <h4 className="card-header bg-dark text-light">Instructor's Courses</h4>
        <ul className="list-group list-group-flush">
          {courseData.map((course, index) => (
            <li className="list-group-item">
              <Link to={`/detail/` + course.id}>{course.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default InstructorDetail;
