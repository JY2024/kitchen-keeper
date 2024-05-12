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
  
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
  });
  
  const Navbar = () => {
    // Navbar items
    const navItems = ["Posts", "Meal Generator", "Explore Recipes"];
  
    // links work, just need to route them to appropriate page
    const navLinks = ["/", "https://google.com", "/social"];
  
    const linkStyle = {
      textDecoration: "none",
      color: "white",
    };
  
    return (
      <AppBar position="sticky" sx={{ marginBottom: "20px" }}>
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