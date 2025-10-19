import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import ProductListByCategory from './ProductListByCategory/ProductListByCategory';
import whey from '~/assets/Category/whey.jpg';
import bcaa from '~/assets/Category/bcaa.jpg';
import suatangcan from '~/assets/Category/suatangcan.jpg';
import tangsucmanh from '~/assets/Category/tangsucmanh.jpg';
import dauca from '~/assets/Category/dauca.jpg';
import tangcan from '~/assets/Category/tangcan.png';
import vitamin from '~/assets/Category/vitamin.jpg';
import dungcu from '~/assets/Category/dungcu.webp';

const categories = [
    { name: 'Whey Protein', image: whey, color: '#ff5722' },
    { name: 'Sữa Tăng Cân', image: suatangcan, color: '#42a5f5' },
    { name: 'BCAA Amino Acids', image: bcaa, color: '#66bb6a' },
    { name: 'Tăng Sức Mạnh', image: tangsucmanh, color: '#ffa726' },
    { name: 'Hỗ Trợ Giảm Cân', image: dauca, color: '#ab47bc' },
    { name: 'MuscleTech Alpha', image: tangcan, color: '#26c6da' },
    { name: 'Vitamin Khoáng Chất', image: vitamin, color: '#ec407a' },
    { name: 'Phụ Kiện Tập Gym', image: dungcu, color: '#78909c' },
];

const CategorySection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // Dummy products với dữ liệu đa dạng hơn
    const generateDummyProducts = (categoryIndex) => {
        return Array.from({ length: 8 }).map((_, i) => ({
            id: `${categoryIndex}-${i}`,
            name: `${categories[categoryIndex].name} ${i + 1}`,
            image: categories[categoryIndex].image,
            price: `₫${((i + 1) * 350000).toLocaleString()}`,
            originalPrice: i % 3 === 0 ? `₫${((i + 1) * 450000).toLocaleString()}` : null,
            discount: i % 3 === 0 ? '20' : null,
            rating: 4.5 - (i * 0.1),
            reviewCount: 124 + (i * 25),
            sold: `${1.2 + (i * 0.3)}k`,
            isBestSeller: i === 0,
            tag: i === 1 ? 'NEW' : i === 2 ? 'SALE' : null,
            desc: 'Cung cấp dinh dưỡng chất lượng cao giúp phục hồi và phát triển cơ bắp tối ưu cho người tập luyện.'
        }));
    };

    return (
        <Box sx={{
            width: '100%',
            minHeight: 'auto',
            py: { xs: 3, sm: 4, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
            backgroundColor: '#f8fafc'
        }}>
            <Typography 
                variant="h4" 
                align="center" 
                fontWeight={700} 
                sx={{ 
                    mb: { xs: 3, sm: 4, md: 6 },
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    color: '#1a202c',
                    background: 'linear-gradient(45deg, #ff5722, #ff8c42)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                }}
            >
                Sản Phẩm Nổi Bật
            </Typography>

            {categories.map((cat, index) => (
                <ProductListByCategory
                    key={cat.name}
                    categoryName={cat.name}
                    categoryColor={cat.color}
                    products={generateDummyProducts(index)}
                    showViewAll={true}
                />
            ))}
        </Box>
    );
};

export default CategorySection;