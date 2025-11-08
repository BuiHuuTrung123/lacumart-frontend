import React from 'react'
import { Box, Button } from '@mui/material'
import { ShoppingCart, FlashOn } from '@mui/icons-material'

const ProductActions = ({ onAddToCart, onQuickBuy }) => {
  return (
    <Box
      className="product-actions"
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: { xs: 1, sm: 1.5 },
        display: 'flex',
        gap: 0.5,
        opacity: 0,
        transform: 'translateY(8px)',
        transition: 'all 0.3s ease',
      }}
    >
      <Button
        variant="contained"
        onClick={onAddToCart}
        size="small"
        sx={{
          flex: 1,
          backgroundColor: '#ff5722',
          fontSize: { xs: '10px', sm: '12px' },
          fontWeight: 600,
          py: { xs: 0.5, sm: 1 },
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: '#e65100',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease',
        }}
      >
        <ShoppingCart sx={{ fontSize: { xs: 14, sm: 16 }, mr: 0.5 }} />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>Giỏ</Box>
      </Button>
      <Button
        variant="outlined"
        size="small"
        onClick={onQuickBuy}
        sx={{
          fontSize: { xs: '10px', sm: '12px' },
          fontWeight: 600,
          py: { xs: 0.5, sm: 1 },
          minWidth: 'auto',
          borderColor: '#ff5722',
          color: '#ff5722',
          '&:hover': {
            backgroundColor: '#fff5f5',
            borderColor: '#e65100',
          },
        }}
      >
        <FlashOn sx={{ fontSize: { xs: 14, sm: 16 }, mr: 0.5 }} />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>Mua</Box>
      </Button>
    </Box>
  )
}

export default ProductActions