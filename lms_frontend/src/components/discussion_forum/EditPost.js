/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function EditPost() {
  const [postData, setPostData] = useState({
    body: '',
  });

  const { post_id } = useParams();

  // add course data
  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    try {
      axios.get(baseUrl + '/course-post-detail/' + post_id).then((res) => {
        setPostData({
          body: res.data.body,
        });
      });
    } catch (error) {
      console.log(error);
    }

    document.title = 'Edit Post';
  }, [post_id]);

  const submitForm = () => {
    const _formData = new FormData();
    _formData.append('body', postData.body);

    try {
      axios
        .put(baseUrl + '/course-post-detail/' + post_id, _formData)
        .then((res) => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1 mb-4">
          <div className="card ">
            <>
              <h5 className="card-header">Edit Post</h5>

              <div className="card-body post-box">
                <div className="row mb-3">
                  <div className="col-md-1">
                    <img
                      id="postPic"
                      src="../Photos/post_pic.png"
                      width=""
                      alt=""
                      className="mb-2"
                    />
                  </div>
                  <div className="col-md-11">
                    <textarea
                      name="body"
                      className="form-control"
                      onChange={handleChange}
                      value={postData.body}
                    ></textarea>
                    <br />
                    <button
                      onClick={submitForm}
                      className="btn btn-primary ms-2 mt-2 float-end"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
