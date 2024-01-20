/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import SideBar from './sideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import CheckAttemptQuiz from './checkAttemptQuiz';

const baseUrl = 'http://127.0.0.1:8000/api';

function CourseQuiz() {
  const [quizData, setQuizData] = useState([]);

  const StudentId = localStorage.getItem('studentId');
  const { course_id } = useParams();

  //Fetch quiz when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/fetch_assigned_quiz/' + course_id).then((res) => {
        setQuizData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    document.title = 'Quiz List';
    console.log(quizData);
  }, []);

  return (
    <div className="container mt-4" style={{ marginBottom: '10%' }}>
      <div className="row">
        <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1 mb-4">
          <div className="card">
            <h4 className="card-header">Quiz List</h4>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th>Quiz</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {quizData.map((row, index) => (
                    <tr>
                      <td>{row.quiz.title}</td>
                      <td>
                        <CheckAttemptQuiz
                          quiz={row.quiz.id}
                          student={StudentId}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseQuiz;
