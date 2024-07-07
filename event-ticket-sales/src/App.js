// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboard from './pages/AdminDashboard';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/event/:id" element={<EventPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </Router>
);

export default App;
