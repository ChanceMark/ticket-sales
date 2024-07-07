// src/components/EventCard.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="h2">
        {event.title}
      </Typography>
      <Typography color="textSecondary">
        {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
      </Typography>
      <Typography variant="body2" component="p">
        {event.description}
      </Typography>
      <Link to={`/event/${event._id}`}>
        <Button variant="contained" color="primary">More Info</Button>
      </Link>
    </CardContent>
  </Card>
);

export default EventCard;
