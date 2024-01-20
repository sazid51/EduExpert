/* eslint-disable no-unused-vars */
import InstructorSideBar from './InstructorSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function InstructorDashboard() {
  const [instructorData, setInstructorData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const instructorId = localStorage.getItem('instructorId');

  useEffect(() => {
    //Fetch current instructor data
    try {
      axios.get(baseUrl + '/instructor/' + instructorId).then((res) => {
        setInstructorData(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      axios
        .get(baseUrl + '/instructor/dashboard/' + instructorId)
        .then((res) => {
          setDashboardData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
    //End
  }, [instructorId, dashboardData]);

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <aside className="col-md-3 me-4">
          <InstructorSideBar />
        </aside>
        <section className="col-md-8">
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="box d-flex flex-column align-items-center text-dark rounded h-80 profile-box">
                {instructorData.profile_img && (
                  <img
                    src={instructorData.profile_img}
                    width="300"
                    alt=""
                    className="mt-2 mb-2"
                  />
                )}
                {!instructorData.profile_img && (
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
                {instructorData.first_name} {instructorData.last_name}
              </h4>
              <h6 className="profile-dash mt-3 ms-2">
                <i class="mailIcon bi bi-envelope"></i> {instructorData.email}
              </h6>
              <h6 className="profile-dash mt-3 ms-2">
                <i class="mailIcon bi bi-book"></i>{' '}
                {instructorData.qualification}
              </h6>
              <h6 className="profile-dash ms-2">
                <i class="mailIcon bi bi-lightbulb-fill"></i>{' '}
                {instructorData.skills}
              </h6>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-4 mb-2">
              <div className="card border-primary">
                <h5 className="card-header bg-info text-dark">
                  My Total Courses
                </h5>
                <div className="card-body">
                  <h3>{dashboardData.total_instructor_course}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card border-primary">
                <h5 className="card-header bg-info text-dark">
                  Total Enrollment
                </h5>
                <div className="card-body">
                  <h3>{dashboardData.total_instructor_student}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default InstructorDashboard;
