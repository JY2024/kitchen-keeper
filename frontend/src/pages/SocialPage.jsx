import React, { useState, useEffect, useRef } from "react";
import api from "../api";
// components
// import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
// visual
import { Grid, Button, Typography, Chip, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem, Box} from '@mui/material';
import Slider from 'react-slick'; // for recipe carousel
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; // right arrow icon
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'; // right arrow icon

import ChipInput from 'material-ui-chip-input'
import SearchIcon from '@mui/icons-material/Search';
import Navbar from "../components/Navbar"

//Encodes an image as a base64 string
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

export default function SocialPage() {
    const [allRecipes, setAllRecipes] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [ingredMultiline, setMultiline] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [filterOption, setFilterOption] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [popularTags, setPopularTags] = useState([]);

    const searchRef = useRef();


    useEffect(() => {
        document.body.style = 'background: #f8fff5;';
        getAllRecipes();
    }, []);

    const findPopularTags = () => {
        let all_tags_and_counts = [];
        const tags_seen = [];
        allRecipes.forEach(recipe => {
            const ingreds = recipe.tags; // array of strings
            ingreds.forEach(ing => {
                if (!(tags_seen.includes(ing))) {
                    all_tags_and_counts.push([ing, 0]);
                    tags_seen.push(ing);
                }
                all_tags_and_counts.find(sub_arr => sub_arr[0] === ing)[1] += 1;
            });
        });
        all_tags_and_counts = all_tags_and_counts.sort((arr1, arr2) => {
            return arr2[1] - arr1[1];
    });
        const tags_to_add = [];
        for (let i = 0; i <= 5; i++) {
            if (i < all_tags_and_counts.length) {
                tags_to_add.push(all_tags_and_counts[i][0]);
            }
        }
        setPopularTags(tags_to_add);
    };

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

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handlePostCreation = (e) => {
        createRecipe(e);
    }

    const getRecipesFiltered = (filterOption, searchQuery) => {
        if (searchQuery === "") {
            getAllRecipes();
        } else {
            let data = allRecipes;
            searchQuery = searchQuery.toLowerCase().split(" ");
            if (filterOption === "title") {
                const title_check = (title_string) => searchQuery.some(queryTerm => title_string.toLowerCase().includes(queryTerm));
                setRecipes(data.filter(recipe => title_check(recipe.title)));
            } else if (filterOption === "tags") {
                const tag_check = (tag_arr) => searchQuery.some(queryTerm => tag_arr.includes(queryTerm));
                setRecipes(data.filter(recipe => tag_check(recipe.tags)));
            } else if (filterOption === "ingredients") {
                const ingred_check = (ingred_arr) => searchQuery.some(queryTerm => {
                    return ingred_arr.includes(queryTerm)
                });
                setRecipes(data.filter(recipe => {
                    let ingreds = recipe.ingredients;
                    let ingreds2 = [];
                    ingreds.forEach((ingred_str) => {
                        ingreds2 = ingreds2.concat(ingred_str.split(" "));
                    }); 
                    return ingred_check(ingreds2);
                }));
            } else {
                setRecipes(data);
            }
            // fix carousel display
        }
        
    }

    const createRecipe = (e) => {
        e.preventDefault();
        api
            .post("/api/recipes/", { "title": title, "tags": tags, "description": description, "ingredients": ingredients, "instructions": instructions, "img": selectedImage})
          .then((res) => {
            if (res.status === 201) alert("Recipe created!");
            else alert("Failed to make recipe.");
            handleClose();
          })
          .then(() => {
            getAllRecipes();
          })
          .catch((err) => alert(err));
      };
    
    
    const [startIndex, setStartIndex] = useState(0);

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
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3, // Show 3 slides at a time
        slidesToScroll: 3,
    };

    const handleClickTags = () => {
        findPopularTags();
    }

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
            <Navbar />
            <Grid container spacing={3}>
                {/* Top Row (Row 1) */}
                <Grid item xs={12}>
                    {/* Search Bar */}
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={3}></Grid>
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
                                    <input
                                        type="file"
                                        name="myImage"
                                        onChange={(event) => {
                                            encodeImageAsURL(event.target.files[0]).then((result) => {
                                                console.log("result " + result);
                                                setSelectedImage(result);
                                            }).catch(console.error);
                                        }}
                                    />
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
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    {/* Popular Tags Section */}
                    <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '1rem', maxWidth: '150px'}}>
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
