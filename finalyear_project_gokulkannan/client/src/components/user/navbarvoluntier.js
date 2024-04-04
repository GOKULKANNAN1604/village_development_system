import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from "js-cookie";
import { useNavigate} from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function VoluntierNavbar() {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    const cookies = Object.keys(Cookies.get());
    cookies.forEach(cookieName => {
      Cookies.remove(cookieName);
    });
    navigate('/')
  };
  return (
    <Navbar  expand="lg"  style={{background:'black'}} data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/VoluntierDashboard" style={{color:'red',fontWeight:'bolder',marginLeft:'10%'}}>
        <FontAwesomeIcon icon={ faHome} className="home-icon" />VILLAGE DEVELOPMENT SYSTEM</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Link to="/VoluntierDashboard" className="nav-link">
                <Button variant="outline-primary" style={{ color: 'wheat',backgroundColor:"steelblue"}}>
                  home
                </Button>
          </Link>
          <Link to="/viewevents" className="nav-link">
                <Button variant="outline-primary" style={{ color: 'wheat' ,backgroundColor:"steelblue"}}>
                  events
                </Button>
          </Link>
        
          <Link to="/schemelist" className="nav-link">
                <Button variant="outline-primary" style={{ color: 'wheat' ,backgroundColor:"steelblue"}}>
                  schemes
                </Button>
          </Link>
         
          <Link to="/issue" className="nav-link">
                <Button variant="outline-primary" style={{ color: 'wheat' ,backgroundColor:"steelblue"}}>
                 send issue
                </Button>
          </Link>
          {/* <Link to="/agriculture" className="nav-link">
                <Button variant="outline-primary" style={{ color: 'wheat',backgroundColor:"steelblue" }}>
                agriculture
                </Button>
          </Link> */}
          <Link to="/userprofile" className="nav-link">
                <Button variant="outline-primary" style={{ color: 'wheat',backgroundColor:"steelblue" }}>
                  Profile
                </Button>
          </Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}  style={{color:'red',fontWeight:'bold'}}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

