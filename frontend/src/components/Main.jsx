import React from "react";
import { Box, Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  borderColor: "#1e1e1e",
  "&:hover": {
    backgroundColor: "#fafafa",
    color: "#1e1e13",
  },
}));

const Main = () => {

  const handleFoodChart = async () => {
    
    /** when connecting to Django server instead of using
     * json server, make sure the endpoint url below is correct
     * */

    const id = 1;

    let url = "http://localhost:8000/food/1";

    console.log(url);
    
    let res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
      },
    });

    let json = await res.json();
    return;
  };

  return (
    // Add breakpoints for buttons?
    <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
      <Box className="add-item-div">
        <StyledButton variant="outlined">Add Item</StyledButton>
      </Box>
      <Box className="display-list-div">
        <StyledButton variant="outlined">Display List</StyledButton>
      </Box>
      <Box className="food-chart-div">
        <StyledButton variant="outlined" onClick={handleFoodChart}>
          Food Chart
        </StyledButton>
      </Box>
    </Box>
  );
};

export default Main;
