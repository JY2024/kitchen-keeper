import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";

export const FoodItemCard = ({
  name,
  expDate,
  imgUrl,
  group,
  quantity,
  desc,
}) => {
  let foodName = name;
  let foodExpDate = expDate;
  let foodImageUrl = imgUrl;
  let foodGroup = group;
  let foodQuantity = quantity;
  let foodDesc = desc;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            J
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={foodGroup}
        subheader={foodExpDate}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography
          component="p"
          sx={{ fontSize: "20px", fontWeight: "300", marginLeft: "8px" }}
        >
          {foodName}
        </Typography>
        <Typography
          component="p"
          sx={{ fontSize: "15px", fontWeight: "300", marginRight: "16px", marginTop: "6px" }}
        >
          Quantity: {foodQuantity}
        </Typography>
      </Box>

      <CardMedia
        component="img"
        height="194"
        image={foodImageUrl}
        alt={foodDesc}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {foodDesc}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FoodItemCard;