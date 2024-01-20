/* eslint-disable new-parens */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api/instructor/';

function InstructorRegister() {
  const [InstructorData, setInstructorData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    qualification: '',
    skills: '',
    status: '',
  });

  const handleChange = (e) => {
    setInstructorData({
      ...InstructorData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    const InstructorFormData = new FormData();
    InstructorFormData.append('first_name', InstructorData.first_name);
    InstructorFormData.append('last_name', InstructorData.last_name);
    InstructorFormData.append('email', InstructorData.email);
    InstructorFormData.append('password', InstructorData.password);
    InstructorFormData.append('qualification', InstructorData.qualification);
    InstructorFormData.append('skills', InstructorData.skills);

    try {
      axios.post(baseUrl, InstructorFormData).then((response) => {
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
          window.location.href = '/instructor-login/';
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
        window.location.href = '/instructor-login/';
      }, 2000);
    }
  };

  const instructorLoginStatus = localStorage.getItem('instructorLoginStatus');
  if (instructorLoginStatus === 'true') {
    window.location.href = '/instructor-dashboard';
  }

  useEffect(() => {
    document.title = 'Instructor Registration';
  });

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1">
          <div className="card">
            <h5 className="card-header bg-primary text-light">
              Instructor Registration
            </h5>
            <div className="card-body">
              {/* <form> */}
              <div className="mb-3">
                <label for="InputFName" className="form-label">
                  First Name
                </label>
                <input
                  value={InstructorData.first_name}
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
                  value={InstructorData.last_name}
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
                  value={InstructorData.email}
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
                  value={InstructorData.password}
                  type="password"
                  onChange={handleChange}
                  name="password"
                  className="form-control"
                  id="InputPassword"
                />
              </div>
              <div className="mb-3">
                <label for="InputInterest" className="form-label">
                  Qualification
                </label>
                <textarea
                  value={InstructorData.qualification}
                  onChange={handleChange}
                  name="qualification"
                  className="form-control"
                ></textarea>
              </div>
              <div className="mb-3">
                <label for="InputInterest" className="form-label">
                  Skills
                </label>
                <textarea
                  value={InstructorData.skills}
                  onChange={handleChange}
                  name="skills"
                  className="form-control"
                ></textarea>
                <div id="interestHelp" className="form-text">
                  Python, Data Structure, Competetive Programming etc
                </div>
              </div>
              <button
                onClick={submitForm}
                type="submit"
                className="btn btn-primary"
              >
                Register
              </button>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorRegister;
