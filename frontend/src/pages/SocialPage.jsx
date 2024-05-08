import React, { useState, useEffect, useRef } from "react";
import api from "../api";
// components
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
// visual
import { Grid, Button, Typography, Chip, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import Slider from 'react-slick'; // for recipe carousel
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; // right arrow icon
import ChipInput from 'material-ui-chip-input'

export default function SocialPage() {
    // const [searchQuery, setSearchQuery] = useState(""); 
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [recipes, setRecipes] = useState([]);
    const [ingredMultiline, setMultiline] = useState("");

    useEffect(() => {
        getRecipes();
    }, []);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleRecipePost = () => {

    }

    const getRecipes = () => {
        api
            .get("/api/recipes/")
            .then((res) => res.data)
            .then((data) => {
                setRecipes(data);
            })
            .catch((err) => alert(err));
    };

    const createRecipe = (e) => {
        e.preventDefault();
        api
          .post("/api/recipes/", {
            "title": "test",
            "tags": ["tag1", "tag2"],
            "description": "dckjnjdncjknd",
            "ingredients": ["ing1", "ing2"],
            "instructions": "Just add water",
            "unsplash_url": "https://unsplash.com/photos/cooked-dish-on-table-k6VCwawxgMg"
        })
          .then((res) => {
            if (res.status === 201) alert("Recipe created!");
            else alert("Failed to make recipe.");
            getRecipes();
          })
          .catch((err) => alert(err));
      };
    
    
    
    // const [startIndex, setStartIndex] = useState(0);

    // const getRecipes = () => {
    //     api
    //     .get("/api/recipes/")
    //     .then((res) => res.data)
    //     .then((data) => setRecipes(data))
    //     .catch((err) => alert(err));
    // };

    // const createRecipe = (e) => {
    //     e.preventDefault();
    //     api
    //       .post("/api/recipes/", { title: "Kimchi Stew", description: "This is the best stew ever!", ingredients: ["kimchi", "water"], instructions: "Put the kimchi in the water and heat it up", tags: ["Spicy", "Stew"], author: "Jay"})
    //       .then((res) => {
    //         if (res.status === 201) alert("Note created!");
    //         else alert("Failed to make note.");
    //         // getRecipes();
    //       })
    //       .catch((err) => alert(err));
    //   };

    // const createRecipe = (e) => {
    //     e.preventDefault();
    //     let body = JSON.stringify({ title: "Kimchi Stew", description: "This is the best stew ever!", ingredients: ["kimchi", "water"], instructions: "Put the kimchi in the water and heat it up", tags: ["Spicy", "Stew"], author: "Jay"});
    //     console.log(body);
    //     api
    //     .post("/api/recipes/", body, {
    //         accept: "application/json",
    //         mode: "cors"
    //     })
    //     .then((res) => {
    //         console.log(res.status);
    //         console.log(res.body);
    //         if (res.status === 201) alert("Recipe created!");
    //         else alert("Failed to make recipe.");
    //         // getRecipes();
    //     })
    //     .catch((err) => alert(err));
    // };

    // -------------------------------DUMMY DATA-------------------------------------------

    const trendingTags = ["Curry", "Shrimp", "Pork"];

    // const recipes = [
    //     { id: 1, title: "Kimchi Stew", tags: ["Stew", "Spicy"], image: "../assets/kimchi-stew.jpg", profilePicture: "../assets/profile.jpg" },
    //     { id: 2, title: "Spaghetti", tags: ["Carbs", "Healthy"], image: "../assets/kimchi-stew.jpg", profilePicture: "../assets/profile.jpg" },
    //     { id: 3, title: "Strawberry Ice Cream", tags: ["Dessert", "Fruit"], image: "../assets/kimchi-stew.jpg", profilePicture: "../assets/profile.jpg" }
    // ];

    // ------------------ SLIDER (food carousel) -------------------------------------
    const sliderRef = useRef(null); // reference for slider component
    
    // on-click, 
    const onClickNext = () => {
        sliderRef.current.slickNext(); // slide to next slides
    };

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3, // Show 3 slides at a time
        slidesToScroll: 3,
    };

    // ------------------ SEARCHING --------------------------------------------------
    // const onSearchChange = (e) => {
    //     setSearchQuery(e.target.value);
    // };

    // const onSearchClick = () => {
        
    // };

    // // ------------------ POSTING --------------------------------------------------
    // const handleCreatePostClick = () => {
        
    // };

    return (
        <div style={{ paddingTop: '20px' }}>
            <Grid container spacing={10}>
                {/* Top Row (Row 1) */}
                <Grid item xs={12}>
                    {/* Search Bar */}
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={8}>
                            <SearchBar></SearchBar>
                        </Grid>
                        {/* Create Post Button */}
                        <Grid item xs={4} container>
                            <Button 
                                variant="contained"
                                style={{ backgroundColor: 'green', color: 'white', fontStyle: 'italic' }}
                                onClick={handleClickOpen}
                            >
                                Create Post
                            </Button>
                            {/* Dialog for making post */}
                            <Dialog open={dialogOpen} onClose={handleClose} fullWidth={true} maxWidth={"sm"}>
                                <DialogTitle>Create Post</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Title</DialogContentText>
                                    <TextField/>
                                    <DialogContentText>Add tags here...</DialogContentText>
                                    <ChipInput
                                        defaultValue={['foo', 'bar']}
                                        onChange={(chips) => {}}
                                    />
                                    <DialogContentText>Add description here...</DialogContentText>
                                    <TextField/>
                                    <DialogContentText>Add ingredients here...</DialogContentText>
                                    <TextField
                                        multiline
                                        value={ingredMultiline}
                                        onChange={e => setMultiline(e.target.value)}
                                    />
                                    <DialogContentText>Add instructions here...</DialogContentText>
                                    <TextField/>
                                    <DialogContentText>Upload an image</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleRecipePost}>
                                        Post
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Second Row */}
                <Grid item xs={3}>
                    {/* Trending Tags Section */}
                    <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '1rem', maxWidth: '150px'}}>
                        <Typography variant="h6" gutterBottom>
                            Trending tags
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {trendingTags.map(tag => (
                                <Chip 
                                    key={tag} 
                                    label={tag} 
                                    variant="outlined" 
                                    style={{ backgroundColor: '#333', color: 'white', marginBottom: '0.5rem' }} 
                                />
                            ))}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={9} style={{ position: 'relative' }}>
                    {/* Recipe Carousel Section */}
                    <Typography variant="h6" gutterBottom>
                        Explore recipes!
                    </Typography>
                    <Slider ref={sliderRef} {...sliderSettings}>
                        {recipes.map((recipe) => {
                            return (
                            <div key={recipe.id}>
                                <RecipeCard recipe={recipe} key={recipe.id}/>
                            </div>
                        )})}
                    </Slider>
                    {/* Right Arrow IconButton */}
                    <IconButton 
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} 
                        onClick={() => {}}
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>

        
    );
}