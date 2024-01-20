/* eslint-disable new-parens */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';
function Login() {
  const [StudentLoginData, setStudentLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setStudentLoginData({
      ...StudentLoginData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    console.log(StudentLoginData);
    const StudentFormData = new FormData();
    StudentFormData.append('email', StudentLoginData.email);
    StudentFormData.append('password', StudentLoginData.password);

    try {
      axios.post(baseUrl + '/student-login', StudentFormData).then((res) => {
        if (res.data.bool === true) {
          localStorage.setItem('studentLoginStatus', true);
          localStorage.setItem('studentId', res.data.student_id);
          Swal.fire({
            title: 'Login Successful',
            icon: 'success',
            toast: true,
            timer: 1000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.href = '/student-dashboard';
          }, 1000);
        } else {
          Swal.fire({
            title: 'Error!!!',
            text: 'Invalid Email or Password',
            icon: 'error',
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const studentLoginStatus = localStorage.getItem('studentLoginStatus');
  if (studentLoginStatus === 'true') {
    window.location.href = '/student-dashboard';
  }

  useEffect(() => {
    document.title = 'Student Login';
  });

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1">
          <div className="card">
            <h5 className="card-header bg-primary text-light">Student Login</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputEmail1"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              {/* <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
                  Remember Me
                </label>
              </div> */}

              <button
                type="submit"
                onClick={submitForm}
                className="btn btn-primary"
              >
                Login
              </button>
              <hr />
              <p className="text-dark fw-bold">
                Don't have an account?{' '}
                <Link
                  to="/student-register"
                  className="text-success fw-normal fst-italic"
                >
                  Click Here
                </Link>
              </p>
            </div>
          </div
        </div>
      </div>
    </div>
  );
}

export default Login;
