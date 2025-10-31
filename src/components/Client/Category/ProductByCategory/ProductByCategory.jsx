// ProductsByCategory.js - Card đẹp hơn
import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Grid, 
    Box, 
    Typography, 
    Breadcrumbs,
    Link,
    Pagination,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    CircularProgress,
    Alert,
    useTheme,
    useMediaQuery,
    Card,
    CardMedia,
    CardContent,
    Button,
    Rating,
    IconButton,
    Badge
} from '@mui/material';
import {
    NavigateNext,
    Home,
    Category as CategoryIcon,
    ShoppingCart,
    Favorite,
    FlashOn,
    LocalShipping,
    Discount
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '~/redux/user/userSlice/';
import { addItemToCartApi } from '~/redux/cart/cartSlice/';
import { toast } from 'react-toastify';
import Hearder from '~/components/Client/Hearder/Hearder';
import Footer from '~/components/Client/Footer/Footer';

const ProductsByCategory = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    // Lấy products từ Redux store
    const allProducts = useSelector(state => state.product.products || []);
    
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('name');
    const [selectedBrands, setSelectedBrands] = useState([]);

    const productsPerPage = 12;

    useEffect(() => {
        filterProductsByCategory();
    }, [categoryName, allProducts, sortBy, selectedBrands]);

    const filterProductsByCategory = () => {
        try {
            setLoading(true);
            
            if (!allProducts || allProducts.length === 0) {
                setFilteredProducts([]);
                setLoading(false);
                return;
            }

            // Lọc sản phẩm theo mainCategory
            let filtered = allProducts.filter(product => {
                const productMainCategory = product.mainCategory?.toLowerCase().trim();
                const targetCategory = categoryName?.toLowerCase().trim();
                
                return productMainCategory === targetCategory && !product._destroy;
            });

            // Lọc theo brand nếu có
            if (selectedBrands.length > 0) {
                filtered = filtered.filter(product => 
                    product.brand && selectedBrands.includes(product.brand)
                );
            }

            // Sắp xếp
            filtered = sortProducts(filtered, sortBy);

            setFilteredProducts(filtered);
            setLoading(false);
        } catch (err) {
            console.error('Lỗi khi lọc sản phẩm:', err);
            setError('Lỗi khi tải sản phẩm');
            setLoading(false);
        }
    };

    const sortProducts = (products, sortType) => {
        const sorted = [...products];
        switch (sortType) {
            case 'price-low':
                return sorted.sort((a, b) => (a.price?.current || 0) - (b.price?.current || 0));
            case 'price-high':
                return sorted.sort((a, b) => (b.price?.current || 0) - (a.price?.current || 0));
            case 'name':
                return sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            case 'rating':
                return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            default:
                return sorted;
        }
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        setPage(1);
    };

    const handleBrandFilter = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand) 
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
        setPage(1);
    };

    const handleAddToCart = (product, e) => {
        e.stopPropagation();
        
        if (!currentUser) {
            toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng');
            return;
        }

        const cartData = {
            productId: product._id,
            quantity: 1,
        };

        dispatch(addItemToCartApi(cartData));
        toast.success('Đã thêm vào giỏ hàng');
    };

    const handleProductClick = (productId) => {
        navigate(`/productDetail/${productId}`);
    };

    const handleQuickBuy = (e) => {
        e.stopPropagation();
        // Xử lý mua nhanh
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        // Xử lý yêu thích
    };

    // Lấy danh sách brands duy nhất từ filtered products
    const uniqueBrands = [...new Set(filteredProducts.map(product => product.brand).filter(Boolean))];

    // Phân trang
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const displayedProducts = filteredProducts.slice(
        (page - 1) * productsPerPage,
        page * productsPerPage
    );

    const categoryInfo = {
        'whey protein': {
            name: 'Whey Protein',
            description: 'Bổ sung protein chất lượng cao cho phát triển cơ bắp',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        'sữa tăng cân': {
            name: 'Sữa Tăng Cân',
            description: 'Hỗ trợ tăng cân, tăng cơ hiệu quả',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        'bcaa amino': {
            name: 'BCAA Amino',
            description: 'Amino acid chuỗi nhánh cho phục hồi cơ bắp',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        'tăng sức mạnh': {
            name: 'Tăng Sức Mạnh',
            description: 'Hỗ trợ tăng sức mạnh và hiệu suất tập luyện',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        'giảm cân': {
            name: 'Giảm Cân',
            description: 'Hỗ trợ giảm cân, đốt mỡ hiệu quả',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        'muscletech': {
            name: 'MuscleTech',
            description: 'Sản phẩm chính hãng từ MuscleTech',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        },
        'vitamin': {
            name: 'Vitamin',
            description: 'Bổ sung vitamin và khoáng chất thiết yếu',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        },
        'phụ kiện': {
            name: 'Phụ Kiện',
            description: 'Phụ kiện hỗ trợ tập luyện thể hình',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #9890e3 0%, #b1f4cf 100%)'
        },
    };

    const currentCategory = categoryInfo[categoryName?.toLowerCase()] || { 
        name: categoryName, 
        description: `Sản phẩm ${categoryName}`,
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
                <Hearder />
                <Container sx={{ py: 4, textAlign: 'center' }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Đang tải sản phẩm...
                    </Typography>
                </Container>
                <Footer />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
                <Hearder />
                <Container sx={{ py: 4 }}>
                    <Alert severity="error">{error}</Alert>
                </Container>
                <Footer />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Hearder />
            
            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Breadcrumb */}
                <Breadcrumbs 
                    separator={<NavigateNext fontSize="small" />} 
                    aria-label="breadcrumb"
                    sx={{ mb: 4 }}
                >
                    <Link
                        key="home"
                        underline="hover"
                        color="inherit"
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/');
                        }}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                        Trang chủ
                    </Link>
                    <Link
                        key="categories"
                        underline="hover"
                        color="inherit"
                        href="/categories"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/categories');
                        }}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Danh mục
                    </Link>
                    <Typography key="current-category" color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                        {currentCategory.name}
                    </Typography>
                </Breadcrumbs>

                {/* Category Header */}
                <Box 
                    key="category-header"
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
                            label={`${filteredProducts.length} sản phẩm`}
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

                {/* Filters and Sort */}
                <Box 
                    key="filters-sort"
                    sx={{ 
                        mb: 6, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        flexWrap: 'wrap', 
                        gap: 3,
                        p: 3,
                        bgcolor: 'white',
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                >
                    {/* Brand Filter */}
                    {uniqueBrands.length > 0 && (
                        <Box key="brand-filter" sx={{ flex: 1, minWidth: 300 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                                🔍 Thương hiệu
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {uniqueBrands.map(brand => (
                                    <Chip
                                        key={`brand-${brand}`}
                                        label={brand}
                                        clickable
                                        color={selectedBrands.includes(brand) ? 'primary' : 'default'}
                                        onClick={() => handleBrandFilter(brand)}
                                        variant={selectedBrands.includes(brand) ? 'filled' : 'outlined'}
                                        sx={{
                                            fontWeight: 'bold',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {/* Sort */}
                    <Box key="sort-filter" sx={{ minWidth: 250 }}>
                        <FormControl fullWidth size="medium">
                            <InputLabel>📊 Sắp xếp</InputLabel>
                            <Select
                                value={sortBy}
                                onChange={handleSortChange}
                                label="📊 Sắp xếp"
                                sx={{
                                    borderRadius: 2,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#e0e0e0'
                                    }
                                }}
                            >
                                <MenuItem key="sort-name" value="name">🔄 Tên A-Z</MenuItem>
                                <MenuItem key="sort-price-low" value="price-low">💰 Giá: Thấp đến Cao</MenuItem>
                                <MenuItem key="sort-price-high" value="price-high">💎 Giá: Cao đến Thấp</MenuItem>
                                <MenuItem key="sort-rating" value="rating">⭐ Đánh giá cao nhất</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {/* Products Grid */}
                {displayedProducts.length > 0 ? (
                    <>
                        <Grid key="products-grid" container spacing={4}>
                            {displayedProducts.map((product) => {
                                const discountPercent = product.price?.original > product.price?.current 
                                    ? Math.round((1 - product.price.current / product.price.original) * 100)
                                    : 0;

                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={`product-${product._id}`}>
                                        {/* Product Card đẹp */}
                                        <Card
                                            onClick={() => handleProductClick(product._id)}
                                            sx={{
                                                height: '100%',
                                                borderRadius: 4,
                                                overflow: 'hidden',
                                                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                                                boxShadow: '0 4px 25px rgba(0,0,0,0.08)',
                                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                position: 'relative',
                                                cursor: 'pointer',
                                                border: '1px solid rgba(255,255,255,0.8)',
                                                '&:hover': {
                                                    transform: 'translateY(-12px) scale(1.02)',
                                                    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                                                    '& .product-image': {
                                                        transform: 'scale(1.1)',
                                                    },
                                                    '& .product-actions': {
                                                        opacity: 1,
                                                        transform: 'translateY(0)',
                                                    }
                                                },
                                            }}
                                        >
                                            {/* Discount Badge */}
                                            {discountPercent > 0 && (
                                                <Badge
                                                    badgeContent={`-${discountPercent}%`}
                                                    color="error"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 16,
                                                        left: 16,
                                                        zIndex: 10,
                                                        '& .MuiBadge-badge': {
                                                            fontSize: '0.75rem',
                                                            fontWeight: 'bold',
                                                            padding: '4px 8px',
                                                            borderRadius: 3,
                                                            background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)'
                                                        }
                                                    }}
                                                />
                                            )}

                                            {/* Favorite Button */}
                                            <IconButton
                                                onClick={handleFavoriteClick}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    right: 12,
                                                    zIndex: 10,
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: '50%',
                                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                                    backdropFilter: 'blur(10px)',
                                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        backgroundColor: '#fff5f5',
                                                        color: '#e53935',
                                                        transform: 'scale(1.1)',
                                                    },
                                                }}
                                            >
                                                <Favorite />
                                            </IconButton>

                                            {/* Product Image */}
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    height: 280,
                                                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
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
                                                        transition: 'transform 0.6s ease',
                                                    }}
                                                />

                                                {/* Stock Status */}
                                                {product.stock?.status === 'low_stock' && (
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: 12,
                                                            left: 12,
                                                            backgroundColor: 'rgba(255,152,0,0.9)',
                                                            color: 'white',
                                                            px: 2,
                                                            py: 0.5,
                                                            borderRadius: 3,
                                                            fontSize: '0.75rem',
                                                            fontWeight: 'bold',
                                                            backdropFilter: 'blur(10px)'
                                                        }}
                                                    >
                                                        ⚠️ Sắp hết hàng
                                                    </Box>
                                                )}

                                                {/* Quick Actions */}
                                                <Box
                                                    className="product-actions"
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        left: 0,
                                                        right: 0,
                                                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                                        padding: 3,
                                                        display: 'flex',
                                                        gap: 1,
                                                        opacity: 0,
                                                        transform: 'translateY(20px)',
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        onClick={(e) => handleAddToCart(product, e)}
                                                        size="small"
                                                        startIcon={<ShoppingCart />}
                                                        sx={{
                                                            flex: 1,
                                                            background: 'linear-gradient(45deg, #ff5722, #ff8c42)',
                                                            borderRadius: 3,
                                                            fontWeight: 'bold',
                                                            textTransform: 'none',
                                                            boxShadow: '0 4px 15px rgba(255,87,34,0.3)',
                                                            '&:hover': {
                                                                background: 'linear-gradient(45deg, #e65100, #ff6d00)',
                                                                transform: 'translateY(-2px)',
                                                                boxShadow: '0 6px 20px rgba(255,87,34,0.4)',
                                                            },
                                                        }}
                                                    >
                                                        Thêm giỏ
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={handleQuickBuy}
                                                        startIcon={<FlashOn />}
                                                        sx={{
                                                            borderColor: 'white',
                                                            color: 'white',
                                                            borderRadius: 3,
                                                            fontWeight: 'bold',
                                                            textTransform: 'none',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(255,255,255,0.1)',
                                                                borderColor: 'white',
                                                                transform: 'translateY(-2px)',
                                                            },
                                                        }}
                                                    >
                                                        Mua ngay
                                                    </Button>
                                                </Box>
                                            </Box>

                                            {/* Product Content */}
                                            <CardContent
                                                sx={{
                                                    p: 3,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 2,
                                                    flexGrow: 1
                                                }}
                                            >
                                                {/* Brand */}
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'primary.main',
                                                        fontWeight: 'bold',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: 1,
                                                        fontSize: '0.75rem'
                                                    }}
                                                >
                                                    {product.brand}
                                                </Typography>

                                                {/* Product Name */}
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: '#1a202c',
                                                        lineHeight: 1.4,
                                                        height: 44,
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        fontSize: '1rem'
                                                    }}
                                                >
                                                    {product.name}
                                                </Typography>

                                                {/* Rating and Reviews */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Rating
                                                        value={product.rating || 4.5}
                                                        precision={0.5}
                                                        size="small"
                                                        readOnly
                                                        sx={{ color: '#ffc107' }}
                                                    />
                                                    <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem' }}>
                                                        ({product.reviewCount || 124})
                                                    </Typography>
                                                </Box>

                                                {/* Price */}
                                                <Box sx={{ mt: 'auto' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                                        <Typography
                                                            variant="h5"
                                                            sx={{
                                                                fontWeight: 800,
                                                                color: '#ff5722',
                                                                background: 'linear-gradient(45deg, #ff5722, #ff8c42)',
                                                                backgroundClip: 'text',
                                                                WebkitBackgroundClip: 'text',
                                                                color: 'transparent',
                                                            }}
                                                        >
                                                            {product.price?.current?.toLocaleString('vi-VN')}₫
                                                        </Typography>
                                                        {discountPercent > 0 && (
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: '#999',
                                                                    textDecoration: 'line-through',
                                                                    fontSize: '0.9rem'
                                                                }}
                                                            >
                                                                {product.price?.original?.toLocaleString('vi-VN')}₫
                                                            </Typography>
                                                        )}
                                                    </Box>

                                                    {/* Shipping Info */}
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <LocalShipping sx={{ fontSize: 16, color: '#4caf50' }} />
                                                        <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                                                            Miễn phí vận chuyển
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Box key="pagination" sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={(event, value) => setPage(value)}
                                    color="primary"
                                    size={isMobile ? "small" : "large"}
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            borderRadius: 3,
                                            fontWeight: 'bold',
                                            '&.Mui-selected': {
                                                background: 'linear-gradient(45deg, #ff5722, #ff8c42)',
                                                color: 'white',
                                                boxShadow: '0 4px 15px rgba(255,87,34,0.3)'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        )}
                    </>
                ) : (
                    <Box key="no-products" sx={{ textAlign: 'center', py: 12 }}>
                        <Box
                            sx={{
                                width: 120,
                                height: 120,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 4
                            }}
                        >
                            <Discount sx={{ fontSize: 48, color: 'white' }} />
                        </Box>
                        <Typography variant="h4" color="text.secondary" gutterBottom fontWeight="bold">
                            Không tìm thấy sản phẩm
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                            Hiện không có sản phẩm nào trong danh mục {currentCategory.name}
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/categories')}
                            sx={{
                                background: 'linear-gradient(45deg, #ff5722, #ff8c42)',
                                borderRadius: 3,
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                boxShadow: '0 8px 25px rgba(255,87,34,0.3)'
                            }}
                        >
                            Quay lại danh mục
                        </Button>
                    </Box>
                )}
            </Container>

            <Footer />
        </Box>
    );
};

export default ProductsByCategory;