import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VoluntierNavbar from './navbarvoluntier';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend
    axios
      .get('auth/fetchevent')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <VoluntierNavbar />
      <div style={containerStyle}>
        <div style={contentContainerStyle}>
          <h2 style={{ color: '#555', paddingBottom: '10px', textAlign: 'center', fontSize: '40px' }}>
             Events
          </h2>

          <div style={eventsContainerStyle}>
            {events.map((event, index) => (
              <div key={event._id} style={cardStyle}>
                <img src="https://m.media-amazon.com/images/I/71XT3UQsHWL._AC_UF1000,1000_QL80_.jpg" alt={`Event ${index + 1}`} style={imageStyle} />
                <h3 style={{ color: '#007bff' }}>Event Title: {event.title}</h3>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
                <p>Description: {event.description}</p>
                <p>start time: {event.startTime}</p>
                <p>end time: {event.endTime}</p>
                <p>Status: {event.status || 'Pending'}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginLeft: '20px', alignSelf: 'flex-start', marginTop: '-405px' }}>
        </div>
      </div>
    </>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const contentContainerStyle = {
  flex: 1,
  marginBottom: '200px',
  maxWidth: '800px',
  margin: '0 auto',
};

const eventsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginLeft: '-20px',
};

const cardStyle = {
  border: '2px solid #007bff',
  borderRadius: '10px',
  padding: '20px',
  margin: '10px',
  width: '330px',
  boxShadow: '0 4px 8px rgba(5, 0, 1, 0.1)',
  backgroundColor: '#fff',
};

const imageStyle = {
  width: '100%',
  borderRadius: '10px',
  marginBottom: '10px',
};

export default ViewEvents;
