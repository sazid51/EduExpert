/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';

function InstructorCourses() {
  const [courseData, setCourseData] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const instructorId = localStorage.getItem('instructorId');

  //Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/instructor-courses/' + instructorId).then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [instructorId]);

  // Sweet alert for Delete Course
  const handleClickDel = (course_id) => {
    Swal.fire({
      title: 'Confirm',
      text: 'Are You Sure You Want to Delete This Course?',
      icon: 'info',
      confirmButtonText: 'Continue',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + '/course/' + course_id).then((res) => {
            Swal.fire('Success', 'Course has been deleted.');
            try {
              axios
                .get(baseUrl + '/instructor-courses/' + instructorId)
                .then((res) => {
                  setCourseData(res.data);
                });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (err) {
          Swal.fire('Error!!!', 'Course h as not been deleted!');
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <InstructorSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header">My Courses</h4>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th>Course Name</th>
                    <th>Featured Image</th>
                    <th>Total Enrolled</th>
                    <th>Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {courseData.map((course, index) => (
                    <tr>
                      <td>
                        <Link to={'/all-chapters/' + course.id}>
                          {course.title}
                        </Link>
                      </td>
                      <td>
                        <img
                          src={course.featured_img}
                          width="80"
                          className="rounded"
                          alt={course.title}
                        />
                      </td>
                      <td>
                        <Link to={`/enrolled-students/` + course.id}>
                          {course.total_enrolled_students}
                        </Link>
                      </td>
                      <td>
                        {course.course_rating && (
                          <span>{course.course_rating}/5</span>
                        )}
                        {!course.course_rating && <span>0/5</span>}
                      </td>
                      <td>
                        <Link
                          to={'/assign-quiz/' + course.id}
                          className="btn btn-success mt-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Assign Quiz"
                        >
                          <i class="bi bi-file-earmark-plus"></i>
                        </Link>
                        <Link
                          to={'/edit-course/' + course.id}
                          className="btn btn-info ms-2 mt-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit the Course"
                        >
                          <i class="bi bi-pencil-square"></i>
                        </Link>

                        <button
                          onClick={() => handleClickDel(course.id)}
                          className="btn btn-danger ms-2 mt-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Delete the Course"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
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

export default InstructorCourses;
