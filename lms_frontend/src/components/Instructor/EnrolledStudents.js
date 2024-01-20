/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function EnrolledStudents() {
  const [studentData, setStudentData] = useState([]);
  const [CourseData, setCourseData] = useState([]);

  const { course_id } = useParams();

  //fetch_enroll_students when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/fetch_enroll_students/' + course_id).then((res) => {
        setStudentData(res.data);
        // console.log(studentData);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + '/course/' + course_id).then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [course_id]);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <InstructorSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header bg-info text-dark text-center">
              {CourseData.title}
            </h4>
            <h4 className="card-header">Enrolled Student(s) List</h4>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {studentData.map((row, index) => (
                    <tr>
                      <td>
                        {row.student.first_name} {row.student.last_name}
                      </td>
                      <td>{row.student.email}</td>
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

export default EnrolledStudents;
