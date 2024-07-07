// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/events')
      .then(response => {
        // console.log("--------------------",response.data);
        setEvents(response.data);
      })
      .catch(error => {
        setError('Error fetching events. Please try again later.');
        console.error('Error fetching events:', error);
      });
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div>
      {error && <p>{error}</p>}
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default HomePage;
