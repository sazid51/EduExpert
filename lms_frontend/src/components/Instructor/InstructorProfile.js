/* eslint-disable no-unused-vars */
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function InstructorProfile() {
  const [InstructorData, setInstructorData] = useState({
    first_name: '',
    last_name: '',
    prev_pimg: '',
    p_img: '',
    email: '',
    prev_pass: '',
    password: '',
    qualification: '',
    skills: '',
  });

  const instructorId = localStorage.getItem('instructorId');

  useEffect(() => {
    //Fetch current instructor data
    try {
      axios.get(baseUrl + '/instructor/' + instructorId).then((res) => {
        setInstructorData({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          prev_pimg: res.data.profile_img,
          p_img: '',
          email: res.data.email,
          prev_pass: res.data.password,
          password: '',
          qualification: res.data.qualification,
          skills: res.data.skills,
        });
      });
    } catch (error) {
      console.log(error);
    }
    //End
  }, [instructorId]);

  const handleChange = (e) => {
    setInstructorData({
      ...InstructorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setInstructorData({
      ...InstructorData,
      [e.target.name]: e.target.files[0],
    });
  };

  const submitForm = () => {
    const InstructorFormData = new FormData();
    InstructorFormData.append('first_name', InstructorData.first_name);
    InstructorFormData.append('last_name', InstructorData.last_name);
    if (InstructorData.p_img !== '') {
      InstructorFormData.append(
        'profile_img',
        InstructorData.p_img,
        InstructorData.p_img.name
      );
    }
    InstructorFormData.append('email', InstructorData.email);
    if (InstructorData.password !== '') {
      InstructorFormData.append('password', InstructorData.password);
    }
    if (InstructorData.password === '') {
      InstructorFormData.append('password', InstructorData.prev_pass);
    }
    InstructorFormData.append('qualification', InstructorData.qualification);
    InstructorFormData.append('skills', InstructorData.skills);

    try {
      axios
        .put(baseUrl + '/instructor/' + instructorId, InstructorFormData, {
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
            window.location.href = '/instructor-dashboard';
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
    document.title = 'Instructor Profile';
  });

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <aside className="col-md-3">
          <InstructorSideBar />
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
                    value={InstructorData.first_name}
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
                    value={InstructorData.last_name}
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
                  {InstructorData.prev_pimg && (
                    <img
                      src={InstructorData.prev_pimg}
                      width="300"
                      alt=""
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
              <div class="mb-3 row">
                <label for="qualification" class="col-sm-2 col-form-label">
                  Qualification
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="qualification"
                    value={InstructorData.qualification}
                    onChange={handleChange}
                    class="form-control"
                    id="skill"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="LName" class="col-sm-2 col-form-label">
                  Skills
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="skills"
                    value={InstructorData.skills}
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
                    value={InstructorData.email}
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
                    value={InstructorData.prev_pass}
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
