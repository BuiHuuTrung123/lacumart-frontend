// components/Client/Category/CategorySkeleton.jsx
import React from 'react';
import { Grid, Box, Skeleton, Container } from '@mui/material';

const CategorySkeleton = () => {
  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ padding: { xs: '16px 0', sm: '20px 0', md: '24px 0' } }}>
        {/* Title Skeleton */}
        <Skeleton 
          variant="text" 
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            width: '300px',
            mx: 'auto',
            mb: { xs: 2, sm: 3, md: 4 }
          }} 
        />

        {/* Categories Skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} justifyContent="center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Grid item key={item} sx={{ flex: '0 0 auto' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Skeleton 
                    variant="circular"
                    sx={{
                      width: { xs: 80, sm: 100, md: 120, lg: 140 },
                      height: { xs: 80, sm: 100, md: 120, lg: 140 },
                      mb: { xs: 1, sm: 1.5 }
                    }}
                  />
                  <Skeleton 
                    variant="text" 
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                      width: '80px'
                    }} 
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default CategorySkeleton;