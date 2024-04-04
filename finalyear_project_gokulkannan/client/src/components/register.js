import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); 

    const handleRegister = async () => {
        try {
            const response = await axios.post('/auth/register', {
                username,
                password,
                role,
            });
            console.log(response.data); 
            alert('Register Successfull')
            navigate('/login')
        } catch (error) {
            console.error(error);

        }
    };

    return (
        <div>
            <h2>Register</h2>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                Role:
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </label>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
