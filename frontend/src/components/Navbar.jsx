import {
    AppBar,
    Avatar,
    Box,
    Button,
    Toolbar,
    Typography,
    styled,
  } from "@mui/material";
  import LunchDiningIcon from "@mui/icons-material/LunchDining";
  import { Link } from "react-router-dom";
  import { useEffect, useState } from "react";
  
  // import API to communicate to Django server
  import api from "../api";
  
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
  });
  
  const Navbar = () => {
    const [profilePicture, setProfilePicture] = useState(
      "https://images.unsplash.com/photo-1421790500381-fc9b5996f343?ixlib=rb-4.0.3"
    );
  
    useEffect(() => {
      // let res = api.get("/api/")
      const getUserProfilePicture = async () => {
        console.log("hello");
      }
  
      getUserProfilePicture();
    }, []);
    // Navbar items
    const navItems = ["Posts", "Meal Generator"];
  
    // links work, just need to route them to appropriate page
    const navLinks = ["/", "/meals"];
  
    const linkStyle = {
      textDecoration: "none",
      color: "white",
    };
  
    return (
      <AppBar position="sticky">
        <StyledToolbar>
          <Box className="navbar-logo-icon">
            <LunchDiningIcon sx={{ display: { xs: "block", sm: "none" } }} />
            <Link to="/" style={linkStyle}>
              <Typography
                component="p"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Kitchen Keeper
              </Typography>
            </Link>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box sx={{ display: { xs: "none", sm: "inline" } }} mr={8}>
              {navItems.map((item, i) => (
                <Link key={item} to={navLinks[i]}>
                  <Button key={item} sx={{ color: "#fff" }}>
                    {item}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Avatar
                  // https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cstinysrgb&w=1260&h=750&dpr=2
                  // https://images.unsplash.com/photo-1421790500381-fc9b5996f343?ixlib=rb-4.0.3
                  sx={{ width: 48, height: 48 }}
                  src="https://images.unsplash.com/photo-1421790500381-fc9b5996f343?ixlib=rb-4.0.3"
                />
              </Box>
            </Box>
          </Box>
        </StyledToolbar>
      </AppBar>
    );
  };
  
  export default Navbar;