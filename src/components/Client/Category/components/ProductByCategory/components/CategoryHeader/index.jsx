import React from 'react'
import { Box, Typography, Chip } from '@mui/material'

const CategoryHeader = ({ currentCategory, productCount }) => {
    return (
        <Box 
            sx={{ 
                background: currentCategory.color,
                borderRadius: 4,
                p: 6,
                mb: 6,
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.1)',
                }
            }}
        >
            <Box position="relative" zIndex={1}>
                <Typography 
                    variant="h2" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{ 
                        fontSize: { xs: '2.5rem', md: '4rem' },
                        textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                        mb: 3
                    }}
                >
                    {currentCategory.name}
                </Typography>
                <Typography 
                    variant="h5" 
                    sx={{ 
                        maxWidth: '800px', 
                        mx: 'auto',
                        opacity: 0.95,
                        fontSize: { xs: '1.1rem', md: '1.5rem' },
                        mb: 4
                    }}
                >
                    {currentCategory.description}
                </Typography>
                <Chip 
                    key="product-count"
                    label={`${productCount} sản phẩm`}
                    sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)', 
                        color: 'white',
                        fontSize: '1.1rem',
                        px: 3,
                        py: 2,
                        border: '2px solid rgba(255,255,255,0.3)',
                        fontWeight: 'bold',
                        backdropFilter: 'blur(10px)'
                    }}
                />
            </Box>
        </Box>
    )
}

export default CategoryHeader