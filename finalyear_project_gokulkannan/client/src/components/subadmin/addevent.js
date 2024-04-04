import React, { useState } from 'react';
import axios from 'axios';
import SubAdminNavbar from './navbarsubadmin';

function Createevent() {
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    startTime: '',
    endTime: '',
    startAmPm: 'AM', // default to AM
    endAmPm: 'AM',   // default to AM
  });

  const handleInputChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEvent = () => {
    // Basic validation
    if (!newEvent.title || !newEvent.date || !newEvent.location || !newEvent.startTime || !newEvent.endTime) {
      alert('Please fill in all required fields to create an event.');
      return;
    }
    axios
      .post('auth/createevent', newEvent)
      .then((response) => {
        // Update the state and clear the form
        setNewEvent({
          title: '',
          date: '',
          location: '',
          description: '',
          startTime: '',
          endTime: '',
          startAmPm: 'AM', // reset to AM after submission
          endAmPm: 'AM',   // reset to AM after submission
        });
        alert('Event added successfully');
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div style={{ marginLeft: '0px' }}>
        <SubAdminNavbar />
      </div>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <div
          style={{
            marginTop: '20px',
            maxWidth: '400px',
            textAlign: 'left',
            margin: '0 auto',
          }}
        >
          <h2 style={{ color: '#555', textAlign: 'center' }}>Add New Event</h2>
          <form>
            <label style={{ marginBottom: '5px', display: 'block' }}>Title:</label>
            <input
              type="text"
              name="title"
              onChange={handleInputChange}
              value={newEvent.title || ''}
              style={{
                marginBottom: '10px',
                padding: '10px',
                width: '100%',
                borderRadius: '5px',
                border: '1px solid green',
              }}
            />

            <label style={{ marginBottom: '5px', display: 'block' }}>Date:</label>
            <input
              type="date"
              name="date"
              onChange={handleInputChange}
              value={newEvent.date || ''}
              style={{
                marginBottom: '10px',
                padding: '10px',
                width: '100%',
                borderRadius: '5px',
                border: '1px solid green',
              }}
            />

            {/* <label style={{ marginBottom: '5px', display: 'block' }}>Time:</label> */}
            <div style={{ display: 'flex', marginBottom: '10px' }}>
            <label >start:</label><br></br>
              <input
                type="time"
                name="startTime"
                onChange={handleInputChange}
                value={newEvent.startTime || ''}
                style={{
                  marginRight: '5px',
                  padding: '10px',
                  width: '50%',
                  borderRadius: '5px',
                  border: '1px solid green',
                }}
              />
              <select
                name="startAmPm"
                onChange={handleInputChange}
                value={newEvent.startAmPm || 'AM'} // default to AM
                style={{
                  marginLeft: '5px',
                  padding: '10px',
                  width: '50%',
                  borderRadius: '5px',
                  border: '1px solid green',
                }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
            <label >end:</label><br></br>
              <input
                type="time"
                name="endTime"
                onChange={handleInputChange}
                value={newEvent.endTime || ''}
                style={{
                  marginRight: '5px',
                  padding: '10px',
                  width: '50%',
                  borderRadius: '5px',
                  border: '1px solid green',
                }}
              />
              <select
                name="endAmPm"
                onChange={handleInputChange}
                value={newEvent.endAmPm || 'AM'} // default to AM
                style={{
                  marginLeft: '5px',
                  padding: '10px',
                  width: '50%',
                  borderRadius: '5px',
                  border: '1px solid green',
                }}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            <label style={{ marginBottom: '5px', display: 'block' }}>Location:</label>
            <select
              name="location"
              onChange={handleInputChange}
              value={newEvent.location || ''}
              style={{
                marginBottom: '10px',
                padding: '10px',
                width: '100%',
                borderRadius: '5px',
                border: '1px solid green',
              }}
            >
              <option value="">Select Location</option>
              <option value="Location 1">school</option>
              <option value="Location 2">ground</option>
              <option value="Location 3">college</option>
              <option value="Location 4">covil</option>
            </select>

            <label style={{ marginBottom: '5px', display: 'block' }}>Description:</label>
            <textarea
              name="description"
              onChange={handleInputChange}
              value={newEvent.description || ''}
              style={{
                marginBottom: '10px',
                padding: '10px',
                width: '100%',
                borderRadius: '5px',
                border: '1px solid green',
              }}
            ></textarea>

            <button
              type="button"
              onClick={handleAddEvent}
              style={{
                backgroundColor: '#007bff',
                color: '#fff',
                padding: '10px',
                cursor: 'pointer',
                border: 'none',
                width: '100%',
                borderRadius: '5px',
              }}
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Createevent;
