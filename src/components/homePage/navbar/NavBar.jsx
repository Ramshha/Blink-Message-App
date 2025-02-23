import React from 'react'
import Notification from '../notification/Notification';
import { Link, useLocation} from 'react-router-dom';
import Signout from '../../entryPage/authentication/Signout';
import './NavBar.css'
import Logo from './../../../images/logo.png';
import UserName from '../UserName';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
  const location = useLocation();

  return (
    <Navbar variant="dark" expand="md" className="shadow-sm">
    <Container fluid>
      <Navbar.Brand>
        <img src={Logo} alt="logo" height="50px" style={{ paddingLeft: '20px'}} />
      </Navbar.Brand>
      <UserName />
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto px-3">
          <Nav.Item>
            <Nav.Link as={Link} to="/home" className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}>Create Note</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/contact-list" className={`nav-link ${location.pathname === '/contact-list' ? 'active' : ''}`}>Contact List</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/view-note-home" className={`nav-link ${location.pathname === '/view-note-home' ? 'active' : ''}`}>View Note</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Notification />
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/"><Signout /></Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
  
}

export default NavBar
