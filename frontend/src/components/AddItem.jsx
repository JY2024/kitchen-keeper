import { Button, createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import api from "../api";

const theme = createTheme({
  palette: {
    lightblue: {
      main: "#039be5",
    },
  },
});

const AddItem = () => {
  const handleClick = async () => {
    let foodName = document.getElementById("food-name").value;
    let foodGroup = document.getElementById("food-group").value;
    let foodQuantity = document.getElementById("food-quantity").value;
    let foodImage = document.getElementById("food-image").value;
    let foodExpDate = document.getElementById("food-exp-date").value;
    let foodDesc = document.getElementById("food-desc").value;

    let postBody = {
      name: foodName,
      group: foodGroup,
      exp_date: foodExpDate,
      quantity: foodQuantity,
      unsplash_url: foodImage,
      desc: foodDesc,
    };

    api.post("/api/food_items/", postBody).then((res) => {
      if (res.status === 201) alert("Food item created!");
      else alert("Failed to create food item.");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        display="flex"
        justifyContent="center"
        width="auto"
      >
        <Box className="textfields-div">
          <Box>
            <TextField
              id="food-name"
              color="lightblue"
              label="Name"
              placeholder="e.g. orange"
              multiline
              variant="standard"
            />
          </Box>
          <Box>
            <TextField
              id="food-group"
              color="lightblue"
              label="Group"
              placeholder="e.g. fruits"
              multiline
              variant="standard"
            />
          </Box>
          <Box>
            <TextField
              id="food-quantity"
              color="lightblue"
              label="Food Quantity"
              placeholder="e.g. 30, 4, 8, ..."
              multiline
              variant="standard"
            />
          </Box>
          <Box>
            <TextField
              id="food-image"
              color="lightblue"
              label="Image"
              placeholder="e.g. orange-bowl.png"
              multiline
              variant="standard"
            />
          </Box>
          <Box>
            <TextField
              id="food-exp-date"
              color="lightblue"
              label="Expiration Date"
              placeholder="mm/dd/yyyy"
              multiline
              variant="standard"
              type="date"
            />
          </Box>
          <Box>
            <TextField
              id="food-desc"
              color="lightblue"
              label="Description"
              placeholder="e.g. a refreshing bowl of oranges"
              multiline
              variant="standard"
              sx={{ width: "auto" }}
            />
          </Box>
          <Box left={8}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#039be5", left: "60px", margin: "10px" }}
              onClick={handleClick}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AddItem;