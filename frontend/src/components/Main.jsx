import React, { useState } from "react";
import { Box, Button, styled } from "@mui/material";
import FoodChartDisplay from "./FoodChartDisplay.jsx";

const StyledButton = styled(Button)(({ theme }) => ({
  color: "black",
  borderColor: "#1e1e1e",
  "&:hover": {
    backgroundColor: "#fafafa",
    color: "#1e1e13",
  },
}));

const Main = () => {
  // can modify the food groups if necessary!
  const defaultData = [
    { id: 1, value: 10, label: "Vegetables", color: "#39892f" }, // can add colors here too
    { id: 2, value: 15, label: "Fruits", color: "#c01f25" },
    { id: 3, value: 20, label: "Dairy", color: "#08629a" },
    { id: 4, value: 25, label: "Meat", color: "#6b2c91" },
    { id: 5, value: 30, label: "Drinks", color: "#00FFFF" },
    { id: 6, value: 35, label: "Other", color: "#e96d1e" },
  ];

  const [foodChartDisplay, setFoodChartDisplay] = useState(false);
  const [foodItems, setFoodItems] = useState(defaultData);

  const handleFoodChart = async () => {
    /** when connecting to Django server instead of using
     * json server, make sure the endpoint url below is correct
     * */

    // Clicking the Display Chart button while the component is rendered,
    // will cause the chart to be removed from the screen
    if (foodChartDisplay) {
      setFoodChartDisplay(false);
      return;
    }

    const pid = 1;
    let url = `http://localhost:4000/food/${pid}`;

    let res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let json = await res.json();

    let data = JSON.parse(JSON.stringify(defaultData));

    data.forEach(group => {
      group['value'] = 0;
    });

    json.forEach(item => {
      if (item['group'] === "Vegetables") {
        data[0]['value'] += 1;
      }

      if (item['group'] === "Fruits") {
        data[1]['value'] += 1;
      }

      if (item['group'] === "Dairy") {
        data[2]['value'] += 1;
      }

      if (item['group'] === "Meat") {
        data[3]['value'] += 1;
      }

      if (item['group'] === "Honey") {
        data[4]['value'] += 1;
      }
    });

  
    // filter out food groups that the user does not have
    data = data.filter(group => group['value'] > 0);
    
    // set FoodItems to the json response
    setFoodItems(data);
    setFoodChartDisplay(true);
  };

  return (
    // Add breakpoints for buttons?
    <Box className="main-content">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          mt: 3,
        }}
      >
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
      <Box mt={3}>
        {foodChartDisplay && <FoodChartDisplay foodItems={foodItems} />}
      </Box>
    </Box>
  );
};

export default Main;
