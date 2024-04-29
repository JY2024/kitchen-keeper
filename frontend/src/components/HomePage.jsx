import { Box } from "@mui/material";
import React from "react";
import Navbar from "./Navbar.jsx";
import Main from "./Main.jsx";

const HomePage = () => {
  return (
    <Box className="home-page">
      <Navbar />
      <Main />
    </Box>
  );
};

export default HomePage;
