import React, { useEffect, useState } from 'react';
import AdminNavbar from './navbarAdmin';
import Cookies from 'js-cookie';
import axios from 'axios';
import "../admin/dashboard.css"
export default function AdminDashboard() {
  const [token, setToken] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post('/auth/fetchuser', { token });
        const user = res.data.user;
        setUsername(user.username);
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

  return (
 
    <>
      <AdminNavbar />
      <div className="admin-dashboard-container">
      <div className="admin-dashboard-content">
        <h1>Welcome {username}</h1>
        {/* <img src='https://cdn.pixabay.com/animation/2023/05/29/10/02/10-02-49-432_512.gif' style={{ marginLeft: "auto", marginRight: "auto", display: "block", width: "80%" }} alt="Animated Image" /> */}
      </div>
      </div>
      </>
    
  );
}
