/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import QuizResult from './QuizResult';
import { Link } from 'react-router-dom';
const baseUrl = 'http://127.0.0.1:8000/api';

function CheckAttemptQuiz(props) {
  const [quizData, setQuizData] = useState([]);

  //Fetch courses when page load
  useEffect(() => {
    try {
      axios
        .get(
          `${baseUrl}/fetch-quiz-attempt-status/${props.quiz}/${props.student}`
        )
        .then((res) => {
          setQuizData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {quizData.bool === false && (
        <Link
          to={`/take-quiz/${props.quiz}`}
          className="btn btn-success mt-2"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Assign Quiz"
        >
          Take-Quiz
        </Link>
      )}
      {quizData.bool === true && (
        <>
          <span className="text-success">Attempted</span>
          <button
            type="button"
            className="btn btn-sm btn-primary ms-3"
            data-bs-toggle="modal"
            data-bs-target={`#resultModal${quizData.id}`}
          >
            Quiz Result
          </button>
          <div
            className="modal fade"
            id={`resultModal${quizData.id}`}
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <QuizResult quiz={props.quiz} student={props.student} />
          </div>
        </>
      )}
    </>
  );
}

export default CheckAttemptQuiz;
