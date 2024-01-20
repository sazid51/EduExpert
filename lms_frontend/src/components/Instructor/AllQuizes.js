/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';

function AllQuizes() {
  const [quizData, setQuizData] = useState([]);

  const instructorId = localStorage.getItem('instructorId');

  //Fetch courses when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/instructor-quiz/' + instructorId).then((res) => {
        setQuizData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [instructorId]);

  // Sweet alert for Delete Course
  const handleClickDel = (quiz_id) => {
    Swal.fire({
      title: 'Confirm',
      text: 'Are You Sure You Want to Delete This Quiz?',
      icon: 'info',
      confirmButtonText: 'Continue',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + '/quiz/' + quiz_id).then((res) => {
            Swal.fire('Success', 'Quiz has been deleted.');
            try {
              axios
                .get(baseUrl + '/instructor-quiz/' + instructorId)
                .then((res) => {
                  setQuizData(res.data);
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
            <h4 className="card-header">
              All Quizes
              <Link
                className="btn btn-success btn-md float-end"
                to={'/add-quiz/'}
                style={{ color: '#fff' }}
              >
                Add Quiz
              </Link>
            </h4>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th>Quiz Name</th>
                    <th>Action</th>
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
                        <Link
                          to={'/edit-quiz/' + quiz.id}
                          className="btn btn-info mt-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit the Quiz"
                        >
                          <i class="bi bi-pencil-square"></i>
                        </Link>

                        <button
                          onClick={() => handleClickDel(quiz.id)}
                          className="btn btn-danger ms-2 mt-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Delete the quiz"
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

export default AllQuizes;
