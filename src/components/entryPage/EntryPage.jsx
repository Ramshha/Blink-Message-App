import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './EntryPage.css';
import Logo from '../../images/blink-message.png';

const EntryPage = () => {
  return (
    <section id='entry-page' className="d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row text-center">
          <div className="col-12 col-md-6 mb-4">
            <img src={Logo} alt="blink-message-logo" className="img-fluid flip-logo" style={{ maxHeight: '300px' }} />
            <h1 className="mb-5">Blink-Message</h1>
            <h6 className="mb-5">Secret that fades, Trust that stays..</h6>
          </div>

          <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
            <div className="entry-row mb-4">
              <h3>Sign in to craft your secret message</h3>
              <Link to="/login">
                <button className="btn-custom">Log in</button>
              </Link>
            </div>

            <div className="entry-row mb-4">
              <h3>Reveal your secret message</h3>
              <Link to="/view-note">
                <button className="btn-custom">View Note</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntryPage;