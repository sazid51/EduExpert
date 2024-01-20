/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './sideBar';

const baseUrl = 'http://127.0.0.1:8000/api';

function Dashboard() {
  const [studentData, setStudentData] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    //Fetch current instructor data
    try {
      axios.get(baseUrl + '/student/' + studentId).then((res) => {
        setStudentData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  console.log(studentData.first_name);

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <aside className="col-md-3 me-4">
          <SideBar />
        </aside>
        <section className="col-md-8">
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="box d-flex flex-column align-items-center text-dark rounded h-80 profile-box">
                {studentData.profile_img && (
                  <img
                    src={studentData.profile_img}
                    width="300"
                    alt=""
                    className="mt-2 mb-2"
                  />
                )}
                {!studentData.profile_img && (
                  <img
                    src="../Photos/dummy.jpg"
                    width="300"
                    alt=""
                    className="mt-2 mb-2"
                  />
                )}
              </div>
            </div>
            <div className="col-md-8 mb-2 mt-4">
              <h4 className="profile-dash">
                <i class="profileIcon bi bi-person"></i>
                {studentData.first_name} {studentData.last_name}
              </h4>
              <h6 className="profile-dash mt-3 ms-2">
                <i class="mailIcon bi bi-envelope"></i> {studentData.email}
              </h6>
              <h6 className="profile-dash ms-2">
                <i class="mailIcon bi bi-bookmark-heart-fill"></i>{' '}
                {studentData.interested_category} enthusiast
              </h6>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
