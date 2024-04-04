import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubAdminNavbar from './navbarsubadmin';
import { Dropdown } from 'react-bootstrap';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState('');

  // Define fetchVolunteers function within the component scope
  const fetchVolunteers = async () => {
    try {
      const response = await axios.get('auth/getvoluntierdetails');
      setVolunteers(response.data.volunteers);
    } catch (error) {
      setError('Error fetching volunteers');
      console.error('Error fetching volunteers:', error);
    }
  };

  useEffect(() => {
    fetchVolunteers(); // Call fetchVolunteers when component mounts
  }, []);

  const handleStatusChange = async (volunteerId, status) => {
    try {
      // Update the status for the volunteer with the given ID
      await axios.put(`/auth/statusupdate/${volunteerId}`, { status });
      // Assuming the backend updates the status successfully, refresh the volunteer list
      fetchVolunteers(); // Call fetchVolunteers to update the volunteer list
    } catch (error) {
      console.error('Error updating volunteer status:', error);
      setError('Error updating volunteer status');
    }
  };

  return (
    <>
      <SubAdminNavbar />
      <div>
        <h2 style={{ marginBottom: '20px', textAlign: "center" }}>Volunteer List</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table style={{ width: '70%', borderCollapse: 'collapse', margin: '0 auto' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Phone</th>
              <th style={tableHeaderStyle}>Status</th> {/* Added Status column */}
              <th style={tableHeaderStyle}>Action</th> {/* Added Action column */}
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr key={volunteer._id} style={tableRowStyle}>
                <td style={tableCellStyle}>{volunteer.name}</td>
                <td style={tableCellStyle}>{volunteer.email}</td>
                <td style={tableCellStyle}>{volunteer.phone}</td>
                <td style={tableCellStyle}>{volunteer.status}</td> {/* Display status */}
                <td style={tableCellStyle}>
                  {/* Only render the action dropdown if status is not 'Verified' */}
                  {volunteer.status !== 'Verified' && (
                    <Dropdown onSelect={(eventKey) => handleStatusChange(volunteer._id, eventKey)}>
                      <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Change Status
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="process">Process</Dropdown.Item>
                        <Dropdown.Item eventKey="verified">Verified</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Define styles
const tableHeaderStyle = {
  background: '#f2f2f2',
  padding: '8px',
  textAlign: 'left',
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '8px',
};

export default VolunteerList;
