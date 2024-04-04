import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './navbarAdmin';

const SubAdminList = () => {
  const [subadmins, setSubadmins] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubadmins = async () => {
      try {
        const response = await axios.get('auth/getallsubadmin');
        setSubadmins(response.data.subadmins);
      } catch (error) {
        setError('Error fetching subadmins');
        console.error('Error fetching subadmins:', error);
      }
    };

    fetchSubadmins();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div style={containerStyle}>
        <h2 style={headingStyle}>Subadmin List</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Phone</th>
            </tr>
          </thead>
          <tbody>
            {subadmins.map((subadmin) => (
              <tr key={subadmin._id} style={tableRowStyle}>
                <td style={tableCellStyle}>{subadmin.name}</td>
                <td style={tableCellStyle}>{subadmin.email}</td>
                <td style={tableCellStyle}>{subadmin.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Define styles
const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
};

const headingStyle = {
  marginBottom: '20px',
  color: 'black',
  textAlign:"center",
  fontWeight:"bold"
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const tableHeaderStyle = {
  background: '#007bff',
  color: '#fff',
  padding: '10px',
  textAlign: 'left',
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
};

export default SubAdminList;
