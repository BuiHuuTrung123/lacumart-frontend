import React from 'react';
import { Grid, Box, Typography, useTheme, useMediaQuery, Container } from '@mui/material';
import bcaa from '~/assets/Category/bcaa.jpg';
import dauca from '~/assets/Category/dauca.jpg';
import dungcu from '~/assets/Category/dungcu.webp';
import suatangcan from '~/assets/Category/suatangcan.jpg';
import tangcan from '~/assets/Category/tangcan.png';
import tangsucmanh from '~/assets/Category/tangsucmanh.jpg';
import vitamin from '~/assets/Category/vitamin.jpg';
import whey from '~/assets/Category/whey.jpg';

const categories = [
  { name: 'Whey Protein', image: whey, color: 'linear-gradient(135deg, #ff6b6b, #ffa726)' },
  { name: 'Sữa Tăng Cân', image: suatangcan, color: 'linear-gradient(135deg, #42a5f5, #478ed1)' },
  { name: 'BCAA Amino', image: bcaa, color: 'linear-gradient(135deg, #66bb6a, #4caf50)' },
  { name: 'Tăng Sức Mạnh', image: tangsucmanh, color: 'linear-gradient(135deg, #ffa726, #f57c00)' },
  { name: 'Giảm Cân', image: dauca, color: 'linear-gradient(135deg, #ab47bc, #8e24aa)' },
  { name: 'MuscleTech', image: tangcan, color: 'linear-gradient(135deg, #26c6da, #00acc1)' },
  { name: 'Vitamin', image: vitamin, color: 'linear-gradient(135deg, #ec407a, #d81b60)' },
  { name: 'Phụ Kiện', image: dungcu, color: 'linear-gradient(135deg, #78909c, #546e7a)' },
];

const Category = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        px: { xs: 2, sm: 3, md: 4 } 
      }}
    >
      <Box
        sx={{
          padding: { xs: '16px ', sm: '20px 0', md: '20px 50' },
          borderColor: 'divider',
          margin: '0 auto',
         py: {md: 15},
          width: '100%'
        }}
      >
        {/* Tiêu đề Danh Mục Sản Phẩm - ĐÃ CÓ */}
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center" 
          sx={{ 
            fontWeight: 700,
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            mb: { xs: 2, sm: 3, md: 4 },
            background: 'linear-gradient(45deg, #ff5722, #ff8c42)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Danh Mục Sản Phẩm
        </Typography>

        {/* Grid container căn giữa */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          width: '100%'
        }}>
          <Grid
            container
            spacing={{ xs: 1.5, sm: 2, md: 3 }}
            justifyContent="center"
            sx={{
              flexWrap: 'nowrap',
              overflowX: 'auto',
              pb: 2,
              px: 1,
              maxWidth: '100%',
              scrollbarWidth: 'thin',
              scrollbarColor: `${theme.palette.divider} transparent`,
              '&::-webkit-scrollbar': { 
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme.palette.divider,
                borderRadius: '10px',
                '&:hover': {
                  background: theme.palette.action.hover,
                },
              },
            }}
          >
            {categories.map((category, index) => (
              <Grid
                item
                key={index}
                sx={{
                  flex: '0 0 auto',
                  textAlign: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: { 
                      xs: 80, 
                      sm: 100, 
                      md: 120, 
                      lg: 140 
                    },
                    height: { 
                      xs: 80, 
                      sm: 100, 
                      md: 120, 
                      lg: 140 
                    },
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid',
                    borderColor: 'background.paper',
                    boxShadow: `
                      0 4px 12px rgba(0,0,0,0.1),
                      inset 0 0 0 2px ${category.color.split(',')[1].trim()}
                    `,
                    mx: 'auto',
                    mb: { xs: 1, sm: 1.5 },
                    backgroundColor: 'grey.50',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                      borderColor: category.color.split(',')[1].trim(),
                      transform: 'scale(1.1)',
                      boxShadow: `
                        0 8px 25px rgba(0,0,0,0.15),
                        inset 0 0 0 3px ${category.color.split(',')[1].trim()}
                      `,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={category.image}
                    alt={category.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'relative',
                      zIndex: 2,
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    fontSize: { 
                      xs: '0.75rem', 
                      sm: '0.875rem', 
                      md: '1rem' 
                    },
                    color: 'text.primary',
                    transition: 'all 0.3s ease',
                    maxWidth: { xs: 80, sm: 100, md: 120, lg: 140 },
                    lineHeight: 1.3,
                    '&:hover': { 
                      color: category.color.split(',')[1].trim(),
                    },
                  }}
                >
                  {category.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Navigation dots indicator */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 1, 
            mt: 2,
            opacity: 0.6
          }}
        >
          {[1, 2, 3].map((dot) => (
            <Box
              key={dot}
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: dot === 1 ? 'primary.main' : 'action.disabled',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Category;