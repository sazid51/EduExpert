/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';

function EditChapter() {
  const [chapterData, setChapterData] = useState({
    // course: '',
    title: '',
    description: '',
    prev_video: '',
    video: '',
    remarks: '',
  });

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

  const { chapter_id } = useParams();

  const submitForm = () => {
    const _formData = new FormData();
    // _formData.append('course', chapterData.course);
    _formData.append('title', chapterData.title);
    _formData.append('description', chapterData.description);
    if (chapterData.video !== '') {
      _formData.append('video', chapterData.video, chapterData.video.name);
    }

    _formData.append('remarks', chapterData.remarks);

    try {
      axios
        .put(baseUrl + '/chapter/' + chapter_id, _formData, {
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
            window.location.href = '/edit-chapter/' + chapter_id;
          }, 1000);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios.get(baseUrl + '/chapter/' + chapter_id).then((res) => {
        setChapterData({
          // course: res.data.course,
          title: res.data.title,
          description: res.data.description,
          prev_video: res.data.video,
          remarks: res.data.remarks,
          video: '',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, [chapter_id]);

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <aside className="col-md-3">
          <InstructorSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header">Edit Chapter</h4>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="courseTitle" className="col-sm-2 col-form-label">
                  Title
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    value={chapterData.title}
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
                    value={chapterData.description}
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
                  {chapterData.prev_video && (
                    <video controls width="460" height="280" className="mt-2">
                      <source src={chapterData.prev_video} type="video/mp4" />
                    </video>
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label for="description" className="col-sm-2 col-form-label">
                  Remarks
                </label>
                <div className="col-sm-10">
                  <textarea
                    value={chapterData.remarks}
                    name="remarks"
                    onChange={handleChange}
                    className="form-control"
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

export default EditChapter;
