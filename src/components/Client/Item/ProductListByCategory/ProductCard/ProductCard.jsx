import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, Chip, Rating, IconButton } from '@mui/material';
import { ShoppingCart, Favorite, FlashOn } from '@mui/icons-material';

const ProductCard = ({ product }) => {
    console.log('Product data:', product);
  console.log('Images value:', product.images);
  console.log('Images type:', typeof product.images);
  // Chỉ hiển thị sản phẩm còn hàng hoặc sắp hết
  if (product.stockStatus === 'out_of_stock') {
    return null;
  }

  return (
    <Card
      sx={{
        width: { 
          xs: 140, 
          sm: 160, 
          md: 180, 
          lg: 200,
          xl: 220
        },
        maxWidth: '100%',
        borderRadius: { xs: 3, sm: 5 },
       overflow: 'hidden',
        backgroundColor: '#fff',
         boxShadow: '0 2px 12px rgba(0,0,0,0.08), 0 0 0 1px #f0f0f0',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        cursor: 'pointer',
        border: '1px solid #f0f0f0',
        '&:hover': {
          boxShadow: '0 12px 32px rgba(255, 87, 34, 0.15), 0 0 0 1px #ff5722',
          transform: { xs: 'translateY(-4px)', sm: 'translateY(-6px)' },
          // border: '1px solid #ff5722',
        },
        '&:hover .product-actions': {
          opacity: 1,
          transform: 'translateY(0)',
        },
        '&:hover .product-image': {
          transform: 'scale(1.05)',
        },
      }}
    >
      {/* Badge và Tag */}
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
        {/* Hiển thị badge sắp hết hàng */}
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

      {/* Nút yêu thích */}
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

      {/* Ảnh sản phẩm */}
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

        {/* Overlay hành động */}
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
      </Box>

      {/* Nội dung */}
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
            {product.price || '890.000₫'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;