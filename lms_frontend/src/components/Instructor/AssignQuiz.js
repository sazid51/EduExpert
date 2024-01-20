/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CheckQuizCourse from './CheckQuizCourse';
const baseUrl = 'http://127.0.0.1:8000/api';

function AssignQuiz() {
  const [quizData, setQuizData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [assignStatus, setAssignStatus] = useState();

  const instructorId = localStorage.getItem('instructorId');
  const { course_id } = useParams();

  //Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/instructor-quiz/' + instructorId).then((res) => {
        setQuizData(res.data);
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
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <InstructorSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header">
              Assign Quizes to{' '}
              <span className="text-primary">({courseData.title})</span>
            </h4>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th>Quiz Name</th>
                    <th>Assign Quiz</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {quizData.map((quiz, index) => (
                    <tr>
                      <td>
                        <Link to={'/all-questions/' + quiz.id}>
                          {quiz.title}
                        </Link>
                      </td>
                      <td>
                        <CheckQuizCourse quiz={quiz.id} course={course_id} />
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

export default AssignQuiz;
