import React, { useState, useRef } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { Grid, Button, Typography, Chip, IconButton } from '@mui/material';
import Slider from 'react-slick'; // for recipe carousel
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; // right arrow icon

export default function SocialPage() {
    // const [searchQuery, setSearchQuery] = useState(""); 
    // const [recipes, setRecipes] = useState([]);
    // const [startIndex, setStartIndex] = useState(0);

    // DUMMY DATA

    const trendingTags = ["Curry", "Shrimp", "Pork"];

    const recipes = [
        { id: 1, title: "Kimchi Stew", tags: ["Stew", "Spicy"], image: "../assets/kimchi-stew.jpg", profilePicture: "../assets/profile.jpg" },
        { id: 2, title: "Spaghetti", tags: ["Carbs", "Healthy"], image: "../assets/kimchi-stew.jpg", profilePicture: "../assets/profile.jpg" },
        { id: 3, title: "Strawberry Ice Cream", tags: ["Dessert", "Fruit"], image: "../assets/kimchi-stew.jpg", profilePicture: "../assets/profile.jpg" }
    ];

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
    const onSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const onSearchClick = () => {
        
    };

    // ------------------ POSTING --------------------------------------------------
    const handleCreatePostClick = () => {
        
    };

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
                            >
                                Create Post
                            </Button>
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
                        {recipes.map(recipe => (
                            <div key={recipe.id}>
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))}
                    </Slider>
                    {/* Right Arrow IconButton */}
                    <IconButton 
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} 
                        onClick={onClickNext}
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>

        
    );
}