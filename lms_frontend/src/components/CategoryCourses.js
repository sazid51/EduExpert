import { Link } from 'react-router-dom';

function CategoryCourses() {
  return (
    <div className="container mt-4 mb-4">
      {/* Start All Courses */}
      <h3 className="pb-1 mb-4 text-center">Web Development Courses</h3>
      <div className="row mb-3">
        <div className="col-md-3 mb-2">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../CoursesPhotos/Android.gif"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">Courses Name</Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../CoursesPhotos/ios.jpg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">Courses Name</Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../CoursesPhotos/blockchain.jpg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">Courses Name</Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="card">
            <Link to="#">
              <img
                src="../CoursesPhotos/data-science.jpg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="#">Courses Name</Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../CoursesPhotos/Android.gif"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">Courses Name</Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../CoursesPhotos/ios.jpg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">Courses Name</Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="card">
            <Link to="/detail/1">
              <img
                src="../CoursesPhotos/blockchain.jpg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/detail/1">Courses Name</Link>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="card">
            <Link to="#">
              <img
                src="../CoursesPhotos/data-science.jpg"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="#">Courses Name</Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* End All Courses */}
      {/* Pagination Starts */}
      <nav aria-label="Page navigation mt-5">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <Link className="page-link" to="#">
              Previous
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              1
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              2
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              3
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" to="#">
              Next
            </Link>
          </li>
        </ul>
      </nav>
      {/* Pagination Ends */}
    </div>
  );
}

export default CategoryCourses;
