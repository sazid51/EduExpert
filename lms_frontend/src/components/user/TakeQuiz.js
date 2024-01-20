/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import SideBar from './sideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function TakeQuiz() {
  const [questionData, setQuestionData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const { quiz_id } = useParams();

  const StudentId = localStorage.getItem('studentId');

  //Fetch Quiz question when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/quiz-questions/' + quiz_id + '/1').then((res) => {
        setQuestionData(res.data);
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

    document.title = 'Take Quiz';
  }, []);

  const submitAns = (question_id, ans) => {
    const _formData = new FormData();
    _formData.append('student', StudentId);
    _formData.append('quiz', quiz_id);
    _formData.append('question', question_id);
    _formData.append('given_ans', ans);

    try {
      axios.post(baseUrl + '/attempt-quiz/', _formData).then((res) => {
        try {
          axios
            .get(
              baseUrl +
                '/quiz-questions/' +
                quiz_id +
                '/next-question/' +
                question_id
            )
            .then((res) => {
              setQuestionData(res.data);
            });
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const prevPage = () => {
    window.history.back();
  };

  console.log(questionData);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1 mb-4">
          <h4 className="mb-3 border-bottom pb-1">{quizData.title}</h4>
          <div className="card">
            {questionData &&
              questionData.map((row, index) => (
                <>
                  <h5 className="card-header">{row.question}</h5>
                  <div className="card-body">
                    <button
                      onClick={() => submitAns(row.id, row.ans1)}
                      className="btn btn-sm mb-1 btn-secondary"
                    >
                      {row.ans1}
                    </button>
                    <br />
                    <button
                      onClick={() => submitAns(row.id, row.ans2)}
                      className="btn btn-sm mb-1 btn-secondary"
                    >
                      {row.ans2}
                    </button>
                    <br />
                    <button
                      onClick={() => submitAns(row.id, row.ans3)}
                      className="btn btn-sm mb-1 btn-secondary"
                    >
                      {row.ans3}
                    </button>
                    <br />
                    <button
                      onClick={() => submitAns(row.id, row.ans4)}
                      className="btn btn-sm btn-secondary"
                    >
                      {row.ans4}
                    </button>
                    <br />
                  </div>
                </>
              ))}
            {questionData.length === 0 && (
              <div
                className="h4 text-warning text-center fw-bold"
                style={{ marginBottom: '30vh' }}
              >
                No More Questions!!!!!!!!!! <br />
                <button
                  onClick={prevPage}
                  type="button"
                  className="btn btn-sm btn-primary mt-3"
                  style={{ marginTop: '20vh' }}
                >
                  Back To The Quiz List
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TakeQuiz;
