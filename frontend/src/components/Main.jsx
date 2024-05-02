import { useState } from "react";
import { Box, Button, styled } from "@mui/material";
import FoodChartDisplay from "./FoodChartDisplay.jsx";
import DisplayList from "./DisplayList.jsx";

const StyledButton = styled(Button)(() => ({
  color: "black",
  borderColor: "#1e1e1e",
  "&:hover": {
    backgroundColor: "#fafafa",
    color: "#1e1e13",
  },
}));


const Main = () => {
  // Current food groups: "Vegetables", "Fruits", "Dairy",
  // "Meat", "Drinks", and "Other"
  const defaultData = [
    { id: 1, value: 10, label: "Vegetables", color: "#39892f" },
    { id: 2, value: 15, label: "Fruits", color: "#c01f25" },
    { id: 3, value: 20, label: "Dairy", color: "#08629a" },
    { id: 4, value: 25, label: "Meat", color: "#6b2c91" },
    { id: 5, value: 30, label: "Grains", color: "#F5DEB3"},
    { id: 6, value: 35, label: "Drinks", color: "#00FFFF" },
    { id: 7, value: 40, label: "Other", color: "#e96d1e" },
  ];

  // state variables for food chart component
  const [foodChartDisplay, setFoodChartDisplay] = useState(false);
  const [foodItems, setFoodItems] = useState(defaultData);

  // state variables for display list component
  // add default idtems for displayItems
  const [isDisplayList, setIsDisplayList] = useState(true);
  const [displayItems, setDisplayItems] = useState([]);

  const handleDisplayList = async () => {    
    setIsDisplayList(true);
    setFoodChartDisplay(false);
    
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

    console.log(json);

    setDisplayItems(json);
    setIsDisplayList(true);
    return;
  }
  
  const handleFoodChart = async () => {
    // when connecting to Django server instead of using
    // json server, make sure the endpoint url below is correct

    // Clicking the Display Chart button while the component is rendered,
    // will cause the chart to be removed from the screen
    if (foodChartDisplay) {
      setFoodChartDisplay(false);
      setIsDisplayList(true);
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

    // will add error checking here

    let data = JSON.parse(JSON.stringify(defaultData));

    data.forEach((group) => {
      group["value"] = 0;
    });

    // For each food item that the user has 
    // from the database, increment a food
    // group by one to account for
    // that food item's type
    json.forEach((item) => {
      if (item["group"] === "Vegetables") {
        data[0]["value"] += 1;
      }

      if (item["group"] === "Fruits") {
        data[1]["value"] += 1;
      }

      if (item["group"] === "Dairy") {
        data[2]["value"] += 1;
      }

      if (item["group"] === "Meat") {
        data[3]["value"] += 1;
      }

      if (item["group"] === "Honey") {
        data[4]["value"] += 1;
      }
    });

    // filter out food groups that the user does not have
    data = data.filter((group) => group["value"] > 0);

    // set FoodItems to the json response
    setFoodItems(data);
    setFoodChartDisplay(true);

    // set other displayComponents to false
    setIsDisplayList(false);
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
          <StyledButton variant="outlined" onClick={handleDisplayList}>Display List</StyledButton>
        </Box>
        <Box className="food-chart-div">
          <StyledButton variant="outlined" onClick={handleFoodChart}>
            Food Chart
          </StyledButton>
        </Box>
      </Box>
      <Box mt={3}>
        {isDisplayList && <DisplayList displayItems={displayItems} />}
      </Box>
      <Box mt={3}>
        {foodChartDisplay && <FoodChartDisplay foodItems={foodItems} />}
      </Box>
    </Box>
  );
};

export default Main;
