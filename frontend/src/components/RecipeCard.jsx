import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';

export default function RecipeCard({ recipe }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <img src={recipe.img.split(" ").join("+")} width={200}/>
      <CardContent style={{backgroundColor:'#e0f7d7'}}>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>
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
      </CardContent>
      <div>
      <CardActions>
        <Button variant="outlined" color="primary" size="small" style={{ marginRight: '40px' }}>
              Read More
          </Button>
        </CardActions>
        <img src={recipe.profilePicture} alt="Profile" style={{ width: '30px', borderRadius: '50%' }} />
      </div>
    </Card>
  );
}
