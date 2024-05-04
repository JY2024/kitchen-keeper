import React, { useState }from "react";
import SearchBar from "../components/SearchBar";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import RecipeCard from "../components/RecipeCard";

export default function SocialPage() {
//   return <Button variant="outlined">Hello world</Button>;
    const [searchQuery, setSearchQuery] = useState(""); 

    // SEARCHING
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        
    };

    // POSTING
    const handleCreatePostClick = () => {
        // do stuff here
    };

    return (
        <div>
            <br/>
            {/* first row */}
            <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
                <SearchBar onChange={handleSearchChange} onClick={handleSearchClick} />
            </Grid>
            <Grid item>
                <Button
                variant="contained"
                color="primary"
                onClick={handleCreatePostClick}
                >
                Create Post
                </Button>
            </Grid>
        
            {/* second row */}
            <Grid container spacing={3} justifyContent="center">
                {/* trending tags */}
                <Grid item>

                </Grid>


                {/*recipe cards*/}
                <Grid item>
                    <RecipeCard></RecipeCard>
                </Grid>


                
                {/*arrow*/}
                <Grid item>

                </Grid>
            </Grid>
            </Grid>
        </div>
    );
}