import React from 'react'
import { Box, IconButton } from '@mui/material'
import { Favorite } from '@mui/icons-material'

const FavoriteButton = ({ onFavoriteClick }) => {
  return (
    <Box
      className="product-actions"
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 2,
        opacity: 0,
        transform: 'translateY(-8px)',
        transition: 'all 0.3s ease',
      }}
    >
      <IconButton
        onClick={onFavoriteClick}
        sx={{
          width: { xs: 24, sm: 32 },
          height: { xs: 24, sm: 32 },
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: '#fff5f5',
            color: '#e53935',
          },
        }}
      >
        <Favorite sx={{ fontSize: { xs: 14, sm: 16 } }} />
      </IconButton>
    </Box>
  )
}

export default FavoriteButton