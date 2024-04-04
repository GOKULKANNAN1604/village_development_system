import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navbar';
export default  function VoluntierRegister(){
  const navigate = useNavigate();
  const [data,setData]=useState({
    name:'',
    email:'',
    password:'',
    role:'voluntier',
    phone: '',
    street:'',
    gender:'',
  })

   const registerUser = async (e)=>{
    e.preventDefault();
    const{name,email,password,role,phone,street,gender} = data
    console.log(name,email,password,role,phone,street,gender)
    try{
      const {data} = await axios.post('/auth/VoluntierRegister',{name,email,password,role,phone,street,gender})
      if(data.error){
        alert(data.error)
      }else{
        setData({})
        alert(`${data.message}`)
        navigate('/voluntierlogin')
      }
    }
    catch(err){
      console.log(err)
    }
   }

    return( <>
    <NavBar/>
      <div className="form-div">
        <Card id="form-card" style={{ width: '50%', marginTop: '5px',backgroundColor:"white" }}>
          <h1 style={{ color: 'black', fontWeight: 'bold', fontFamily: 'unset' }}>User Register</h1>
          <Form onSubmit={registerUser}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label style={{ color: 'green', fontWeight: 'bold' }}> Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Student Name"
                value={data.name}
                style={{border:"1px solid green" }}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
              <br />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'green', fontWeight: 'bold' }}>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email has number also "
                pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                value={data.email}
                style={{border:"1px solid green" }}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: 'green', fontWeight: 'bold' }}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password atleast 8 characters"
                value={data.password}
                style={{border:"1px solid green" }}
                pattern=".{8,}"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />   </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicDepartment">
              <Form.Label style={{ color: 'green', fontWeight: 'bold' }}>Street</Form.Label>
              <Form.Control
                as="select"
                name="street"
                style={{border:"1px solid green" }}
                value={data.street}
                onChange={(e) => setData({ ...data, street: e.target.value })}
                required
              >
                <option value="" disabled>Select street</option>
                <option value="North Street">NorthStreet</option>
                <option value="East Street">EastStreet</option>
                <option value="West Street">WestStreet</option>
                <option value="south street">southStreet</option>
              </Form.Control>
            </Form.Group>
         
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label style={{ color: 'green', fontWeight: 'bold' }}>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter Contact Number"
                value={data.phone}
                pattern="[0-9]{10}"
                maxLength="10"
                style={{border:"1px solid green" }}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label style={{ color: 'green', fontWeight: 'bold' }}>Gender</Form.Label>
              <Form.Control
               as="select"
                name="gender"
                placeholder="select a gender"
                value={data.gender}
                style={{border:"1px solid green" }}
                onChange={(e) => setData({ ...data, gender: e.target.value })}
                required
              >
                <option value="" disabled>select a gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
                </Form.Control>
            </Form.Group>
           
            
            <Button variant="primary" type="submit">
                Submit
            </Button>{" "}
            <Link to="/voluntierlogin">
              <Button variant="success" type="submit">
                Login
              </Button>
            </Link>
            <Link to="/">
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