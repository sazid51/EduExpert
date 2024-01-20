/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const baseUrl = 'http://127.0.0.1:8000/api';

function CheckQuizCourse(props) {
  const [quizData, setQuizData] = useState([]);

  const instructorId = localStorage.getItem('instructorId');

  //Fetch courses when page load
  useEffect(() => {
    try {
      axios
        .get(
          `${baseUrl}/fetch-quiz-assign-status/${props.quiz}/${props.course}`
        )
        .then((res) => {
          setQuizData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const assignQuiz = (quiz_id) => {
    const _formData = new FormData();
    _formData.append('course', props.course);
    _formData.append('quiz', props.quiz);
    _formData.append('instructor', instructorId);
    try {
      axios.post(baseUrl + '/quiz-assign-course/', _formData).then((res) => {
        Swal.fire({
          title: 'Quiz Assigned Successfully',
          icon: 'success',
          toast: true,
          timer: 1000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {quizData.bool === false && (
        <button
          onClick={() => assignQuiz(props.quiz)}
          className="btn btn-success mt-2"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Assign Quiz"
        >
          <i class="bi bi-check2-square"></i>
        </button>
      )}
      {quizData.bool === true && (
        <>
          {/* {' '}
          <span className="text-success btn btn-secondary text-white me-3">
            Assigned
          </span> */}
          <Link to={`/attempted-students/` + props.quiz} className="text-info">
            See Attempted Students
          </Link>
        </>
      )}
    </>
  );
}

export default CheckQuizCourse;
