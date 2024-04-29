import { Box } from '@mui/material';
import React from 'react'
import Navbar from './Navbar.jsx';
import Main from './Main.jsx';

const HomePage = () => {
  return (
    <Box>
        <Navbar />
        <Box className="main-div">
            <Main />
        </Box>
    </Box>
  )
}

export default HomePage;
