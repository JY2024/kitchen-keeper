import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  Chip
} from '@mui/material';

export default function RecipeCard({ recipe }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Recipe Image */}
      <Box display="flex" justifyContent="center" marginBottom="8px" marginTop="8px">
        <img src={recipe.img.split(" ").join("+")} width={200}/>
      </Box>
      
      {/* Card Body */}
      <CardContent style={{backgroundColor:'#e0f7d7'}}>
        {/* Card Title */}
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>
        {/* Tags Chips */}
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
        <Box display="flex" justifyContent="space-between">
          {/* Read More Button */}
          <CardActions>
            <Button variant="outlined" color="primary" size="small" style={{ marginRight: '40px' }} >
              Read More
            </Button>
          </CardActions>
          {/* Profile Picture */}
          <img src={recipe.profilePicture} alt="Profile" style={{ width: '30px', borderRadius: '50%', left: "-80px" }} />
        </Box>
        
      </div>
    </Card>
  );
}
