import React from 'react'
import './About.css'
import Navbar from '../navbar/NavBar';
import Footer from '../Footer';
// import {Link} from 'react-router-dom';
import Banner from '../../../images/Banner.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import One from '../../../images/member1.png';
import Two from '../../../images/member2.png';
import Three from '../../../images/member3.png';
import Four from '../../../images/member4.png';
import Five from '../../../images/member5.png';
import Six from '../../../images/member6.png';
import Linkedin from '../../../images/LinkedIn_logo.png';

const About = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    const features = [
        {
            title: "Self-Destructing Notes",
            description: "Our core feature allows you to send notes that self-destruct after being read. Choose from various destruction methods such as shredding, burning, or disappearing ink animations to add a unique flair to your messages."
        },
        {
            title: "User-Friendly Interface",
            description: "Designed with simplicity in mind, our modern and intuitive interface ensures that sending and managing self-destructing notes is a seamless experience. With clear instructions and minimal steps, you can focus on your message rather than navigating complex controls."
        },
        {
            title: "Read Receipts",
            description: "Stay informed with optional read receipts that notify you when your note has been read. This feature provides confirmation and peace of mind, letting you know your message has been received."
        },
        {
            title: "Password Protection",
            description: "Add an extra layer of security by password-protecting your notes. Recipients must enter a password to view your message, making sure that only authorized individuals can access it."
        },
        {
            title: "Secure Email Delivery",
            description: "Share notes with multiple recipients, each with their own password or access key. This feature is perfect for team projects or group communications, allowing you to manage access efficiently."
        },
        {
            title: "Authentication",
            description: "Safeguard your account with robust authentication features. Our secure login mechanisms ensure that only authorized users can access their accounts and messages."
        },
        {
            title: "Contact List Management",
            description: "Manage your contacts easily with our comprehensive contact list feature. Store and organize your contacts for quick access, making it effortless to send self-destructing notes to multiple people."
        }
    ];

    return (
        <section>
            <Navbar />
    
            <div className='container my-5 about-page'>
                <div className='d-flex flex-column align-items-center justify-content-center mb-5'>
                    <h2>About Blink Message</h2>
                    <p className='col-md-7 text-center'>At Blink Message, we are dedicated to revolutionizing how you communicate digitally. Our secure, intuitive service provides you with innovative features for sending self-destructing notes, ensuring your messages are delivered safely and with style.</p>
                </div>

                <div className='text-center mb-5'>
                    <h3>Our Mission</h3>
                    <p>At Blink Message, our mission is to offer a unique and secure communication experience that adapts to the modern digital landscape. We prioritize innovation, security, and user experience, striving to deliver tools that are both cutting-edge and user-friendly.</p>
                    <p>We understand the need for privacy and the importance of secure, efficient communication. Our team is committed to providing solutions that meet these needs while offering a seamless and engaging user experience.</p>
                    <p>Thank you for choosing Blink Message. We’re excited to help you communicate with confidence and creativity.</p>
                </div>

                <div className="my-5 d-flex justify-content-center">
                    <img src={Banner} alt="Banner" className='img-fluid col-md-8'/>
                </div>

                <div className='container row'>

                    <h3>What We Offer</h3>
                    <div className='text-center row d-flex justify-content-center'>

                        <div className='w-3/4 m-auto'>

                            <div class="custom-height p-4 my-3 item">
                                    <Slider {...settings}>
                                        {features.map((i, index) => (
                                            <div key={index} className='px-4'>
                                                <div>
                                                <h6>{i.title}</h6>
                                                <p>{i.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </Slider>
                            </div>
                        
                        </div>

                    </div>
                </div>

                <h3>Meat our team</h3>
                    <div className='text-center row d-flex justify-content-center'>
                        <div className='col-md-3 text-center shadow rounded py-3 m-3 team'>
                            <img src={One} alt="One" height="120px"/>
                            <h6><b>Ramsha Umer</b></h6>
                            <h6>Front-end Developer</h6>
                            <a href="https://www.linkedin.com/in/ramsha-umer/" ><img src={Linkedin} alt="Linkedin Logo" height="20px"/></a>
                        </div>
                        <div className='col-md-3 text-center shadow rounded py-3 m-3 team'>
                            <img src={Two} alt="Two" height="120px"/>
                            <h6><b>Abiola Are</b></h6>
                            <h6>Full-Stack Developer</h6>
                            <a href="#" ><img src={Linkedin} alt="Linkedin Logo" height="20px"/></a>
                        </div>
                        <div className='col-md-3 text-center shadow rounded py-3 m-3 team'>
                            <img src={Three} alt="Three" height="120px"/>
                            <h6><b>Anny Wang</b></h6>
                            <h6>Full-Stack Developer</h6>
                            <a href="linkedin.com/in/i-am-anny-wang" ><img src={Linkedin} alt="Linkedin Logo" height="20px"/></a>
                        </div>
                        <div className='col-md-3 text-center shadow rounded py-3 m-3 team'>
                            <img src={Four} alt="Four" height="120px"/>
                            <h6><b>Matta Shravani</b></h6>
                            <h6>Full-Stack Developer</h6>
                            <a href="https://www.linkedin.com/in/shravani-matta-981756303/" ><img src={Linkedin} alt="Linkedin Logo" height="20px"/></a>
                        </div>
                        <div className='col-md-3 text-center shadow rounded py-3 m-3 team'>
                            <img src={Five} alt="Five" height="120px"/>
                            <h6><b>Prabhjot Kaur</b></h6>
                            <h6>Full-Stack Developer</h6>
                            <a href="https://www.linkedin.com/in/erprabhjotk/" ><img src={Linkedin} alt="Linkedin Logo" height="20px"/></a>
                        </div>
                        <div className='col-md-3 text-center shadow rounded py-3 m-3 team'>
                            <img src={Six} alt="Six" height="120px"/>
                            <h6><b>Syeda Sana</b></h6>
                            <h6>Full-Stack Developer</h6>
                            <a href="#" ><img src={Linkedin} alt="Linkedin Logo" height="20px"/></a>
                        </div>
                    </div>
                

                <div className='text-center my-5'>
                    <h6><b>Contact Us:</b> For any inquiries or support, please reach out to us at <a href='mailto:blink-message@outlook.com'>blink-message@outlook.com</a>.</h6>
                </div>
            </div>
            <Footer/>

        </section>
    );
    
}

export default About