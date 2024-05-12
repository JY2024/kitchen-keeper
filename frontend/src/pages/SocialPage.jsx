// SocialPage: page where users can view, search for, and create recipes

import { useState, useEffect, useRef } from "react";
import api from "../api";
// components
import RecipeCard from "../components/RecipeCard";
import Navbar from "../components/Navbar"
// visual
import { Grid, Button, Typography, Chip, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import Slider from 'react-slick'; // for recipe carousel
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; // right arrow icon
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'; // left arrow icon
import ChipInput from 'material-ui-chip-input'
import SearchIcon from '@mui/icons-material/Search';

export default function SocialPage() {
    // for displaying recipes
    const [allRecipes, setAllRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);
    // for user posting
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    // for searching
    const [filterOption, setFilterOption] = useState("");
    const [popularTags, setPopularTags] = useState([]);
    const searchRef = useRef(); // reference to search bar

    useEffect(() => {
        document.body.style = 'background: #f8fff5;';
        getAllRecipes();
    }, []);

    //----------------------------------------------------Displaying Recipes----------------------------------------------------
    // api call to get all recipes from database
    const getAllRecipes = () => {
        api
            .get("/api/recipes/")
            .then((res) => res.data)
            .then((data) => {
                setRecipes(data);
                setAllRecipes(data);
            })
            .then(() => findPopularTags())
            .catch((err) => alert(err));
    };

    const sliderRef = useRef(null); // reference for slider component (food carousel)
    const onClickNext = () => {
        sliderRef.current.slickNext(); // slide to next slides
    };
    const onClickPrev = () => {
        sliderRef.current.slickPrev(); // slide to previous slides
    };
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3, // show 3 slides at a time
        slidesToScroll: 3, // scroll 3 slides at a time
    };

    //----------------------------------------------------Handle User Posting----------------------------------------------------
    // dialog for post creation window
    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    const handleClose = () => {
        setDialogOpen(false);
    };
    const handlePostCreation = (e) => {
        createRecipe(e);
    }

    // api call to create and store recipe in the database
    const createRecipe = (e) => {
        e.preventDefault();
        api
            .post("/api/recipes/", { "title": title, "tags": tags, "description": description, "ingredients": ingredients, "instructions": instructions, "img": selectedImage })
            .then((res) => {
                if (res.status !== 201) {
                    alert("Failed to make recipe.");
                }
                handleClose();
            })
            .then(() => {
                getAllRecipes(); // update all recipes storedfor this page
            })
            .catch((err) => alert(err));
    };

    //----------------------------------------------------Searching----------------------------------------------------
    // set the displayed recipes only to recipes containing at least one term in the searchQuery for the specified filterOption (title, tags, ingredients)
    const getRecipesFiltered = (filterOption, searchQuery) => {
        if (searchQuery === "") {
            getAllRecipes(); // just display every recipe
        } else {
            let data = allRecipes;
            searchQuery = searchQuery.toLowerCase().split(" "); // array of terms in the query
            if (filterOption === "title") {
                const title_check = (title_string) => searchQuery.some(queryTerm => title_string.toLowerCase().includes(queryTerm)); // check if some query term is in the title
                setRecipes(data.filter(recipe => title_check(recipe.title))); // only display recipes that contain at least one query term
            } else if (filterOption === "tags") {
                const tag_check = (tag_arr) => searchQuery.some(queryTerm => tag_arr.includes(queryTerm)); // check if some query term is in the tags
                setRecipes(data.filter(recipe => tag_check(recipe.tags)));
            } else if (filterOption === "ingredients") {
                const ingred_check = (ingred_arr) => searchQuery.some(queryTerm => ingred_arr.includes(queryTerm)); // check if the ingredient array contains a query term
                setRecipes(data.filter(recipe => {
                    let ingreds = recipe.ingredients;
                    let ingreds2 = [];
                    ingreds.forEach((ingred_str) => {
                        ingreds2 = ingreds2.concat(ingred_str.split(" ")); // because an ingred_str might be like "20 avocados" so we want "avocados" in the ingredient array before checking
                    });
                    return ingred_check(ingreds2);
                }));
            } else {
                setRecipes(data); // just display all the recipes if no filterOption provided
            }
        }
    }

    const handleSearch = () => { // search bar was clicked
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
                        onChange={() => { }}
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

    //----------------------------------------------------Popular Tags----------------------------------------------------
    // finds and sets popular tags section to be the top 5 (or less if there aren't at least 5 tags) most frequent tags across all recipes in the database
    const findPopularTags = () => {
        let all_tags_and_counts = []; // each entry is [tag name, (int) count of tag over all recipes]
        const tags_seen = []; // keep track of tags already seen to avoid duplicates
        allRecipes.forEach(recipe => { // for each recipe, count their tags and update all_tags_and_counts
            const cur_tags = recipe.tags; // array of strings
            cur_tags.forEach(t => {
                if (!(tags_seen.includes(t))) {
                    all_tags_and_counts.push([t, 0]);
                    tags_seen.push(t);
                }
                all_tags_and_counts.find(sub_arr => sub_arr[0] === t)[1] += 1; // find the entry that has the term t and increment count of how mnay times we've seen it so far
            });
        });
        all_tags_and_counts = all_tags_and_counts.sort((arr1, arr2) => {
            return arr2[1] - arr1[1]; // descending order by count
        });
        const tags_to_add = []; // tags that will be displayed
        for (let i = 0; i < 5; i++) {
            if (i < all_tags_and_counts.length) { // within range
                tags_to_add.push(all_tags_and_counts[i][0]); // add the term
            }
        }
        setPopularTags(tags_to_add);
    };

    const handleClickTags = () => { // button to show tags was clicked
        findPopularTags();
    }

    //----------------------------------------------------DISPLAY----------------------------------------------------
    return (
        <div style={{ paddingTop: '20px' }}>
            <Navbar />
            <Grid container spacing={3}>
                {/* Row 1*/}
                <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={3}></Grid>
                        {/* Select Filter Option Dropdown */}
                        <Grid item xs={3}>
                            Filter by:
                            <FormControl fullWidth>
                                <InputLabel id="search-select-label">Search by...</InputLabel>
                                <Select
                                    labelId="search-select-label"
                                    value={filterOption}
                                    label="Filter by:"
                                    onChange={(e) => {
                                        setFilterOption(e.target.value);
                                    }}
                                >
                                    <MenuItem value={"title"}>Title</MenuItem>
                                    <MenuItem value={"tags"}>Tags</MenuItem>
                                    <MenuItem value={"ingredients"}>Ingredients</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Search Bar */}
                        <Grid item xs={4}>
                            <SearchBar></SearchBar>
                        </Grid>
                        {/* Create Post Button */}
                        <Grid item xs={2} container>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: 'green', color: 'white', fontStyle: 'italic' }}
                                onClick={handleClickOpen}
                            >
                                Create Post
                            </Button>
                            {/* Dialog for making post */}
                            <Dialog open={dialogOpen} onClose={handleClose} fullWidth={true}>
                                <DialogTitle>Create Post</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>Title</DialogContentText>
                                    <TextField onChange={(e) => setTitle(e.target.value)} />
                                    <DialogContentText>Add tags here...</DialogContentText>
                                    <ChipInput
                                        defaultValue={[]}
                                        onChange={(chips) => setTags(chips)} // chips is array of strings
                                    />
                                    <DialogContentText>Add description here...</DialogContentText>
                                    <TextField
                                        multiline
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={7}
                                        maxRows={Infinity}
                                        fullWidth={true} />
                                    <DialogContentText>Add ingredients here (put each ingredient on a new line)...</DialogContentText>
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
                                        maxRows={Infinity}
                                        fullWidth={true} />
                                    <DialogContentText>Upload an image</DialogContentText>
                                    <input
                                        type="file"
                                        name="myImage"
                                        onChange={(event) => {
                                            encodeImageAsURL(event.target.files[0]).then((result) => {
                                                setSelectedImage(result);
                                            }).catch(console.error);
                                        }}
                                    />
                                </DialogContent>
                                {/* Create Post Button */ }
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

                {/* Row 2, Col 1 */}
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    {/* Popular Tags Section */}
                    <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '1rem', maxWidth: '150px' }}>
                        {/* Show Tags Button */}
                        <Box display="flex" justifyContent="center">
                            <Button
                                variant="h6"
                                style={{ backgroundColor: 'gray', color: 'white', fontStyle: 'italic', marginBottom: "10px" }}
                                onClick={handleClickTags}
                            >
                                <Typography variant="h6" gutterBottom fontSize="14px">
                                    See Popular Tags
                                </Typography>
                            </Button>
                        </Box>
                        {/* Tags */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {popularTags.map(tag => (
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

                {/* Row 2, Col 2 */}
                <Grid item xs={9} style={{ position: 'relative' }}>
                    {/* Left Arrow Button */}
                    <IconButton
                        style={{ position: 'absolute', left: '1px', top: '50%', transform: 'translateY(-50%)' }}
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
                                    <RecipeCard recipe={recipe} key={recipe.id} />
                                </div>
                            )
                        })}
                    </Slider>
                    {/* Right Arrow Button */}
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

//Encodes an image as a base64 string, returns a Promise
//encodeImageAsURL(file): string
const encodeImageAsURL = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            resolve(reader.result);
        }
    });
}