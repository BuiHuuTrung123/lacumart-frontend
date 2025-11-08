import React from 'react'
import { Box, CardMedia } from '@mui/material'

const ProductImage = ({ product }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: {
          xs: 150,
          sm: 180,
          md: 200,
          lg: 250,
          xl: 300
        },
        backgroundColor: '#f8fafc',
        p: { xs: 1, sm: 1.5, md: 2 }
      }}
    >
      <CardMedia
        component="img"
        image={product.images}
        alt={product.name}
        className="product-image"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
        }}
      />
    </Box>
  )
}

export default ProductImage