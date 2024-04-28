import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";

import React, { useState } from "react";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import BasicMenu from "./BasicMenu.jsx";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#343a44",
});

const Navbar = () => {
  const navItems = ["Posts", "Meal Generator"];

  // links work, just need to route them to appropriate page
  const navLinks = ["/", "https://google.com"];

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Box class="navbar-logo-icon">
          <LunchDiningIcon sx={{ display: { xs: "block", sm: "none" } }} />
          <Typography
            component="p"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Kitchen Keeper
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box sx={{ display: { xs: "none", sm: "inline" } }} mr={8}>
            {navItems.map((item, i) => (
              <Button key={item} href={navLinks[i]} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Avatar
                sx={{ width: 48, height: 48 }}
                src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cstinysrgb&w=1260&h=750&dpr=2"
              />
            </Box>
          </Box>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
