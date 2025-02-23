import React, {useState} from 'react'
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import './Authentication.css';
import Background from '../../../images/blink-background.png';
import EntryNav from '../EntryNav';

const Authentication = () => {
    const [showRegister, setShowRegister] = useState(true);

    const toggleView = () => {
      setShowRegister(!showRegister);
    };
  return (
    <>
      <EntryNav />

      <section className="auth-page d-flex flex-column justify-content-center align-items-center">

        {/* Condition to display login or register form */}
          <div className="auth-container d-flex flex-column flex-md-row justify-content-evenly align-items-center w-100">
              {showRegister ? (
                  <LoginPage toggleView={toggleView} />
              ) : (
                  <RegisterPage toggleView={toggleView} />
              )}
              <img src={Background} alt="background" className="d-none d-md-block" style={{ height: '450px' }} />
          </div>
      </section>

    </>
  )
}

export default Authentication;