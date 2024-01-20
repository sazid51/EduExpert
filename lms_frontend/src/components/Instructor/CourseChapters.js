/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function CourseChapters() {
  const [chapterData, setChapterData] = useState([]);
  const [CourseData, setCourseData] = useState([]);
  const [totalChapter, setTotalChapter] = useState(0);
  const { course_id } = useParams();

  //Fetch chapter when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/course-chapters/' + course_id).then((res) => {
        setChapterData(res.data);
        setTotalChapter(res.data.length);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios.get(baseUrl + '/course/' + course_id).then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [course_id]);

  // Sweet alert for Delete Chapter
  const handleClickDel = (chapter_id) => {
    Swal.fire({
      title: 'Confirm',
      text: 'Are You Sure You Want to Delete This Chapter?',
      icon: 'info',
      confirmButtonText: 'Continue',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(baseUrl + '/chapter/' + chapter_id).then((res) => {
            Swal.fire('Success', 'Chapter has been deleted.');
            try {
              axios
                .get(baseUrl + '/course-chapters/' + course_id)
                .then((res) => {
                  setChapterData(res.data);
                  setTotalChapter(res.data.length);
                });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (err) {
          Swal.fire('Error!!!', 'Chapter has not been deleted!');
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <InstructorSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <div className="card-header text-dark">
              <h4>
                Course: {CourseData.title}
                <span className="float-end h5">
                  <Link to={`/course-post/` + CourseData.id}>
                    (Discussion Forum)
                  </Link>
                </span>
              </h4>
            </div>
            <h4 className="card-header">
              All the Chapters of this course ({totalChapter}){' '}
              <Link
                className="btn btn-success btn-md float-end"
                to={'/add-chapter/' + course_id}
                style={{ color: '#fff' }}
              >
                Add Chapter
              </Link>
            </h4>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th>Chapter Title</th>
                    <th>Video</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {chapterData.map((chapter, index) => (
                    <tr>
                      <td>
                        <Link to={'/edit-chapter/' + chapter.id}>
                          {chapter.title}
                        </Link>
                      </td>
                      <td>
                        <video controls width="250">
                          <source src={chapter.video} type="video/mp4" />
                          Sorry, Your Browser doesn't Support Embedded video.
                        </video>
                      </td>
                      <td>
                        <Link
                          to={'/edit-chapter/' + chapter.id}
                          className="btn btn-info mt-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit the Chapter"
                        >
                          <i class="bi bi-pencil-square"></i>
                        </Link>
                        <button
                          onClick={() => handleClickDel(chapter.id)}
                          className="btn btn-danger ms-2 mt-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Delete the Chapter"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
