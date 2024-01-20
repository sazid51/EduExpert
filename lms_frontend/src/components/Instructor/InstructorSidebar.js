/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
export default function InstructorSideBar() {
  return (
    <div className="card mb-4">
      <h4 className="card-header bg-success text-light">
        {' '}
        Instructor Dashboard
      </h4>
      <div className="list-group list-group-flush">
        <Link
          to="/instructor-dashboard"
          className="list-group-item list-group-action"
        >
          Dashboard
        </Link>
        <Link
          to="/instructor-courses"
          className="list-group-item list-group-action"
        >
          My Courses
        </Link>
        <Link to="/add-courses" className="list-group-item list-group-action">
          Add Courses
        </Link>
        <Link to="/quiz" className="list-group-item list-group-action">
          All Quizs
        </Link>
        <Link
          to="/instructor-profile"
          className="list-group-item list-group-action"
        >
          Profile Settings
        </Link>
        <Link
          to="/instructor-logout"
          className="list-group-item list-group-action text-danger"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
