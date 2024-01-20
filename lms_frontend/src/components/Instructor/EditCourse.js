/* eslint-disable no-unused-vars */
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function EditCourse() {
  const [courseData, setCourseData] = useState({
    category: '',
    title: '',
    description: '',
    prev_fimg: '',
    f_img: '',
    price: '',
    duration: '',
  });

  const { course_id } = useParams();

  useEffect(() => {
    //Fetch current course data
    try {
      axios
        .get(baseUrl + '/instructor-course-detail/' + course_id)
        .then((res) => {
          setCourseData({
            category: res.data.category,
            title: res.data.title,
            description: res.data.description,
            prev_fimg: res.data.featured_img,
            f_img: '',
            price: res.data.price,
            duration: res.data.duration,
          });
        });
    } catch (error) {
      console.log(error);
    }
    //End
  }, [course_id]);

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
    if (courseData.f_img !== '') {
      _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
    }

    _formData.append('price', courseData.price);
    _formData.append('duration', courseData.duration);

    try {
      axios
        .put(baseUrl + '/instructor-course-detail/' + course_id, _formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          Swal.fire({
            title: 'Data has been updated',
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
            <h4 className="card-header">Edit Course</h4>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="technologies" className="col-sm-2 col-form-label">
                  Category
                </label>
                <div className="col-sm-10">
                  <textarea
                    name="category"
                    value={courseData.category}
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Web Development | Data Science | Cyber Security"
                  ></textarea>
                  <div id="interestHelp" className="form-text">
                    Programming Language/ Web Development/ Data Science/
                    Competetive Programming etc
                  </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="courseTitle" className="col-sm-2 col-form-label">
                  Course Title
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    value={courseData.title}
                    name="title"
                    onChange={handleChange}
                    className="form-control"
                    id="course-title"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="description" className="col-sm-2 col-form-label">
                  Description
                </label>
                <div className="col-sm-10">
                  <textarea
                    value={courseData.description}
                    name="description"
                    onChange={handleChange}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="courseVideo" className="col-sm-2 col-form-label">
                  Featured Image
                </label>
                <div className="col-sm-10 mt-2">
                  <input
                    name="f_img"
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                  {courseData.prev_fimg && (
                    <img
                      src={courseData.prev_fimg}
                      width="300"
                      alt=""
                      className="mt-2"
                    />
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label for="price" className="col-sm-2 col-form-label">
                  Approx. Duration (in hour)
                </label>
                <div className="col-sm-10">
                  <input
                    name="duration"
                    value={courseData.duration}
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                    id="course-duration"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="price" className="col-sm-2 col-form-label">
                  Price
                </label>
                <div className="col-sm-10">
                  <input
                    name="price"
                    value={courseData.price}
                    type="text"
                    onChange={handleChange}
                    className="form-control"
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
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditCourse;
