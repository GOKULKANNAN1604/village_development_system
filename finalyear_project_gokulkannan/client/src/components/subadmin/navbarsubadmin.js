import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../subadmin/styles.css'; // Import your custom CSS file here
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

export default function SubAdminNavbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const [role, setRole] = useState();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post('/auth/fetchsubadmin', { token });
        const user = res.data.user;
        setUsername(user.name);
        setRole(user.role);
      } catch (error) {
        console.error('fetch data error', error);
      }
    };

    const getToken = Cookies.get('token');
    if (getToken) {
      setToken(getToken);
    }
    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    const cookies = Object.keys(Cookies.get());
    cookies.forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="custom-navbar"> {/* Apply custom-navbar class */}
      <Container>
        <Navbar.Brand href="" className="brand">
          <FontAwesomeIcon icon={ faHome} className="home-icon" /> {/* Apply home-icon class */}
          VILLAGE DEVELOPMENT SYSTEM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Apply custom classes for buttons */}
            <Link to="/subadminDashboard" className="nav-link">
              <Button variant="custom">Home</Button>
            </Link>
            <Link to="/createevent" className="nav-link">
              <Button variant="custom">Create Event</Button>
            </Link>
            <Link to="/updateevent" className="nav-link">
              <Button variant="custom">View Events</Button>
            </Link>
            <Link to="/voluntierlist" className="nav-link">
              <Button variant="custom">User List</Button>
            </Link>
            <Link to="/issuelist" className="nav-link">
              <Button variant="custom">Issues</Button>
            </Link>
          </Nav>
          <Nav>
          <h1 className="username ms-3" >{username}</h1> 
            <Nav.Link onClick={handleLogout} className="logout"style={{marginLeft:"-60px",marginTop:"25px"}} >Logout</Nav.Link> {/* Apply logout class */}
          {/* Apply username class with Bootstrap's margin start class (ms-3) */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
