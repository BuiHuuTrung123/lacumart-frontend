import React from 'react'
import { Box, Chip } from '@mui/material'

const ProductBadges = ({ product }) => {
  return (
    <Box sx={{
      position: 'absolute',
      top: 8,
      left: 8,
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 0.5
    }}>
      {product.isBestSeller && (
        <Chip
          label="BÁN CHẠY"
          size="small"
          sx={{
            backgroundColor: '#ff5722',
            color: 'white',
            fontWeight: 700,
            fontSize: { xs: '8px', sm: '10px' },
            height: { xs: 18, sm: 22 },
            '& .MuiChip-label': {
              px: 0.5,
              fontSize: { xs: '8px', sm: '10px' }
            },
          }}
        />
      )}
      {product.stockStatus === 'low_stock' && (
        <Chip
          label="SẮP HẾT"
          size="small"
          sx={{
            backgroundColor: '#ff9800',
            color: 'white',
            fontWeight: 700,
            fontSize: { xs: '8px', sm: '10px' },
            height: { xs: 16, sm: 20 },
            '& .MuiChip-label': {
              px: 0.5,
              fontSize: { xs: '8px', sm: '10px' }
            },
          }}
        />
      )}
    </Box>
  )
}

export default ProductBadges