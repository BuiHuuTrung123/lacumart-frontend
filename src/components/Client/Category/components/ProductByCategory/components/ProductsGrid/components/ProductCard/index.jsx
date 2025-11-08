import React from 'react'
import { Card, Box, Typography, Button, Rating, IconButton, Badge, CardMedia, CardContent } from '@mui/material'
import { ShoppingCart, FlashOn, Favorite, LocalShipping } from '@mui/icons-material'

const ProductCard = ({ product, onProductClick, onAddToCart, onQuickBuy, onFavoriteClick }) => {
    const discountPercent = product.price?.original > product.price?.current 
        ? Math.round((1 - product.price.current / product.price.original) * 100)
        : 0

    return (
        <Card
            onClick={() => onProductClick(product._id)}
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

            <IconButton
                onClick={onFavoriteClick}
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
                        onClick={(e) => onAddToCart(product, e)}
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
                        onClick={onQuickBuy}
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

            <CardContent
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    flexGrow: 1
                }}
            >
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
                               
                            }}
                        >
                             {product.price?.current?.toLocaleString('vi-VN') }₫ {/* ← SỬA: lấy current price */}
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

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocalShipping sx={{ fontSize: 16, color: '#4caf50' }} />
                        <Typography variant="caption" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                            Miễn phí vận chuyển
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductCard