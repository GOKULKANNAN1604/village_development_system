import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import NavBar from "../navbar";

export default function VoluntierLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/auth/VoluntierLogin', { email, password });
  
      if (response.data.user.role === 'voluntier') {
        if (response.data.user.status === 'process') {
          alert('Your account is not verified. Please try again later.');
        } else {
          Cookies.set('token', response.data.token, { expires: 1 * 24 * 60 });
          navigate('/VoluntierDashboard');
          console.log('login success');
          alert('user login success');
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.data.message === 'Unauthorized') {
          alert('Unauthorized');
        } else if (error.response.data.message === 'Invalid password') {
          alert('Invalid password');
        } else {
          alert('Your account is processing. after you getting a verified status on your mail try to login .');
        }
      } else {
        alert('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <NavBar />
      <div className="form-div">
        <Card
          id="form-card"
          style={{
            width: isMobile ? '80%' : '30%', // Adjust width for mobile view
            marginTop: '40px',
            backgroundColor: "white"
          }}
        >
          <img
            src="https://classroomclipart.com/image/static7/preview2/man-sitting-at-a-desk-looking-at-a-document-63726.jpg"
            style={{ ...image, width: isMobile ? '60%' : '40%' }} // Adjust image width for mobile view
            alt="login"
          />
          <h1 style={{ color: 'black', fontFamily: 'times new roman' }}>User Login</h1>
          <Form onSubmit={loginUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green', fontWeight: 'bold' }}>Email </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                style={{ border: "2px solid green" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: 'green', fontWeight: 'bold' }}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                style={{ border: "2px solid green" }}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <p style={{textDecoration:"none",fontSize:"18px"}}>Not a member yet? <a href='/VoluntierRegister'style={{textDecoration:"none",fontSize:"19px",fontWeight: 'bold',color:"green"}}> Register</a></p>
            <Button
              variant="success"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </Button>{" "}
            <Button
              variant="primary"
              href="/"
            >
              Back
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}

const image = {
  width: "40%",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};
