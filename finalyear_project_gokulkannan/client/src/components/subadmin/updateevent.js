import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubAdminNavbar from './navbarsubadmin';

const UpdateEventList = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false); // State to track if the edit event field is open
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('auth/fetchevent')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleUpdateStatus = (eventId, newStatus) => {
    axios
      .put(`auth/updatestatus/${eventId}`, { status: newStatus })
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? { ...event, status: newStatus } : event
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteEvent = (eventId) => {
    axios
      .delete(`auth/deleteevent/${eventId}`)
      .then((response) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
        alert(`This event deleted successfully`);
      })
      .catch((error) => console.error(error));
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = events.find((event) => event._id === eventId);
    setEditEvent(eventToEdit || {});
    setIsEditOpen(true);
  };

  const handleUpdateEvent = () => {
    axios
      .put(`auth/updateeventdata/${editEvent._id}`, editEvent)
      .then((response) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === editEvent._id ? { ...event, ...editEvent } : event
          )
        );
        alert(`Event updated successfully`);
        setEditEvent({});
        setIsEditOpen(false);
      })
      .catch((error) => console.error(error));
  };

  const handleInputChange = (e) => {
    setEditEvent({
      ...editEvent,
      [e.target.name]: e.target.value,
    });
  };

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div style={{ marginLeft: '0px' }}>
        <SubAdminNavbar />
      </div>
      <div style={{ marginTop: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#555', paddingBottom: '10px', textAlign: 'center', fontSize: '40px' }}>
          All Events
        </h2>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search by event status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {filteredEvents.map((event, index) => (
            <div key={event._id} style={cardStyle}>
              <h3 style={{ color: '#007bff' }}>Event Title: {event.title}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Description: {event.description}</p>
              <p>Start Time: {event.startTime}</p>
              <p>End Time: {event.endTime}</p>
              <p>Status: {event.status || 'Pending'}</p>
              {event.status === 'Completed' ? (
                <p>Action: Status Completed</p>
              ) : (
                <div>
                  {/* Dropdown menu for status update */}
                  <select onChange={(e) => handleUpdateStatus(event._id, e.target.value)}>
                    <option value=""></option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <button onClick={() => handleDeleteEvent(event._id)} style={deleteButtonStyle}>
                    Delete event
                  </button>
                  <button onClick={() => handleEditEvent(event._id)} style={editButtonStyle}>
                    Edit event
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {isEditOpen && Object.keys(editEvent).length > 0 && (
          <div style={editCardStyle}>
            <h3 style={{ color: '#007bff' }}>Edit Event</h3>
            <form>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                value={editEvent.title || ''}
                style={inputStyle}
              />

              <label>Date:</label>
              <input
                type="date"
                name="date"
                onChange={handleInputChange}
                value={editEvent.date || ''}
                style={inputStyle}
              />

              <label>Location:</label>
              <input
                type="text"
                name="location"
                onChange={handleInputChange}
                value={editEvent.location || ''}
                style={inputStyle}
              />

              <label>Description:</label>
              <textarea
                name="description"
                onChange={handleInputChange}
                value={editEvent.description || ''}
                style={inputStyle}
              ></textarea>

              <button type="button" onClick={handleUpdateEvent} style={updateButtonStyle}>
                Update Event
              </button>
              <button type="button" onClick={() => setIsEditOpen(false)} style={updateButtonStyle}>
                Back
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

// Styles
const cardStyle = {
  border: '2px solid #007bff',
  borderRadius: '10px',
  padding: '20px',
  margin: '10px',
  width: '330px',
  boxShadow: '0 4px 8px rgba(5, 0, 1, 0.1)',
  backgroundColor: '#fff',
};

const editCardStyle = {
  border: '2px solid #007bff',
  borderRadius: '8px',
  padding: '20px',
  marginTop: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const inputStyle = {
  marginBottom: '15px',
  padding: '15px',
  width: '100%',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const updateButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '15px',
  cursor: 'pointer',
  border: 'none',
  width: '90%',
  borderRadius: '5px',
  marginTop: '10px',
};

const deleteButtonStyle = {
  backgroundColor: 'yellow',
  color: 'black',
  padding: '5px',
  cursor: 'pointer',
  border: 'none',
  width: '50%'
};

const editButtonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '5px',
  cursor: 'pointer',
  border: 'none',
};

export default UpdateEventList;
