/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import SideBar from './sideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function TakeQuiz1() {
  const [questionData, setQuestionData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [givenAns, setGivenAns] = useState([]);
  const { quiz_id } = useParams();

  const StudentId = localStorage.getItem('studentId');

  //Fetch Quiz question when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/quiz-questions/' + quiz_id).then((res) => {
        setQuestionData(res.data);
        console.log(res.data);
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

  const _formData = new FormData();
  const handleOption = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    if (e.target.checked) {
      const filteredArray = givenAns.filter(
        (item) => item.question !== e.target.name
      );
      setGivenAns([
        ...filteredArray,
        {
          StudentId: StudentId * 1,
          question: e.target.name * 1,
          given_ans: e.target.value,
        },
      ]);
      // _formData.append('student', StudentId);
      // _formData.append('question', e.target.name);
      // _formData.append('given_ans', e.target.value);
    } else {
      const filteredArray = givenAns.filter(
        (item) => item.question !== e.target.name
      );
      setGivenAns(filteredArray);
      // _formData.delete('student', StudentId);
      // _formData.delete('question', e.target.name);
      // _formData.delete('given_ans', e.target.value);
    }
  };

  const submitAns = () => {
    console.log(givenAns);
    try {
      axios.post(baseUrl + '/attempt-quiz/', { givenAns });
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1 mb-4">
          <h4 className="mb-3 border-bottom pb-1">{quizData.title}</h4>
          <div className="card">
            {questionData.map((row, index) => (
              <>
                <h5 className="card-header">{row.question}</h5>
                <div className="card-body">
                  {/* <button
                    onClick={() => handleOption(row.id, row.ans1)}
                    className="btn btn-sm mb-1 btn-secondary"
                  >
                    1
                  </button> */}
                  <input
                    onChange={handleOption}
                    type="radio"
                    name={row.id}
                    value={row.ans1}
                  />
                  <span className="ms-3">{row.ans1}</span>
                  <br />
                  {/* <button
                    onClick={() => handleOption(row.id, row.ans2)}
                    className="btn btn-sm mb-1 btn-secondary"
                  >
                    2
                  </button> */}
                  <input
                    onChange={handleOption}
                    type="radio"
                    name={row.id}
                    value={row.ans2}
                  />
                  <span className="ms-3">{row.ans2}</span>
                  <br />
                  {/* <button
                    onClick={() => handleOption(row.id, row.ans3)}
                    className="btn btn-sm mb-1 btn-secondary"
                  >
                    3
                  </button> */}
                  <input
                    onChange={handleOption}
                    type="radio"
                    name={row.id}
                    value={row.ans3}
                  />
                  <span className="ms-3">{row.ans3}</span>
                  <br />
                  {/* <button
                    onClick={() => handleOption(row.id, row.ans4)}
                    className="btn btn-sm btn-secondary"
                  >
                    4
                  </button> */}
                  <input
                    onChange={handleOption}
                    type="radio"
                    name={row.id}
                    value={row.ans4}
                  />
                  <span className="ms-3">{row.ans4}</span>
                  <br />
                </div>
              </>
            ))}
            <div>
              {/* <button className="btn btn-dark btn-sm ms-2 mb-2">Skip</button> */}
              <button
                onClick={submitAns}
                className="btn btn-primary btn-sm ms-2 mb-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TakeQuiz1;
