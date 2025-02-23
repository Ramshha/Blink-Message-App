import React from 'react';
import Privacy from "../../../images/privacy.png";
import './About.css';
import Navbar from '../navbar/NavBar';
import Footer from '../Footer';

const Policy = () => {
  return (
    <div>
        <Navbar/>
        <div className='container my-5 about-page'>

            <div className='text-center mb-5'><h2>Privacy Policy</h2></div>

            <div className='row mb-5'>
                    <h3>How Blink Message Protects Your Privacy</h3>
                        <div className='col-md-6'>
                            <div className='mb-4'>
                                <h6>End-to-End Encryption</h6>
                                <p>All messages and attachments are encrypted from the moment they are sent until they are read and self-destruct. This ensures that only the intended recipient can access your content.</p>
                            </div>
                            <div className='mb-4'>
                                <h6>Secure Authentication</h6>
                                <p>Our secure authentication protocols protect your account. Strong password policies and multi-factor authentication ensure your login credentials remain safe.</p>
                            </div>
                            <div className='mb-4'>
                                <h6>TLS/SSL Encryption</h6>
                                <p>All email communications are transmitted over secure TLS/SSL connections. This encryption protects your data during transit, preventing unauthorized access.</p>
                            </div>
                            <div className='mb-4'>
                                <h6>Self-Destruction Mechanism</h6>
                                <p>By design, your notes and attachments are set to self-destruct after being read. This eliminates the risk of sensitive information lingering in digital storage.</p>
                            </div>
                            <div className='mb-4'>
                                <h6>Privacy-Focused Policies</h6>
                                <p>We adhere to strict privacy policies and do not track or store your personal information beyond what is necessary for the service. Your data remains confidential and is not shared with third parties.</p>
                            </div>
                        </div>
                        <div className='col-md-6 my-5'>
                            <img src={Privacy} alt='Privacy Protection' className='img-fluid jump-animation'/>
                            <p className='text-center mt-3'>Keeping Private things Private.</p>
                        </div>
                    </div>
            </div>
            <Footer/>
    </div>
  )
}

export default Policy
