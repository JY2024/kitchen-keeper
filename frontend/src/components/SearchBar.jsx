import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

function SearchBar({ onChange, onClick }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <TextField
            label={<Typography variant="body1" fontStyle="italic">Search for posts...</Typography>}
            variant="outlined"
            onChange={onChange}
            fullWidth
            InputProps={{
                style: {
                  color: "gray",
                  borderRadius: 20
                }
              }}
          />
        </div>
        <IconButton onClick={onClick} size="large">
          <SearchIcon />
        </IconButton>
      </div>
    );
  }

export default SearchBar;