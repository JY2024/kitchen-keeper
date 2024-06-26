import { Box, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const FoodChartDisplay = ({ foodItems = [] }) => {
  const handleClick = (e) => {
    // render display list component when clicking on food item or show the items below
    console.log(e.target);
  };
  // data can be the prop that gets the data from the user
  const data = foodItems;

  return (
    <Box
      border="2px solid black"
      borderRadius="8px"
      height="60svh"
      width="80%"
      margin="auto"
      paddingTop="2rem"
      backgroundColor="#F4F5FA"
      sx={{ "&:hover": {backgroundColor: "#eaebf0",  } }}
    >
      <Box className="food-chart-header">
        <Typography variant="h6" align="center" mr={3}>
          MyKitchen Graph
        </Typography>
      </Box>
      <Box className="food-chart-div">
        <PieChart
          onItemClick={(e) => handleClick(e)}
          series={[
            {
              arcLabel: (item) => `(${item.value})`,
              arcLabelRadius: 70,
              arcLabelMinAngle: 45,
              data, // prop can go here here
              highlightScope: { faded: "global", highlighted: "item" },
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: "gray",
              },
            },
          ]}
          sx={{
            marginTop: 3,
            marginLeft: 8,
            [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontWeight: 'bold',
              },

          }}
          height={250}
        />
      </Box>
    </Box>
  );
};

export default FoodChartDisplay;
