import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, CircularProgress } from '@mui/material';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then(response => {
        // console.log("--------------------",response.data);
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message); // Handle error state
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />; // Show a spinner while loading
  if (error) return <div>Error: {error}</div>; // Show error message if request fails

  const formattedDate = new Date(event.date);
  const formattedDateString = formattedDate.toLocaleDateString();
  const formattedTimeString = formattedDate.toLocaleTimeString();

  return (
    <div>
      <Typography variant="h4" component="h1">
        {event.title}
      </Typography>
      <Typography variant="h6" component="h2">
        {formattedDateString} at {formattedTimeString}
      </Typography>
      <Typography variant="body1" component="p">
        {event.description}
      </Typography>
      <img src={event.image} alt={event.title} />
      <div>
        {event.tickets.map(ticket => (
          <Button key={ticket.id} variant="contained" color="primary">
            {ticket.type} - {ticket.price} - {ticket.available} left
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
