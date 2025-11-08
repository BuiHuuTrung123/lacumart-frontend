import React from 'react'
import { CardContent, Typography, Box, Rating } from '@mui/material'

const ProductContent = ({ product }) => {
  return (
    <CardContent
      sx={{
        p: { xs: 1, sm: 1.5, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 0.5, sm: 1 },
      }}
    >
      {/* Tên sản phẩm */}
      <Typography
        sx={{
          fontSize: { xs: '11px', sm: '13px', md: '14px' },
          fontWeight: 700,
          color: '#1a202c',
          lineHeight: 1.3,
          height: { xs: 32, sm: 40 },
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {product.name}
      </Typography>

      {/* Rating */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Rating
          value={product.rating || 4.5}
          precision={0.5}
          size="small"
          readOnly
          sx={{
            color: '#ffc107',
            fontSize: { xs: '14px', sm: '16px' }
          }}
        />
        <Typography variant="body2" sx={{
          color: '#666',
          fontSize: { xs: '10px', sm: '12px' }
        }}>
          ({product.reviewCount || 124})
        </Typography>
      </Box>

      {/* Giá bán */}
      <Box sx={{ mt: 0.5 }}>
        <Typography
          sx={{
            fontSize: { xs: '12px', sm: '14px', md: '16px' },
            fontWeight: 800,
            color: '#ff5722',
            lineHeight: 1,
          }}
        >
          {product.price.current}₫
        </Typography>
      </Box>
    </CardContent>
  )
}

export default ProductContent