import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import ProductCard from './ProductCard/ProductCard';

const ProductListByCategory = ({ categoryName, products, showViewAll = true, categoryColor = '#ff5722' }) => {
  
  // Kiểm tra nếu không có sản phẩm thì không render
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Box sx={{ 
        mb: { xs: 4, sm: 6, md: 8 },
        px: { xs: 0, sm: 1 }
    }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          mb: { xs: 3, sm: 4 },
          gap: { xs: 2, sm: 0 }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 6,
              height: { xs: 24, sm: 32 },
              background: `linear-gradient(180deg, ${categoryColor}, ${categoryColor}99)`,
              borderRadius: 3,
            }}
          />
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                color: '#1a202c',
                lineHeight: 1.2,
              }}
            >
              {categoryName}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#718096',
                fontSize: { xs: '12px', sm: '14px' },
                mt: 0.5,
              }}
            >
              {products.length} sản phẩm {categoryName.toLowerCase()} chất lượng
            </Typography>
          </Box>
        </Box>

        {showViewAll && (
          <Button
            variant="outlined"
            endIcon={<ChevronRight />}
            sx={{
              borderColor: categoryColor,
              color: categoryColor,
              fontWeight: 700,
              fontSize: { xs: '12px', sm: '14px' },
              textTransform: 'none',
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              py: { xs: 0.75, sm: 1 },
              minWidth: { xs: '120px', sm: 'auto' },
              '&:hover': {
                backgroundColor: categoryColor,
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 20px ${categoryColor}4D`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Xem tất cả
          </Button>
        )}
      </Box>

      {/* Grid sản phẩm với layout responsive */}
      <Grid 
        container 
        spacing={{ xs: 2, sm: 3 }}
        sx={{
          '& > .MuiGrid-item': {
            display: 'flex',
            justifyContent: 'center',
          }
        }}
      >
        {products.slice(0, 6).map((product) => (
          <Grid 
            item 
            key={product.id}
            xs={6}        // Mobile: 2 sản phẩm/hàng
            sm={4}        // Tablet: 3 sản phẩm/hàng  
            md={3}        // Desktop: 4 sản phẩm/hàng
            lg={2}        // Large desktop: 6 sản phẩm/hàng
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Navigation dots - Chỉ hiển thị nếu có nhiều hơn 6 sản phẩm */}
      {products.length > 6 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 1, 
          mt: { xs: 2, sm: 3 } 
        }}>
          {[1, 2, 3].map((dot) => (
            <Box
              key={dot}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: dot === 1 ? categoryColor : '#e2e8f0',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: dot === 1 ? categoryColor : '#cbd5e0',
                  transform: 'scale(1.2)',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductListByCategory;