/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
const baseUrl = 'http://127.0.0.1:8000/api';

function Navbar() {
  const [studentData, setStudentData] = useState([]);
  const [instructorData, setInstructorData] = useState([]);

  const instructorLoginStatus = localStorage.getItem('instructorLoginStatus');
  const studentLoginStatus = localStorage.getItem('studentLoginStatus');

  const [searchString, setsearchString] = useState({
    search: '',
  });

  const handleChange = (event) => {
    setsearchString({
      ...searchString,
      [event.target.name]: event.target.value,
    });
  };
  const searchCourse = () => {
    if (searchString.search !== '') {
      window.location.href = '/search/' + searchString.search;
    }
  };

  //Fetch courses when page load
  useEffect(() => {
    if (studentLoginStatus === 'true') {
      const studentId = localStorage.getItem('studentId');
      console.log(studentId);
      try {
        axios.get(baseUrl + '/student/' + studentId).then((res) => {
          setStudentData(res.data);
          console.log(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (instructorLoginStatus === 'true') {
      const instructorId = localStorage.getItem('instructorId');
      try {
        axios.get(baseUrl + '/instructor/' + instructorId).then((res) => {
          setInstructorData(res.data);
          console.log(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [instructorLoginStatus, studentLoginStatus]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-2">
      <div className="container">
        <h1>
          <Link className="navbar-brand fs-3" to="/">
            EduExpert
          </Link>
        </h1>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <form class="d-flex">
            <input
              name="search"
              onChange={handleChange}
              className="form-control me-2 border border-dark"
              style={{ width: '300px' }}
              type="search"
              placeholder="Course title or Category"
              aria-label="Search"
            ></input>
            <button
              onClick={searchCourse}
              className="btn btn-dark"
              style={{ width: '80px' }}
              type="button"
            >
              Search
            </button>
          </form>
          <div className="navbar-nav ms-auto fs-5">
            <NavLink
              exact
              to="/"
              className="nav-link main-dev"
              activeClassName="main-dev-active"
            >
              Home
            </NavLink>
            <NavLink
              exact
              to="/all-courses"
              className="nav-link main-dev"
              activeClassName="main-dev-active"
            >
              Courses
            </NavLink>
            {studentLoginStatus !== 'true' && (
              <>
                <li className="nav-item main-dev dropdown">
                  {instructorLoginStatus === 'true' && (
                    <NavLink
                      className="nav-link main-dev dropdown-toggle"
                      exact
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      activeClassName="main-dev-active"
                    >
                      {instructorData.first_name}
                    </NavLink>
                  )}
                  {instructorLoginStatus !== 'true' && (
                    <a
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Instructor
                    </a>
                  )}
                  <ul className="dropdown-menu">
                    {instructorLoginStatus !== 'true' && (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/instructor-login"
                          >
                            Login
                          </Link>
                        </li>
                      </>
                    )}
                    {instructorLoginStatus === 'true' && (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/instructor-dashboard"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/instructor-logout"
                          >
                            Log Out
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              </>
            )}
            {instructorLoginStatus !== 'true' && (
              <>
                <li className="nav-item dropdown">
                  {studentLoginStatus !== 'true' && (
                    <a
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Student
                    </a>
                  )}
                  {studentLoginStatus === 'true' && (
                    <NavLink
                      className="nav-link main-dev dropdown-toggle"
                      exact
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      activeClassName="main-dev-active"
                    >
                      {studentData.first_name}
                    </NavLink>
                  )}
                  <ul className="dropdown-menu">
                    {studentLoginStatus !== 'true' && (
                      <>
                        <Link className="dropdown-item" to="/student-login">
                          Login
                        </Link>
                        <Link className="dropdown-item" to="/student-register">
                          SignUp
                        </Link>
                      </>
                    )}
                    {studentLoginStatus === 'true' && (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/student-dashboard"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/student-logout">
                            Log Out
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              </>
            )}
            {/* <Link className="nav-link" to="/about">
              About
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
