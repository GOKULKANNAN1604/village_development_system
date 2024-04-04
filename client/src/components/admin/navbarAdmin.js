import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from "js-cookie";
import { useNavigate} from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

export default function AdminNavbar() {
  const navigate = useNavigate(); 
  const handleLogout = () => {
    const cookies = Object.keys(Cookies.get());
    cookies.forEach(cookieName => {
      Cookies.remove(cookieName);
    });
    navigate('/')
  };
  return (
    <>

    <Navbar  expand="lg"  style={{background:'black',width:"100%"}} data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/adminDashboard" style={{color:'red',fontWeight:'bolder'}}>
        <FontAwesomeIcon icon={ faHome} style={{ marginRight: '10px' }} />VILLAGE DEVELOPMENT SYSTEM</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          {/* <Link to="/adminhome" className="nav-link">
                <Button variant="outline-success" style={{ color: 'wheat' }}>
                  home
                </Button>
          </Link> */}
          <Link to="/SubAdminRegister" className="nav-link">
                <Button variant="outline-danger" style={{ color: 'wheat',backgroundColor:"green" }}>
                  Add subadmin
                </Button>
          </Link>
          <Link to="/subadminlist" className="nav-link">
                <Button variant="outline-danger" style={{ color: 'wheat',backgroundColor:"green" }}>
                  subadmin list
                </Button>
          </Link>
          <Link to="/userslist" className="nav-link">
                <Button variant="outline-danger" style={{ color: 'wheat',backgroundColor:"green" }}>
                  voluntier list
                </Button>
          </Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}  style={{color:'red',fontWeight:'bold'}}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
    </>
  );
}
