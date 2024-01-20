/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Post() {
  const [courseData, setCourseData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [bodyData, setBodyData] = useState({
    body: '',
  });

  const [studentLoginStatus, setStudentLoginStatus] = useState();
  const [instructorLoginStatus, setInstructorLoginStatus] = useState();
  const [studentData, setStudentData] = useState([]);
  const [instructorData, setInstructorData] = useState([]);

  const { course_id } = useParams();

  const StudentId = localStorage.getItem('studentId');
  const InstructorId = localStorage.getItem('instructorId');

  // add course data
  const handleChange = (e) => {
    setBodyData({
      ...bodyData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    try {
      axios.get(baseUrl + '/course/' + course_id).then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + '/course-post/' + course_id).then((res) => {
        setPostData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus === 'true') {
      setStudentLoginStatus('success');
      try {
        axios.get(baseUrl + '/student/' + StudentId).then((res) => {
          setStudentData(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }

    const instructorLoginStatus = localStorage.getItem('instructorLoginStatus');
    if (instructorLoginStatus === 'true') {
      setInstructorLoginStatus('success');
      try {
        axios.get(baseUrl + '/instructor/' + InstructorId).then((res) => {
          setInstructorData(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }

    document.title = 'Discussion Forum';
  }, [course_id, StudentId, InstructorId]);

  const submitForm = () => {
    const _formData = new FormData();
    _formData.append('course', course_id);
    if (studentLoginStatus === 'success') {
      _formData.append(
        'name',
        studentData.first_name + ' ' + studentData.last_name
      );
      _formData.append('uniq_id', StudentId);
    } else if (instructorLoginStatus === 'success') {
      _formData.append(
        'name',
        instructorData.first_name +
          ' ' +
          instructorData.last_name +
          ' (Instructor)'
      );
      _formData.append('uniq_id', InstructorId);
    }
    _formData.append('body', bodyData.body);
    console.log(_formData);

    try {
      console.log(_formData);
      axios
        .post(baseUrl + '/course-post/' + course_id, _formData)
        .then((res) => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Sweet alert for Delete Course
  const handleClickDel = (post_id) => {
    try {
      axios.delete(baseUrl + '/course-post-detail/' + post_id).then((res) => {
        window.location.reload();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1 mb-4">
          <div className="card">
            <h4 className="card-header">
              Discussion Forum for{' '}
              <span className="text-info">({courseData.title})</span>
            </h4>
            <div className="card-body">
              <div className="font-style">
                <textarea
                  onChange={handleChange}
                  name="body"
                  className="form-control border border-secondary"
                  placeholder="Ask your problem..."
                ></textarea>
              </div>
              <button
                onClick={submitForm}
                className="btn btn-primary ms-2 mt-2"
              >
                Post
              </button>
            </div>
          </div>
          <div className="card ">
            <>
              <h5 className="card-header font-style">Posts</h5>

              <div className="card-body post-box">
                {postData.map((row, index) => (
                  <div className="row mb-3">
                    <div className="col-md-1">
                      <img
                        id="postPic"
                        src="../Photos/post_pic.png"
                        width=""
                        alt=""
                        className="mb-2"
                      />
                    </div>
                    <div className="col-md-11">
                      <h6 className="fw-bold">
                        {row.name}{' '}
                        <p className="h6 ms-2 text-sm badge bg-secondary">
                          {row.time}
                        </p>
                      </h6>
                      <p className="shadow-none bg-light rounded">{row.body}</p>
                      <div className="d-flex flex-row">
                        {(instructorData.id === row.uniq_id ||
                          studentData.id === row.uniq_id) && (
                          <>
                            <Link
                              to={`/edit-post/` + row.id}
                              className="text-primary me-3 font-style"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleClickDel(row.id)}
                              className="me-3 text-primary border-0 bg-white font-style"
                            >
                              Delete
                            </button>
                          </>
                        )}
                        <Link
                          to={`/post-reply/` + row.id}
                          className="me-3 text-primary font-style"
                        >
                          Reply
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
