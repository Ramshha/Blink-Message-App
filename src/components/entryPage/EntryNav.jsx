import React from 'react'
import {Link} from 'react-router-dom';
import Logo from '../../images/logo.png';
import Back from '../../images/back-btn.png';
import { Navbar, Nav, Container } from 'react-bootstrap';

const EntryNav = () => {
  return (
    
    <Navbar  variant="dark" expand="md" className="shadow-sm">
        <Container fluid>

        <div className='top-bar my-2' style={{
          backgroundColor: '#244855',
          width: '100%',
          paddingLeft: '20px',
        }}>
          <img src={Logo} alt="blink-message logo" height="50px" />
          <Link to="/" style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            float: 'right',
            padding: '5px 20px 0 0'
            }}>
              <img src={Back} alt="back-button" style={{height: '40px'}}/>
          </Link>
        </div>
        </Container>
    </Navbar>
    
  )
}

export default EntryNav;