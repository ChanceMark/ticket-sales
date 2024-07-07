// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      textDecoration: 'none', // Remove underline from links
      color: 'inherit', // Inherit color from parent
    },
  }));
  
const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" className={classes.title} component={Link} to="/">
                Event Ticket Sales
            </Typography>
            {/* <Button color="inherit" component={Link} to="/events">Events</Button>
            <Button color="inherit" component={Link} to="/checkout">CheckOut</Button> */}
            {/* <Button color="inherit" component={Link} to="/admin">Admin</Button> */}
            
            {/* Add more buttons as needed */}
            </Toolbar>
        </AppBar>
        </div>
    );
};
  
export default Navbar;
