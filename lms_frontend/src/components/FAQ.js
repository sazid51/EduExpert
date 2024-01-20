/* eslint-disable no-unused-vars */
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

function FAQ() {
  const [faqdata, setfaqData] = useState([]);

  useEffect(() => {
    try {
      axios.get(baseUrl + '/faq/').then((res) => {
        setfaqData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="container mt-3 mb-5">
      <h3 className="pb-1 mt-4 ms-2 mb-2">FAQs</h3>
      <div
        className="accordion"
        id="accordionExample"
        style={{ marginBottom: '45vh' }}
      >
        {faqdata &&
          faqdata.map((row, index) => (
            <div className="accordion-item">
              <h2 className="accordion-header" id={`heading_${row.id}`}>
                <button
                  className="accordion-button fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse_${row.id}`}
                  aria-expanded="true"
                  aria-controls={`collapse_${row.id}`}
                >
                  {row.question}
                </button>
              </h2>
              {index === 0 && (
                <div
                  id={`collapse_${row.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading_${row.id}`}
                  data-bs-parent={`#accordian_${row.id}`}
                >
                  <div className="accordion-body">{row.answer}</div>
                </div>
              )}
              {index > 0 && (
                <div
                  id={`collapse_${row.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading_${row.id}`}
                  data-bs-parent={`#accordian_${row.id}`}
                >
                  <div className="accordion-body">{row.answer}</div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FAQ;
