/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import { FaFacebook, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function Footer() {
  const [pagesData, setpagesData] = useState([]);
  // Fetch pages when page load
  useEffect(() => {
    try {
      axios.get(baseUrl + '/pages/').then((res) => {
        setpagesData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                <div className="col-4 col-lg-4">
                  <h2>Follow Us</h2>
                  <div className="row" id="FollowUs">
                    <div className="col-2 social-link">
                      <a
                        href="https://web.facebook.com/Edu-Expert-105403835634606"
                        target="_blank"
                      >
                        <FaFacebook />
                      </a>
                    </div>
                    <div className="col-2 social-link">
                      <a
                        href="https://www.youtube.com/channel/UCScNO2lRrQ9i5nLabdiNQpQ"
                        target="_blank"
                      >
                        <FaYoutube />
                      </a>
                    </div>
                    <div className="col-2 social-link">
                      <a href="https://www.linkedin.com/" target="_blank">
                        <FaLinkedin />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-4 col-lg-4">
                  <h2>Company</h2>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    {pagesData &&
                      pagesData.map((row, index) => (
                        <li>
                          <Link
                            to={`/pages/${row.id}${row.url}`}
                            key={index + 'pagesDatas'}
                          >
                            {row.title}
                          </Link>
                        </li>
                      ))}
                    <li>
                      <Link to="/contact-us">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="/faq">FAQ</Link>
                    </li>
                  </ul>
                </div>

                <div className="col-4 col-lg-4">
                  <h2>Community</h2>
                  <ul>
                    <li>
                      <a href="https://appscode.com/" target="_blank">
                        Apps Code
                      </a>
                    </li>
                    <li>
                      <a href="https://www.optimizely.com/" target="_blank">
                        Optimizely
                      </a>
                    </li>
                    <li>
                      <a href="https://www.enosisbd.com/" target="_blank">
                        Enosis Solution BD
                      </a>
                    </li>
                    <li>
                      <a href="https://brainstation-23.com/?bc" target="_blank">
                        Brain Station-23
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <hr />
              <div className="mt-2">
                <p className="main-hero-para text-center w-100">
                  Copyright @ {new Date().getFullYear()} EduExpert. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
