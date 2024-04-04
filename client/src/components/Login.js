import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import VoluntierNavbar from './user/navbarvoluntier';

const Login = ( ) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/auth/login', {
                username,
                password,
            });
            if(response.data.user.role === 'user'){
            // localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
            console.log('login success');
            alert('login success');
            }else if(response.data.user.role === 'admin'){
                Cookies.set('token', response.data.token, { expires: 15 / (24 * 60) });
                // localStorage.setItem('token', response.data.token);
                navigate('/Admindashboard');
                console.log('login success');
                alert('login success');
            }
        } catch (error) {
            alert('Unauthorized');
            console.error(error);
        }
    };
    return (
        <div>
           
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
