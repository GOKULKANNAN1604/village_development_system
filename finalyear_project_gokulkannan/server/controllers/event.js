const mongoose =require('mongoose')
const {Event} = require('../models/user');
exports.CreateEvent =  async (req, res) => {
    try {
      const newEvent = req.body;
      const event = await Event.create(newEvent);
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  exports.FetchEvent =  async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.UpdateStatus =  async (req, res) => {
    const { eventId } = req.params;
    const { status } = req.body;
  
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { status },
        { new: true }
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  exports.UpdatedEventData =  async (req, res) => {
    const { eventId } = req.params;
    const updatedEventData = req.body;
  
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        updatedEventData,
        { new: true }
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  exports.DeletedEvent =  async (req, res) => {
    const { eventId } = req.params;
  
    try {
      const deletedEvent = await Event.findByIdAndDelete(eventId);
  
      if (!deletedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }