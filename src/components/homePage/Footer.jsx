import React from 'react'
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#244855',
      bottom: 0,
    }} className=" text-center text-light">

      <div className='py-2'>
        <br/>
        <p className='mt-2'>Refer to our <b><Link to="/policy"  style={{textDecoration: 'none', color: '#E64833'}}>Privacy Policy</Link></b> to understand how we handle and protect your personal information.</p>
        <p>Blink Message Copyright &copy; 2024. All Rights Reserved</p>
      </div>

    </footer>
  )
}

export default Footer;
