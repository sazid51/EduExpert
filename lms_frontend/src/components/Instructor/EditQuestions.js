/* eslint-disable no-unused-vars */
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function EditQuestion() {
  const [questionData, setQuestionData] = useState({
    // quiz: '',
    question: '',
    ans1: '',
    ans2: '',
    ans3: '',
    ans4: '',
    right_ans: '',
  });
  const { question_id } = useParams();

  useEffect(() => {
    try {
      axios.get(baseUrl + '/questions/' + question_id).then((res) => {
        setQuestionData({
          //   quiz: res.data.quiz,
          question: res.data.question,
          ans1: res.data.ans1,
          ans2: res.data.ans2,
          ans3: res.data.ans3,
          ans4: res.data.ans4,
          right_ans: res.data.right_ans,
        });
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [question_id]);

  const handleChange = (e) => {
    setQuestionData({
      ...questionData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    const _formData = new FormData();
    // _formData.append('quiz', questionData.quiz);
    _formData.append('question', questionData.question);
    _formData.append('ans1', questionData.ans1);
    _formData.append('ans2', questionData.ans2);
    _formData.append('ans3', questionData.ans3);
    _formData.append('ans4', questionData.ans4);
    _formData.append('right_ans', questionData.right_ans);

    try {
      axios
        .put(baseUrl + '/questions/' + question_id, _formData)
        .then((res) => {
          Swal.fire({
            title: 'Questions has been updated',
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
            <h4 className="card-header">Edit Question</h4>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="courseTitle" className="col-sm-2 col-form-label">
                  Question
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="question"
                    value={questionData.question}
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
                    value={questionData.ans1}
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
                    value={questionData.ans2}
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
                    value={questionData.ans3}
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
                    value={questionData.ans4}
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
                    value={questionData.right_ans}
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

export default EditQuestion;
