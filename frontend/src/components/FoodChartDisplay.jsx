import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const FoodChartDisplay = ({ foodItems }) => {
  // data can be the prop that gets the data from the user
  const data = foodItems;

  return (
    <Box className="food-chart-div" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "antiquewhite"}}>
      <Box textAlign="center">
        <Typography variant="h6">Food Chart Display Babyyyyy</Typography>
      </Box>
      <Box>
        <PieChart
          series={[
            {
              data, // prop can go here here
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={200}
        />
      </Box>
    </Box>
  );
};

export default FoodChartDisplay;
