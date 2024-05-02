import { Box } from "@mui/material";
import Navbar from "../components/Navbar.jsx";

// fix import here.
// import Main from "./Main.jsx";

const HomePage = () => {
  return (
    <Box className="home-page">
      <Navbar />
      <h1>Hello!</h1>
      {/* <Main /> */}
    </Box>
  );
};

export default HomePage;