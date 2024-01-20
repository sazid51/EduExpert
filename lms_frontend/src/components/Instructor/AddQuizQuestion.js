/* eslint-disable no-unused-vars */
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function AddQuizQuestions() {
  const [questionData, setQuestionData] = useState({
    quiz: '',
    question: '',
    ans1: '',
    ans2: '',
    ans3: '',
    ans4: '',
    right_ans: '',
  });

  // add course data
  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const { quiz_id } = useParams();

  const submitForm = () => {
    const _formData = new FormData();
    _formData.append('quiz', quiz_id);
    _formData.append('question', questionData.question);
    _formData.append('ans1', questionData.ans1);
    _formData.append('ans2', questionData.ans2);
    _formData.append('ans3', questionData.ans3);
    _formData.append('ans4', questionData.ans4);
    _formData.append('right_ans', questionData.right_ans);

    try {
      axios
        .post(baseUrl + '/quiz-questions/' + quiz_id, _formData)
        .then((res) => {
          Swal.fire({
            title: 'Questions has been added',
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
    <div className="container mt-4 mb-4">
      <div className="row">
        <aside className="col-md-3">
          <InstructorSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header">Add Question</h4>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="courseTitle" className="col-sm-2 col-form-label">
                  Question
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="question"
                    onChange={handleChange}
                    className="form-control"
                    id="course-title"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="courseTitle" className="col-sm-2 col-form-label">
                  Ans1
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="ans1"
                    onChange={handleChange}
                    className="form-control"
                    id="course-title"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="courseTitle" className="col-sm-2 col-form-label">
                  Ans2
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="ans2"
                    onChange={handleChange}
                    className="form-control"
                    id="course-title"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="courseTitle" className="col-sm-2 col-form-label">
                  Ans3
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="ans3"
                    onChange={handleChange}
                    className="form-control"
                    id="course-title"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="courseTitle" className="col-sm-2 col-form-label">
                  Ans4
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="ans4"
                    onChange={handleChange}
                    className="form-control"
                    id="course-title"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="courseTitle" className="col-sm-2 col-form-label">
                  Right Answer
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="right_ans"
                    onChange={handleChange}
                    className="form-control"
                    id="course-title"
                  />
                </div>
              </div>
              <hr />
              <button
                type="button"
                onClick={submitForm}
                className="btn btn-primary"
              >
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddQuizQuestions;
