import React from 'react';
import {TextField, IconButton, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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