/* eslint-disable no-unused-vars */
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function AddQuiz() {
  const [quizData, setQuizData] = useState({
    title: '',
    detail: '',
  });

  // add course data
  const handleChange = (e) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value,
    });
  };

  const instructorId = localStorage.getItem('instructorId');

  const submitForm = () => {
    const _formData = new FormData();
    _formData.append('instructor', instructorId);
    _formData.append('title', quizData.title);
    _formData.append('detail', quizData.detail);

    try {
      axios.post(baseUrl + '/quiz/', _formData).then((res) => {
        Swal.fire({
          title: 'Quiz  Added Successfully',
          icon: 'success',
          toast: true,
          timer: 1000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.href = '/quiz';
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <aside className="col-md-3">
          <InstructorSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header">Add Quiz</h4>
            <div className="card-body">
              <div class="mb-3 row">
                <label for="courseTitle" class="col-sm-2 col-form-label">
                  Quiz Title
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    class="form-control"
                    id="course-title"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="description" class="col-sm-2 col-form-label">
                  Details
                </label>
                <div className="col-sm-10">
                  <textarea
                    name="detail"
                    onChange={handleChange}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <hr />
              <button
                type="button"
                onClick={submitForm}
                className="btn btn-primary"
              >
                Add Quiz
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddQuiz;
