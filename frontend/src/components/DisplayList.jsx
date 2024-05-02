import { List, ListItem, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DisplayList = ({ displayItems = [] }) => {
  let foodItems = displayItems;

  const handleClick = async () => {
    return;
  };

  return (
    <List>
      {foodItems.map((food) => (
        <ListItem key={food.fid} className="fade-in-image">
          <Paper square={false} sx={{ height: "500px", width: "500px"}} display="flex">
            <Typography variant="h6" component="p" color="#333">
              {food.name}
            </Typography>
              <img className="foodImage" style={{ borderRadius: '8px' }} height="250px" width="250px" src={food.unsplash_url} alt={food.name} />
            <DeleteIcon onClick={handleClick} />
          </Paper>
        </ListItem>
      ))}
    </List>
  );
};

export default DisplayList;
