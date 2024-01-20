/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
export default function SideBar() {
  return (
    <div className="card mb-4">
      <h4 className="card-header bg-success text-light">Student Dashboard</h4>
      <div className="list-group list-group-flush">
        <Link
          to="/student-dashboard"
          className="list-group-item list-group-action"
        >
          Dashboard
        </Link>
        <Link
          to="/student-courses"
          className="list-group-item list-group-action"
        >
          My Courses
        </Link>
        <Link
          to="/student-fav-courses"
          className="list-group-item list-group-action"
        >
          Favourite Courses
        </Link>
        {/* <Link
          to="/student-recom-courses"
          className="list-group-item list-group-action"
        >
          Recommended Courses
        </Link> */}
        <Link
          to="/student-profile"
          className="list-group-item list-group-action"
        >
          Profile Settings
        </Link>
        <Link
          to="/student-logout"
          className="list-group-item list-group-action text-danger"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
