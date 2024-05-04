import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function RecipeCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="kimchi stew"
        height="200"
        image="../assets/kimchi-stew.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Best Kimchi Stew Ever!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Beef, meat, kimchi
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  );
}
