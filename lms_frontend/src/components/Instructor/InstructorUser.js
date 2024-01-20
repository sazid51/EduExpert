import { Link } from 'react-router-dom';
import InstructorSideBar from './InstructorSidebar';

export function InstructorUser() {
  return (
    <div className="container mt-4">
      <div className="row">
        <aside className="col-md-3">
          <InstructorSideBar />
        </aside>
        <section className="col-md-9">
          <div className="card">
            <h4 className="card-header">My User List</h4>
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="text-center">
                  <tr>
                    <th>Student Name</th>
                    <th>Enrolled Courses</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>
                      <Link to="/">Harry Potter</Link>
                    </td>
                    <td>
                      <Link to="/">Python Development</Link>
                    </td>
                    <td>
                      <button className="btn btn-success btn-sm active">
                        View Course
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
