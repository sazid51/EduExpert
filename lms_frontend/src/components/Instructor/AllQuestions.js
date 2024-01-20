/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function AllQuestions() {
  const [questionData, setQuestionData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [totalQuiz, setTotalQuiz] = useState(0);
  const { quiz_id } = useParams();

  //Fetch question when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/quiz-questions/' + quiz_id).then((res) => {
        setQuestionData(res.data);
        setTotalQuiz(res.data.length);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + '/quiz/' + quiz_id).then((res) => {
        setQuizData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [quiz_id]);

  // Sweet alert for Delete question
  const handleClickDel = (question_id) => {
    Swal.fire({
      title: 'Confirm',
      text: 'Are You Sure You Want to Delete This Question?',
      icon: 'info',
      confirmButtonText: 'Continue',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + '/question/' + question_id).then((res) => {
            Swal.fire('Success', 'question has been deleted.');
            try {
              axios.get(baseUrl + '/quiz-questions/' + quiz_id).then((res) => {
                setQuestionData(res.data);
                setTotalQuiz(res.data.length);
              });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (err) {
          Swal.fire('Error!!!', 'question has not been deleted!');
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
            <h4 className="card-header bg-info text-dark text-center">
              {quizData.title}
            </h4>
            <h4 className="card-header">
              All the questions of this quiz ({totalQuiz}){' '}
              <Link
                className="btn btn-success btn-md float-end"
                to={'/add-question/' + quiz_id}
                style={{ color: '#fff' }}
              >
                Add Question
              </Link>
            </h4>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th>Question Title</th>
                    <th>Right Answer</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {questionData.map((questionRow, index) => (
                    <tr>
                      <td>
                        <Link to={'/edit-question/' + questionRow.id}>
                          {questionRow.question}
                        </Link>
                      </td>
                      <td>{questionRow.right_ans}</td>
                      <td>
                        <Link
                          to={'/edit-question/' + questionRow.id}
                          className="btn btn-info mt-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit the question"
                        >
                          <i class="bi bi-pencil-square"></i>
                        </Link>
                        <button
                          onClick={() => handleClickDel(questionRow.id)}
                          className="btn btn-danger ms-2 mt-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Delete the question"
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
