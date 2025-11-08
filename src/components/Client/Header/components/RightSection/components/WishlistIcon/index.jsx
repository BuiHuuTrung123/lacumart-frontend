import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'


const WishlistIcon = () => {
  return (
    <Tooltip title="Yêu thích">
      <IconButton 
        sx={{ 
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <FavoriteBorderIcon />
      </IconButton>
    </Tooltip>
  )
}

export default WishlistIcon