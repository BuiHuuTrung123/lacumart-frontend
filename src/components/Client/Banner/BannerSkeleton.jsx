// components/Client/Banner/BannerSkeleton.jsx
import React from 'react';
import { Box, Skeleton } from '@mui/material';

const BannerSkeleton = () => {
  return (
    <Box sx={{ width: '100%', py: { xs: 0, sm: 2 } }}>
      {/* Main Banner Skeleton */}
      <Box sx={{ width: '100%', mb: { xs: 3, sm: 4 }, px: { xs: 0, sm: 2, md: 3 } }}>
        <Skeleton 
          variant="rounded"
          sx={{
            width: '100%',
            height: {
              xs: '250px',
              sm: '400px', 
              md: '550px',
              lg: '650px'
            },
            borderRadius: { xs: '0px', sm: '16px', md: '20px' }
          }}
        />
      </Box>

      {/* Mini Banner Skeleton */}
      <Box sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, justifyContent: 'center' }}>
          {[1, 2, 3].map((item) => (
            <Skeleton 
              key={item}
              variant="rounded"
              sx={{
                width: '100%',
                height: {
                  xs: '120px',
                  sm: '150px',
                  md: '180px',
                  lg: '200px'
                },
                borderRadius: { xs: '10px', sm: '14px', md: '18px' },
                flex: 1,
                maxWidth: { xs: '200px', sm: '250px', md: '300px' }
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BannerSkeleton;