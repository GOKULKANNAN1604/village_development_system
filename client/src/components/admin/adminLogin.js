import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import NavBar from "../navbar";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
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
      const response = await axios.post('/auth/adminLogin', { username, password });
  
      if (response.data.user.role === 'admin') {
        Cookies.set('token', response.data.token, { expires: 1 * 24 * 60 });
        navigate('/Admindashboard');
        console.log('login success');
        alert('login success'); 
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.data.message === 'Unauthorized') {
          alert('Unauthorized'); 
        } else if (error.response.data.message === 'Invalid password') {
          alert('Invalid password'); 
        } else {
          alert('An error occurred');
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
            margin: 'auto',
            marginTop: '40px',
            backgroundColor: "white",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)"
          }}
        >
          <img
            src="https://img.freepik.com/free-vector/man-sitting-desk-unlocking-computer-computer-settings-login-flat-illustration_74855-20645.jpg"
            style={{ ...image, width: isMobile ? '60%' : '40%' }} // Adjust image width for mobile view
            alt="login"
          />
          <h1 style={{ color: 'black', fontFamily: 'times new roman', textAlign: 'center' }}>Admin Login</h1>
          <Form onSubmit={loginUser}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green', fontWeight: 'bold' }}>Username </Form.Label>
              <Form.Control
                type="text"
                name="username"
                style={{ border: "2px solid green" }}
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: 'green', fontWeight: 'bold' }}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                style={{ border: "2px solid green" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
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
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};
