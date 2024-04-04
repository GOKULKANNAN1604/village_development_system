import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../css/styles.css';
import VoluntierNavbar from './navbarvoluntier';

export default function Profile() {
  const [token, setToken] = useState();
  const [userDetails, setUserDetails] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.post('/auth/fetchvoluntier', { token });
        const userData = res.data.user;
        setUserDetails(userData); 
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
    <div>
      <VoluntierNavbar />
      <br />
      {userDetails && (
        <div style={styles.card}>
          <img src={'https://static.vecteezy.com/system/resources/thumbnails/016/890/266/small/young-man-using-mobile-phone-flat-illustration-isolated-on-white-background-vector.jpg'} alt="User" style={styles.userLogo} />
          <p style={styles.heading}>
             {userDetails.name}
          </p>
          <div style={styles.detailsContainer}>
            <p style={styles.detail}>Email: {userDetails.email}</p>
            <p style={styles.detail}>Phone: {userDetails.phone}</p>
            {/* <p style={styles.detail}>Street: {userDetails.street}</p> */}
            <p style={styles.detail}>gender: {userDetails.gender}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  userLogo: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: 'bold',
    color:"green"
  },
  detailsContainer: {
    textAlign: 'left',
  },
  detail: {
    fontSize: '19px',
    marginBottom: '10px',
    color:"black"
  },
};
