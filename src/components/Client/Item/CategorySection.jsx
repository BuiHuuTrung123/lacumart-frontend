import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import ProductListByCategory from './ProductListByCategory/ProductListByCategory';

// Import Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts, fetchAllProductsAPI } from '~/redux/product/productSlice';

const categories = [
    { name: 'Whey Protein', color: '#ff5722' },
    { name: 'Sữa tăng cân', color: '#42a5f5' }, // ← ĐỔI THÀNH "Sữa tăng cân" (chữ thường)
    { name: 'BCAA Amino Acids', color: '#66bb6a' },
    { name: 'Tăng sức mạnh', color: '#ffa726' },
    { name: 'Hỗ trợ giảm cân', color: '#ab47bc' },
    { name: 'Dầu cá', color: '#26c6da' },
    { name: 'Vitamin khoáng chất', color: '#ec407a' },
    { name: 'Phụ kiện tập gym', color: '#78909c' },
];

const CategorySection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    
    // Lấy dữ liệu từ Redux
    const products = useSelector(selectAllProducts);
    const loading = useSelector(state => state.product.loading);
    const error = useSelector(state => state.product.error);


    // Gọi API khi component mount
    React.useEffect(() => {
        dispatch(fetchAllProductsAPI());
    }, [dispatch]);

    // Hàm lọc sản phẩm theo category
    const getProductsByCategory = (categoryName) => {
        if (!products || !Array.isArray(products)) return [];
        
        return products.filter(product => 
            product.mainCategory === categoryName
        ).slice(0, 8); // Giới hạn 8 sản phẩm mỗi danh mục
    };

    // Format dữ liệu cho ProductCard
    const formatProductForCard = (product) => {
        return {
            id: product._id,
            name: product.name,
            images: product.images || '/images/default-product.jpg',
            price: `₫${product.price?.current?.toLocaleString() || '0'}`,
            originalPrice: product.price?.discount > 0 ? 
                `₫${product.price?.original?.toLocaleString() || '0'}` : null,
            discount: product.price?.discount > 0 ? product.price.discount.toString() : null,
            rating: 4.5, // Có thể lấy từ API nếu có
            reviewCount: 124, // Có thể lấy từ API nếu có
            sold: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9)}k`, // Tạm thời random
            isBestSeller: Math.random() > 0.7, // Tạm thời random
            tag: product._destroy ? 'SALE' : null,
            desc: product.description || product.shortDescription || 'Sản phẩm chất lượng cao'
        };
    };

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography>Đang tải sản phẩm...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="error">Lỗi khi tải sản phẩm: {error}</Typography>
            </Box>
        );
    }

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
                    background: 'linear-gradient(45deg, #ff5722, #ff8c42)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                }}
            >
                Sản Phẩm Nổi Bật
            </Typography>

            {categories.map((category, index) => {
                const categoryProducts = getProductsByCategory(category.name);
                
                // Chỉ hiển thị category có sản phẩm
                if (categoryProducts.length === 0) return null;

                return (
                    <ProductListByCategory
                        key={category.name}
                        categoryName={category.name}
                        categoryColor={category.color}
                        products={categoryProducts.map(formatProductForCard)}
                        showViewAll={true}
                    />
                );
            })}
        </Box>
    );
};

export default CategorySection;