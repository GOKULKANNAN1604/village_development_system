import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Button, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Navbar style={{ background: 'black' }} variant="dark" expand="lg" expanded={expanded}>
        <Container>
          {/* Icon added here */}
          <Navbar.Brand href="/" style={{ color: 'red', fontWeight: 'bolder', fontSize: "25px", fontFamily: "times new roman" }}>
            <FontAwesomeIcon icon={ faHome} style={{ marginRight: '10px' }} />
            VILLAGE DEVELOPMENT SYSTEM
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/adminLogin" className="nav-link">
                <Button variant="outline-secondary" style={{ color: 'white' }}>
                  Admin
                </Button>
              </Link>
              <Link to="/subadminLogin" className="nav-link">
                <Button variant="outline-info" style={{ color: 'white' }}>
                  SubAdmin
                </Button>
              </Link>
              <Link to="/VoluntierLogin" className="nav-link">
                <Button variant="outline-info" style={{ color: 'white' }}>
                  User
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
