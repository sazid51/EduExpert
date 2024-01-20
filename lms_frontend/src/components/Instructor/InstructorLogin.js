/* eslint-disable new-parens */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';
function InstructorLogin() {
  const [InstructorLoginData, setInstructorLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInstructorLoginData({
      ...InstructorLoginData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    console.log(InstructorLoginData);
    const instructorFormData = new FormData();
    instructorFormData.append('email', InstructorLoginData.email);
    instructorFormData.append('password', InstructorLoginData.password);

    try {
      axios
        .post(baseUrl + '/instructor-login', instructorFormData)
        .then((res) => {
          if (res.data.bool === true) {
            localStorage.setItem('instructorLoginStatus', true);
            localStorage.setItem('instructorId', res.data.instructor_id);
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
              window.location.href = '/instructor-dashboard';
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

  const instructorLoginStatus = localStorage.getItem('instructorLoginStatus');
  if (instructorLoginStatus === 'true') {
    window.location.href = '/instructor-dashboard';
  }

  useEffect(() => {
    document.title = 'Instructor Login';
  });

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1">
          <div className="card">
            <h5 className="card-header bg-primary text-light">
              Instructor Login
            </h5>
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
                Want to be an Instructor?{' '}
                <Link
                  to="/instructor-register"
                  className="text-success fw-normal fst-italic"
                >
                  Click Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorLogin;
