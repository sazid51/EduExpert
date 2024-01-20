/* eslint-disable new-parens */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function ContactUs() {
  const [ContactData, setContactData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    query_txt: '',
    status: '',
  });

  const handleChange = (e) => {
    setContactData({
      ...ContactData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = () => {
    const ContactFormData = new FormData();
    ContactFormData.append('first_name', ContactData.first_name);
    ContactFormData.append('last_name', ContactData.last_name);
    ContactFormData.append('email', ContactData.email);
    ContactFormData.append('query_txt', ContactData.query_txt);

    try {
      axios.post(baseUrl + '/contact-us/', ContactFormData).then((response) => {
        Swal.fire({
          title: 'Thanks for contacting with us',
          icon: 'success',
          toast: true,
          timer: 1000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Something Error Occured',
        icon: 'error',
        toast: true,
        timer: 1000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  useEffect(() => {
    document.title = 'Contact Us';
  });

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-lg-6 col-sm-10 offset-lg-3 offset-sm-1">
          <div className="card">
            <h4 className="card-header bg-primary text-light">Contact Us</h4>
            <div className="card-body">
              {/* <form> */}
              <div className="mb-3">
                <label for="InputFName" className="form-label">
                  First Name
                </label>
                <input
                  value={ContactData.first_name}
                  onChange={handleChange}
                  name="first_name"
                  type="text"
                  className="form-control border border-secondary"
                  id="InputFName"
                />
              </div>
              <div className="mb-3">
                <label for="InputLName" className="form-label">
                  Last Name
                </label>
                <input
                  value={ContactData.last_name}
                  type="text"
                  onChange={handleChange}
                  name="last_name"
                  className="form-control border border-secondary"
                  id="InputLName"
                />
              </div>
              <div className="mb-3">
                <label for="InputEmail" className="form-label">
                  Email
                </label>
                <input
                  value={ContactData.email}
                  type="email"
                  onChange={handleChange}
                  name="email"
                  className="form-control border border-secondary"
                  id="InputEmail"
                />
              </div>

              <div className="mb-3">
                <label for="InputQuery" className="form-label">
                  Query
                </label>
                <textarea
                  rows="6"
                  value={ContactData.query_txt}
                  onChange={handleChange}
                  name="query_txt"
                  className="form-control border border-secondary"
                ></textarea>
              </div>

              <button
                onClick={submitForm}
                type="send"
                className="btn btn-md btn-primary"
              >
                Send
              </button>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
