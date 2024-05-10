import React from 'react';
import { Typography, Chip, Button, Box} from '@mui/material';

const RecipeCard = ({ recipe }) => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '300px',
            justifyContent: 'space-between', // spread out content vertically
            padding: '1rem',
            border: '3px solid #e0e0e0', // Add border for visual separation
            borderRadius: '20px', // Add border radius for rounded corners
        }}>
            <img src={"https://unsplash.com/photos/cooked-dish-on-table-k6VCwawxgMg"}/>
            {/* <img src={recipe.unsplash_url} alt={recipe.title} style={{ width: '100%' }} /> */}
            <Typography variant="h5" gutterBottom>{recipe.title}</Typography>
            <div>
                {recipe.tags.map(tag => (
                    <Chip 
                        key={tag} 
                        label={tag} 
                        variant="outlined" 
                        style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }} 
                    />
                ))}
            </div>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', // align items horizontally at the center
                marginTop: 'auto', // push the this part to the bottom
            }}>
                <Button variant="outlined" color="primary" size="small" style={{ marginRight: '40px' }}>
                    Read More
                </Button>
                <img src={recipe.profilePicture} alt="Profile" style={{ width: '30px', borderRadius: '50%' }} />
            </div>
        </div>
    );
};

export default RecipeCard;
