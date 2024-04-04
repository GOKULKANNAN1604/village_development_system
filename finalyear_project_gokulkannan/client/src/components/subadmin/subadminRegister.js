import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../admin/navbarAdmin';

export default  function SubAdminRegister(){
  const navigate = useNavigate();
  const [data,setData]=useState({
    name:'',
    email:'',
    password:'',
    role:'subadmin',
    phone: '',
    // department:'',
  })

   const registerUser = async (e)=>{
    e.preventDefault();
    const{name,email,password,role,phone} = data
    console.log(name,email,password,role,phone)
    try{
      const {data} = await axios.post('/auth/subadminRegister',{name,email,password,role,phone})
      if(data.error){
        alert(data.error)
      }else{
        setData({})
        alert(`Register Successful Email send to ${name}`)
        navigate('/adminDashboard')
      }
    }
    catch(err){
      console.log(err)
    }
   }

    return( <>
         <AdminNavbar />
      <div className="form-div">
        <Card id="form-card" style={{ width: '40%', marginTop: '30px',background:'white' }}>
          <h1 style={{ color: 'black', fontWeight: 'bold', fontFamily: 'unset' }}>Add SubAdmin</h1>
          <Form onSubmit={registerUser}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>SubAdmin Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter SubAdmin Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
              <br />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password atleast 8 characters"
                value={data.password}
                pattern=".{8,}"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label style={{ color: 'black', fontWeight: 'bold' }}>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter Contact Number"
                value={data.phone}
                pattern="[0-9]{10}"
                maxLength="10"
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Account
            </Button>{" "}
            <Link to="/adminDashboard">
              <Button variant="primary" type="submit">
                Back
              </Button>
            </Link>
          </Form>
        </Card>
      </div>
        </>
    )
 }