import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import logo from './assets/logo.png';
import Home from './components/Home';
import HospitalDetails from './components/HospitalDetails';

function App() {
  return (
    <div>
      <AppBar position="static" style={{ height: "80px", backgroundColor: "black" ,width: "100vw", display: "flex", flexWrap: "wrap", margin: "1rem", marginLeft: "1rem"}}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <img src={logo} style={{ height: "60px" }} alt="" />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            <h1 style={{ color: 'white' }}>MedStart</h1>
          </Typography>
        </Toolbar>
      </AppBar>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospitalDetails/:hospitalId" element={<HospitalDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;



