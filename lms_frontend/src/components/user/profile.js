/* eslint-disable no-unused-vars */
import SideBar from './sideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function StudentProfile() {
  const [studentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    prev_pimg: '',
    p_img: '',
    email: '',
    prev_pass: '',
    password: '',
    interests: '',
  });

  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    //Fetch current student data
    try {
      axios.get(baseUrl + '/student/' + studentId).then((res) => {
        setStudentData({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          prev_pimg: res.data.profile_img,
          p_img: '',
          email: res.data.email,
          prev_pass: res.data.password,
          password: '',
          interests: res.data.interested_category,
        });
      });
    } catch (error) {
      console.log(error);
    }
    //End
  }, [studentId]);

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.files[0],
    });
  };

  const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append('first_name', studentData.first_name);
    studentFormData.append('last_name', studentData.last_name);
    if (studentData.p_img !== '') {
      studentFormData.append(
        'profile_img',
        studentData.p_img,
        studentData.p_img.name
      );
    }
    studentFormData.append('email', studentData.email);
    if (studentData.password !== '') {
      studentFormData.append('password', studentData.password);
    }
    if (studentData.password === '') {
      studentFormData.append('password', studentData.prev_pass);
    }
    studentFormData.append('interested_category', studentData.interests);

    try {
      axios
        .put(baseUrl + '/student/' + studentId, studentFormData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((response) => {
          Swal.fire({
            title: 'Profile Updated',
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
        });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Something Error Occured',
        icon: 'error',
        toast: true,
        timer: 1000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  useEffect(() => {
    document.title = 'student Profile';
  });

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <aside className="col-md-3">
          <SideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header">Your Profile</h4>
            <div className="card-body">
              <div class="mb-3 row">
                <label for="FName" class="col-sm-2 col-form-label">
                  First Name
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="first_name"
                    value={studentData.first_name}
                    onChange={handleChange}
                    class="form-control"
                    id="FName"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="LName" class="col-sm-2 col-form-label">
                  Last Name
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="last_name"
                    value={studentData.last_name}
                    onChange={handleChange}
                    class="form-control"
                    id="LName"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="profilePhoto" class="col-sm-2 col-form-label">
                  Profile Photo
                </label>
                <div class="col-sm-10 mt-2">
                  <input
                    name="p_img"
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                  {studentData.prev_pimg && (
                    <img
                      src={studentData.prev_pimg}
                      width="300"
                      alt=""
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
              <div class="mb-3 row">
                <label for="qualification" class="col-sm-2 col-form-label">
                  Interests
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="interests"
                    value={studentData.interests}
                    onChange={handleChange}
                    class="form-control"
                    id="skill"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">
                  Email
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="email"
                    value={studentData.email}
                    onChange={handleChange}
                    class="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">
                  Old Password
                </label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    value={studentData.prev_pass}
                    onChange={handleChange}
                    class="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">
                  Change Password
                </label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    class="form-control"
                    id="inputPassword"
                    placeholder="Enter a New Password"
                  />
                </div>
              </div>
              <hr />
              <button onClick={submitForm} className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
