/* eslint-disable no-unused-vars */
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function AddCourses() {
  const [cats, setCats] = useState([]);

  const [courseData, setCourseData] = useState({
    category: '',
    title: '',
    description: '',
    f_img: '',
    price: '',
    duration: '',
  });

  // add course data
  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.files[0],
    });
  };

  const instructorId = localStorage.getItem('instructorId');

  const submitForm = () => {
    const _formData = new FormData();
    _formData.append('category', courseData.category);
    _formData.append('instructor', instructorId);
    _formData.append('title', courseData.title);
    _formData.append('description', courseData.description);
    _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
    _formData.append('techs', courseData.techs);
    _formData.append('price', courseData.price);
    _formData.append('duration', courseData.duration);

    try {
      axios
        .post(baseUrl + '/course/', _formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          Swal.fire({
            title: 'Course  Added Successfully',
            icon: 'success',
            toast: true,
            timer: 1000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.href = '/instructor-courses';
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
            <h4 className="card-header">Add Courses</h4>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="categories" class="col-sm-2 col-form-label">
                  Category
                </label>
                <div className="col-sm-10">
                  <textarea
                    name="category"
                    className="form-control"
                    onChange={handleChange}
                  ></textarea>
                  <div id="interestHelp" className="form-text">
                    Programming Language/ Web Development/ Data Science/
                    Competetive Programming etc
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="courseTitle" class="col-sm-2 col-form-label">
                  Course Title
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    class="form-control"
                    id="course-title"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="description" class="col-sm-2 col-form-label">
                  Description
                </label>
                <div className="col-sm-10">
                  <textarea
                    name="description"
                    onChange={handleChange}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="courseVideo" class="col-sm-2 col-form-label">
                  Featured Photo
                </label>
                <div class="col-sm-10">
                  <input
                    name="f_img"
                    type="file"
                    onChange={handleFileChange}
                    class="form-control"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="price" class="col-sm-2 col-form-label">
                  Approx. Duration (in hour)
                </label>
                <div class="col-sm-10">
                  <input
                    name="duration"
                    type="text"
                    onChange={handleChange}
                    class="form-control"
                    id="course-duration"
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="price" class="col-sm-2 col-form-label">
                  Price
                </label>
                <div class="col-sm-10">
                  <input
                    name="price"
                    type="text"
                    onChange={handleChange}
                    class="form-control"
                    id="course-price"
                  />
                </div>
              </div>
              <hr />
              <button
                type="button"
                onClick={submitForm}
                className="btn btn-primary"
              >
                Add Course
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddCourses;
