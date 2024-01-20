/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Reply() {
  const [postData, setPostData] = useState([]);
  const [replyData, setReplyData] = useState([]);
  const [bodyData, setBodyData] = useState({
    body: '',
  });

  const [studentLoginStatus, setStudentLoginStatus] = useState();
  const [instructorLoginStatus, setInstructorLoginStatus] = useState();
  const [studentData, setStudentData] = useState([]);
  const [instructorData, setInstructorData] = useState([]);

  const { post_id } = useParams();

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
      axios.get(baseUrl + '/post/' + post_id).then((res) => {
        setPostData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + '/post-reply/' + post_id).then((res) => {
        setReplyData(res.data);
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

    document.title = 'Reply : Discussion Forum';
  }, [post_id, StudentId, InstructorId]);

  const submitForm = () => {
    const _formData = new FormData();
    _formData.append('post', post_id);
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
      axios.post(baseUrl + '/post-reply/' + post_id, _formData).then((res) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Sweet alert for Delete Course
  const handleClickDel = (reply_id) => {
    try {
      axios.delete(baseUrl + '/post-reply-detail/' + reply_id).then((res) => {
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
          <div className="card ">
            <>
              <div className="card-header">
                <h5 className="font-style">Replies</h5>
              </div>
              <div className="card-body post-box">
                <div className="row mb-3">
                  <div className="col-md-1 post-box">
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
                      {postData.name}{' '}
                      <p className="h6 ms-2 text-sm badge bg-secondary">
                        {postData.time}
                      </p>
                    </h6>
                    <p className="shadow-none bg-light rounded">
                      {postData.body}
                    </p>
                  </div>
                </div>
                {replyData.map((row, index) => (
                  <div className="row mb-3 ms-5">
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
                      <p className="shadow-none bg-light p-1 rounded">
                        {row.body}
                      </p>
                      <div className="d-flex flex-row">
                        {(instructorData.id === row.uniq_id ||
                          studentData.id === row.uniq_id) && (
                          <>
                            <Link
                              to={`/edit-reply/` + row.id}
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
                      </div>
                    </div>
                  </div>
                ))}
                <div className="">
                  <textarea
                    onChange={handleChange}
                    name="body"
                    className="form-control border border-secondary"
                  ></textarea>
                </div>
                <button
                  onClick={submitForm}
                  className="btn btn-primary ms-2 mt-2 float-end"
                >
                  Reply
                </button>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reply;
