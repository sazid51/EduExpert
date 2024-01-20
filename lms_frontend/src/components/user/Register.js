/* eslint-disable new-parens */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api/student/';

function Register() {
  const [StudentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    interested_category: '',
  });

  const handleChange = (e) => {
    setStudentData({
      ...StudentData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    const StudentFormData = new FormData();
    StudentFormData.append('first_name', StudentData.first_name);
    StudentFormData.append('last_name', StudentData.last_name);
    StudentFormData.append('email', StudentData.email);
    StudentFormData.append('password', StudentData.password);
    StudentFormData.append(
      'interested_category',
      StudentData.interested_category
    );

    try {
      axios.post(baseUrl, StudentFormData).then((response) => {
        Swal.fire({
          title: 'Thanks for your Registration',
          icon: 'success',
          toast: true,
          timer: 2000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.href = '/student-login/';
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Something Error Occured',
        icon: 'error',
        toast: true,
        timer: 2000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.href = '/student-login/';
      }, 2000);
    }
  };

  const studentLoginStatus = localStorage.getItem('studentLoginStatus');
  if (studentLoginStatus === 'true') {
    window.location.href = '/student-dashboard';
  }

  useEffect(() => {
    document.title = 'Student Registration';
  });

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1">
          <div className="card">
            <h5 className="card-header bg-primary text-light">
              Student Registration
            </h5>
            <div className="card-body">
              {/* <form> */}
              <div className="mb-3">
                <label for="InputFName" className="form-label">
                  First Name
                </label>
                <input
                  value={StudentData.first_name}
                  onChange={handleChange}
                  name="first_name"
                  type="text"
                  className="form-control"
                  id="InputFName"
                />
              </div>
              <div className="mb-3">
                <label for="InputLName" className="form-label">
                  Last Name
                </label>
                <input
                  value={StudentData.last_name}
                  type="text"
                  onChange={handleChange}
                  name="last_name"
                  className="form-control"
                  id="InputLName"
                />
              </div>
              <div className="mb-3">
                <label for="InputEmail" className="form-label">
                  Email
                </label>
                <input
                  value={StudentData.email}
                  type="email"
                  onChange={handleChange}
                  name="email"
                  className="form-control"
                  id="InputEmail"
                />
              </div>
              <div className="mb-3">
                <label for="InputPassword" className="form-label">
                  Password
                </label>
                <input
                  value={StudentData.password}
                  type="password"
                  onChange={handleChange}
                  name="password"
                  className="form-control"
                  id="InputPassword"
                />
              </div>
              <div className="mb-3">
                <label for="InputInterest" className="form-label">
                  Interest
                </label>
                <textarea
                  value={StudentData.interested_category}
                  onChange={handleChange}
                  name="interested_category"
                  className="form-control"
                ></textarea>
                <div id="interestHelp" className="form-text">
                  Python, Data Structure, Competetive Programming etc
                </div>
              </div>
              <hr />
              <button
                onClick={submitForm}
                type="submit"
                className="btn btn-primary"
              >
                Register
              </button>
            </div>

            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
