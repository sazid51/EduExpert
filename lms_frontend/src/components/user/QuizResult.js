/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
const baseUrl = 'http://127.0.0.1:8000/api';

function QuizResult(props) {
  const [resultData, setResultData] = useState([]);

  //Fetch courses when page load
  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/fetch-quiz-result/${props.quiz}/${props.student}`)
        .then((res) => {
          setResultData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Quiz Result
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <table className="table">
              <thead className="text-center">
                <tr>
                  <th>Total Questions</th>
                  <th>Attempted Questions</th>
                  <th>Corrected Answer</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="text-center">
                  <td>{resultData.total_questions}</td>

                  <td>{resultData.total_attempted_questions}</td>

                  <td>{resultData.total_correct_questions}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizResult;
