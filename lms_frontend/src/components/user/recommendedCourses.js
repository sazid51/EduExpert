/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import SideBar from './sideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';

function RecommendedCourses() {
  const [courseData, setCourseData] = useState([]);

  const StudentId = localStorage.getItem('studentId');

  //Fetch enroll courses when page load
  useEffect(() => {
    try {
      axios
        .get(baseUrl + '/fetch_recommended_courses/' + StudentId)
        .then((res) => {
          setCourseData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [StudentId]);

  console.log(courseData);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header">My Enrolled Courses</h4>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th>Course Name</th>
                    <th>Instructor Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {courseData.map((row, index) => (
                    <tr>
                      <td>{row.course.title}</td>
                      <td>
                        {row.course.instructor.first_name}{' '}
                        {row.course.instructor.last_name}
                      </td>
                      <td>
                        <Link
                          to={`/detail/` + row.course.id}
                          className="btn btn-success btn-sm active"
                        >
                          View Course
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RecommendedCourses;
