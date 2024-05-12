import { useState } from "react";
import { Box, Button, styled } from "@mui/material";
import FoodChartDisplay from "../components/FoodChartDisplay.jsx";
import DisplayList from "../components/DisplayList.jsx";
import AddItem from "../components/AddItem.jsx";
import api from "../api";

const StyledButton = styled(Button)(() => ({
  color: "black",
  borderColor: "#1e1e1e",
  "&:hover": {
    backgroundColor: "#fafafa",
    color: "#1e1e13",
  },
}));

const Home = () => {
  // Current food groups: "Vegetables", "Fruits", "Dairy",
  // "Meat", "Drinks", and "Other"

  const defaultData = [
    { id: 1, value: 10, label: "Vegetables", color: "#39892f" },
    { id: 2, value: 15, label: "Fruits", color: "#c01f25" },
    { id: 3, value: 20, label: "Dairy", color: "#08629a" },
    { id: 4, value: 25, label: "Meat", color: "#6b2c91" },
    { id: 5, value: 30, label: "Grains", color: "#F5DEB3" },
    { id: 6, value: 35, label: "Drinks", color: "#00FFFF" },
    { id: 7, value: 40, label: "Other", color: "#e96d1e" },
  ];

  // state variables for add item component
  const [isAddItem, setIsAddItem] = useState(false);

  // state variables for display list component
  // add default items for displayItems
  const [isDisplayList, setIsDisplayList] = useState(true);
  const [displayItems, setDisplayItems] = useState([]);

  // state variables for food chart component
  const [isFoodChartDisplay, setIsFoodChartDisplay] = useState(false);
  const [foodItems, setFoodItems] = useState(defaultData);

  const handleAddItem = async () => {
    if (isAddItem) {
      setIsAddItem(false);
      setIsDisplayList(true);
      setIsFoodChartDisplay(false);
    } else {
      setIsAddItem(true);
      setIsDisplayList(false);
      setIsFoodChartDisplay(false);
    }
  };

  const getFoodItems = () => {
    api
      .get("/api/food_items/")
      .then((res) => res.data)
      .then((data) => {
        setDisplayItems(data);
        setIsDisplayList(true);

        // set other displayComponents to false
        setIsAddItem(false);
        setIsFoodChartDisplay(false);
      })
      .catch((err) => alert(err));
  };

  const getFoodItemsForPieChart = () => {
    api
      .get("/api/food_items/")
      .then((res) => res.data)
      .then((json) => {
        let jsonData = JSON.parse(JSON.stringify(json));

        let data = JSON.parse(JSON.stringify(defaultData));
        
        data.forEach((group) => {
          group["value"] = 0;
        });

        // For each food item that the user has
        // from the database, increment a food
        // group by one to account for
        // that food item's type

        jsonData.forEach((item) => {
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
        let foodData = data.filter((group) => group["value"] > 0);

        // set FoodItems to the json response
        setFoodItems(foodData);
        setIsFoodChartDisplay(true);

        // set other displayComponents to false
        setIsAddItem(false);
        setIsDisplayList(false);
      });
  };

  const handleDisplayList = async () => {
    setIsAddItem(false);
    setIsDisplayList(true);
    setIsFoodChartDisplay(false);

    getFoodItems();
  };

  const handleFoodChart = async () => {
    // Clicking the Display Chart button while the component is rendered,
    // will cause the chart to be removed from the screen
    if (isFoodChartDisplay) {
      setIsAddItem(false);
      setIsFoodChartDisplay(false);
      setIsDisplayList(true);
      return;
    }

    getFoodItemsForPieChart();
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
          <StyledButton variant="outlined" onClick={handleAddItem}>
            Add Item
          </StyledButton>
        </Box>
        <Box className="display-list-div">
          {/* onClick={handleDisplayList} */}
          <StyledButton variant="outlined" onClick={handleDisplayList}>
            Display List
          </StyledButton>
        </Box>
        <Box className="food-chart-div">
          <StyledButton variant="outlined" onClick={handleFoodChart}>Food Chart</StyledButton>
        </Box>
      </Box>
      <Box mt={3}>{isAddItem && <AddItem />}</Box>
      <Box mt={3}>
        {isDisplayList && <DisplayList displayItems={displayItems} />}
      </Box>
      <Box mt={3}>
        {isFoodChartDisplay && <FoodChartDisplay foodItems={foodItems} />}
      </Box>
    </Box>
  );
};

export default Home;
