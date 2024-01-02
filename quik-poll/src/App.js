import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Logo from './static/images/quikpoll-logo.jpeg';
import './styles/App.css';

export default function App() {
  return (
    <div className="App">
      <div className='header'>
        <img src={Logo}></img>
        <h1>Welcome to the QuikPoll app!</h1>
      </div>
      <div className='body'>
        <div className='btn-div'>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <Button variant="contained">Create a poll.</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">Join a poll.</Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
