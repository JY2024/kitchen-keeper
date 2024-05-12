import { Box, Grid } from "@mui/material";
import FoodItemCard from "./FoodItemCard.jsx";

const DisplayList = ({ displayItems = [] }) => {
  let foodItems = displayItems;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="center"
      >
        {foodItems.map((foodItem, index) => (

          <Grid item xs={2} sm={4} md={4} key={index}>
            <FoodItemCard
              key={foodItem.fid}
              name={foodItem.name}
              expDate={foodItem.expDate}
              imgUrl={foodItem.unsplash_url}
              group={foodItem.group}
              quantity={foodItem.quantity}
              desc={foodItem.desc}
              className="fade-in-paper"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DisplayList;
