import React from 'react'
import { Grid, Card, Box, Chip } from '@mui/material'

const ProductImagesSection = ({ product, productImages, selectedImage, onSelectImage }) => {
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
        <Box sx={{ position: 'relative' }}>
          <Box
            component="img"
            src={productImages[selectedImage]}
            alt={product.name}
            sx={{
              width: '100%',
              height: 'fit-content',
              objectFit: 'cover',
              backgroundColor: '#f5f5f5'
            }}
          />
          {/* Badges */}
          <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
            {product.stock?.status === 'low_stock' && (
              <Chip
                label="SẮP HẾT HÀNG"
                color="warning"
                sx={{ fontWeight: 'bold', mr: 1 }}
              />
            )}
            {product.price?.discount > 0 && (
              <Chip
                label={`-${product.price.discount}%`}
                color="error"
                sx={{ fontWeight: 'bold' }}
              />
            )}
          </Box>
        </Box>

        {/* Thumbnail Images */}
        <Box sx={{ p: 2, display: 'flex', gap: 1, overflowX: 'auto' }}>
          {productImages.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`${product.name} ${index + 1}`}
              onClick={() => onSelectImage(index)}
              sx={{
                width: 120,
                height: 150,
                objectFit: 'cover',
                borderRadius: 2,
                cursor: 'pointer',
                border: selectedImage === index ? '2px solid #ff5722' : '2px solid transparent',
                opacity: selectedImage === index ? 1 : 0.7,
                transition: 'all 0.3s ease',
                '&:hover': {
                  opacity: 1,
                  borderColor: '#ff5722'
                }
              }}
            />
          ))}
        </Box>
      </Card>
    </Grid>
  )
}

export default ProductImagesSection