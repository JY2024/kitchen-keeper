import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onChange, onClick }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '50%' }}>
          <TextField
            label="Search"
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