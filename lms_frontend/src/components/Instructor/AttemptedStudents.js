/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import QuizResult from '../user/QuizResult';

const baseUrl = 'http://127.0.0.1:8000/api';

function AttemptedStudents() {
  const [studentData, setstudentData] = useState([]);

  const instructorId = localStorage.getItem('instructorId');
  const { quiz_id } = useParams();

  //Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/attempted-quiz/' + quiz_id).then((res) => {
        setstudentData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + '/fetch-quiz-result/' + quiz_id).then((res) => {
        setstudentData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <InstructorSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header">List of Student Attempted to Quiz</h4>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {studentData.map((row, index) => (
                    <tr>
                      <td>
                        {row.student.first_name} {row.student.last_name}
                      </td>
                      <td>{row.student.email}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target={`#resultModal${row.id}`}
                        >
                          Quiz Result
                        </button>
                        <div
                          className="modal fade"
                          id={`resultModal${row.id}`}
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <QuizResult
                            quiz={row.quiz.id}
                            student={row.student.id}
                          />
                        </div>
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

export default AttemptedStudents;
