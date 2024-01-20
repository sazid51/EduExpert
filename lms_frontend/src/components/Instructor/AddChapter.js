/* eslint-disable no-unused-vars */
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function AddChapter() {
  const [chapterData, setChapterData] = useState({
    title: '',
    description: '',
    video: '',
    remarks: '',
  });

  // add course data
  const handleChange = (e) => {
    setChapterData({
      ...chapterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setChapterData({
      ...chapterData,
      [e.target.name]: e.target.files[0],
    });
  };

  const { course_id } = useParams();

  const submitForm = () => {
    const _formData = new FormData();
    _formData.append('course', course_id);
    _formData.append('title', chapterData.title);
    _formData.append('description', chapterData.description);
    _formData.append('video', chapterData.video, chapterData.video.name);
    _formData.append('remarks', chapterData.remarks);

    try {
      axios
        .post(baseUrl + '/course-chapters/' + course_id, _formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          Swal.fire({
            title: 'Chapter has been added',
            icon: 'success',
            toast: true,
            timer: 1000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
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
            <h4 className="card-header">Add Chapter</h4>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="courseTitle" className="col-sm-2 col-form-label">
                  Title
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
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
                    name="description"
                    onChange={handleChange}
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="courseVideo" className="col-sm-2 col-form-label">
                  Video
                </label>
                <div className="col-sm-10">
                  <input
                    type="file"
                    name="video"
                    onChange={handleFileChange}
                    className="form-control"
                    id="LName"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="description" className="col-sm-2 col-form-label">
                  Remarks
                </label>
                <div className="col-sm-10">
                  <textarea
                    name="remarks"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="This video is focused on basic Introduction"
                  ></textarea>
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

export default AddChapter;
