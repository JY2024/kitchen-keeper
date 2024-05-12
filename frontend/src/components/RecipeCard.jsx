import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const navigateTo = (data) => {
    navigate("/selectedPost", { state: data });
  };
  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{
        height: "fit-content",
        minHeight: "25vw",
      }}
    >
      {/* Recipe Image */}
      <Box
        display="flex"
        justifyContent="center"
        marginBottom="8px"
        marginTop="8px"
        style={{
          maxHeight: "150px",
        }}
      >
        <img src={recipe.img.split(" ").join("+")} width={200} height={150} />
      </Box>

      {/* Card Body */}
      <CardContent style={{ backgroundColor: "#e0f7d7" }}>
        {/* Card Title */}
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>
        {/* Tags Chips */}
        <div>
          {recipe.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
            />
          ))}
        </div>
      </CardContent>
      <div>
        <Box display="flex" justifyContent="space-between">
          {/* Read More Button */}
          <CardActions>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              style={{ marginRight: "40px" }}
              onClick={() => navigateTo(recipe)}
            >
              Read More
            </Button>
          </CardActions>
        </Box>
      </div>
    </Card>
  );
}
