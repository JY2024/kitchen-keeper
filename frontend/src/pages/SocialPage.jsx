import React, { useState, useEffect, useRef } from "react";
import api from "../api";
// components
// import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
// visual
import { Grid, Button, Typography, Chip, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import Slider from 'react-slick'; // for recipe carousel
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; // right arrow icon
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'; // right arrow icon

import ChipInput from 'material-ui-chip-input'
import SearchIcon from '@mui/icons-material/Search';

export default function SocialPage() {
    // const [searchQuery, setSearchQuery] = useState(""); 
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [recipes, setRecipes] = useState([]);
    const [ingredMultiline, setMultiline] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState("");
    const [filterOption, setFilterOption] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const searchRef = useRef("");

    useEffect(() => {
        getRecipes();
    }, []);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handlePostCreation = (e) => {
        createRecipe(e);
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

    const getRecipesFiltered = (filterOption, searchQuery) => {
        if (searchQuery === "") {
            getRecipes();
        }
        api
            .get("/api/recipes/")
            .then((res) => res.data)
            .then((data) => {
                searchQuery = searchQuery.toLowerCase().split(" ");
                if (filterOption === "title") {
                    const title_check = (title_string) => searchQuery.some(queryTerm => title_string.toLowerCase().includes(queryTerm));
                    setRecipes(data.filter(recipe => title_check(recipe.title)));
                } else if (filterOption === "tags") {
                    const tag_check = (tag_arr) => searchQuery.some(queryTerm => tag_arr.includes(queryTerm));
                    setRecipes(data.filter(recipe => tag_check(recipe.tags)));
                } else if (filterOption === "ingredients") {
                    const ingred_check = (ingred_arr) => searchQuery.some(queryTerm => {
                        if (ingred_arr.includes(queryTerm)) {
                            console.log("found a true")
                        }
                        return ingred_arr.includes(queryTerm);
                    });
                    setRecipes(data.filter(recipe => {
                        let ingreds = recipe.ingredients;
                        let ingreds2 = [];
                        ingreds.forEach((ingred_str) => {
                            ingreds2.push(ingred_str.split(" "));
                        }); 
                        console.log(ingreds2);
                        return ingred_check(ingreds2);
                    }));
                } else {
                    setRecipes(data);
                }
            })
            .catch((err) => alert(err));
    }

    const createRecipe = (e) => {
        e.preventDefault();
        api
            .post("/api/recipes/", { title, "tags": ["tag1"], description, "ingredients": ["rice", "seaweed"], instructions, "unsplash_url": "none"})
        //   .post("/api/recipes/", {
        //     "title": "test",
        //     "tags": ["tag1", "tag2"],
        //     "description": "dckjnjdncjknd",
        //     "ingredients": ["ing1", "ing2"],
        //     "instructions": "Just add water",
        //     "unsplash_url": "https://unsplash.com/photos/cooked-dish-on-table-k6VCwawxgMg"
        // })
          .then((res) => {
            if (res.status === 201) alert("Recipe created!");
            else alert("Failed to make recipe.");
            getRecipes();
            handleClose();
          })
          .catch((err) => alert(err));
      };
    
    
    
    const [startIndex, setStartIndex] = useState(0);

    // -------------------------------DUMMY DATA-------------------------------------------

    const trendingTags = ["Curry", "Shrimp", "Pork"];

    // ------------------ SLIDER (food carousel) -------------------------------------
    const sliderRef = useRef(null); // reference for slider component
    
    // on-click, 
    const onClickNext = () => {
        sliderRef.current.slickNext(); // slide to next slides
    };
    const onClickPrev = () => {
        sliderRef.current.slickPrev(); // slide to next slides
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

    const handleSearch = () => {
        let query = searchRef.current.value;
        getRecipesFiltered(filterOption, query);
    }

    
    function SearchBar() {
        return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
            <TextField
                label={<Typography variant="body1" fontStyle="italic">Search for posts...</Typography>}
                variant="outlined"
                onChange={() => {}} // setSearchQuery
                fullWidth
                InputProps={{
                    style: {
                    color: "gray",
                    borderRadius: 20
                    }
                }}
                inputRef={searchRef} 
            />
            </div>
            <IconButton onClick={handleSearch} size="large">
            <SearchIcon />
            </IconButton>
        </div>
        );
    }

    return (
        <div style={{ paddingTop: '20px' }}>
            <Grid container spacing={10}>
                {/* Top Row (Row 1) */}
                <Grid item xs={12}>
                    {/* Search Bar */}
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={2}>
                            Filter by:
                            <FormControl fullWidth>
                            <InputLabel id="search-select-label">Search by...</InputLabel>
                            <Select
                                labelId="search-select-label"
                                value={filterOption}
                                label="Filter by:"
                                onChange={(e) => setFilterOption(e.target.value)}
                            >
                                <MenuItem value={"title"}>Title</MenuItem>
                                <MenuItem value={"tags"}>Tags</MenuItem>
                                <MenuItem value={"ingredients"}>Ingredients</MenuItem>
                            </Select>
                            </FormControl>
                        </Grid>
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
                                    <TextField onChange={(e) => setTitle(e.target.value)}/>
                                    <DialogContentText>Add tags here...</DialogContentText>
                                    <ChipInput
                                        defaultValue={[]}
                                        onChange={(chips) => setTags(chips)} // chips is array of strings
                                    />
                                    <DialogContentText>Add description here...</DialogContentText>
                                    <TextField onChange={(e) => setDescription(e.target.value)}/>
                                    <DialogContentText>Add ingredients here...</DialogContentText>
                                    <TextField
                                        multiline
                                        onChange={e => {
                                            let ingred_list = e.target.value;
                                            setIngredients(ingred_list.split("\n"));
                                        }}
                                    />
                                    <DialogContentText>Add instructions here...</DialogContentText>
                                    <TextField 
                                    multiline
                                    onChange={(e) => setInstructions(e.target.value)}
                                    rows={7}
                                    maxRows={Infinity}/>
                                    <DialogContentText>Upload an image</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handlePostCreation}>
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
                    <IconButton 
                        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} 
                        onClick={onClickPrev}
                    >
                        <KeyboardArrowLeftIcon />
                    </IconButton>
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
                        onClick={onClickNext}
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>

        
    );
}
