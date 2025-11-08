import React from 'react'
import {
    Box,
    Typography,
    Fade,
    Grid,
    IconButton,
    Button,
    Divider,
    Card
} from '@mui/material'
import {
    ShoppingBag,
    ArrowBack,
    Add,
    Remove,
    Delete
} from '@mui/icons-material'

const CartItemsSection = ({
    currentCart,
    onIncreaseQuantity,
    onReduceQuantity,
    onDeleteItem,
    onContinueShopping
}) => {
    return (
        <Grid item xs={12} lg={8}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                        fontFamily: 'sans-serif',
                        fontSize: '28px',
                        color: '#333'
                    }}
                >
                    Giỏ Hàng
                </Typography>
                <Divider />
            </Box>

            {/* Cart Items */}
            {currentCart?.items?.length > 0 ? (
                <Fade in={true}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {currentCart.items.map((item) => (
                            <Card
                                key={item.productId}
                                sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    border: '1px solid #e0e0e0',
                                    background: 'white',
                                    boxShadow: 'none'
                                }}
                            >
                                <Grid container spacing={3} alignItems="center">
                                    {/* Product Image */}
                                    <Grid item xs={12} sm={2}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: 80,
                                                borderRadius: 1,
                                                overflow: 'hidden',
                                                bgcolor: 'white',
                                            }}
                                        >
                                            <img
                                                src={item.images}
                                                alt={item.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Product Info */}
                                    <Grid item xs={12} sm={4}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            gutterBottom
                                            sx={{
                                                fontFamily: 'sans-serif',
                                                fontSize: '16px',
                                                color: '#333',
                                                lineHeight: 1.3
                                            }}
                                        >
                                            {item.name}
                                        </Typography>

                                        {/* Product Specifications */}
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: '#FF6A00',
                                                        fontWeight: 'bold',
                                                        minWidth: 60
                                                    }}
                                                >
                                                    Hương Vị:
                                                </Typography>
                                                <Typography variant="body2" color="#666">
                                                    Chocolate
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: '#FF6A00',
                                                        fontWeight: 'bold',
                                                        minWidth: 60
                                                    }}
                                                >
                                                    Quà Tặng:
                                                </Typography>
                                                <Typography variant="body2" color="#666">
                                                    Không quà giảm
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: '#FF6A00',
                                                        fontWeight: 'bold',
                                                        minWidth: 60
                                                    }}
                                                >
                                                    Tặng:
                                                </Typography>
                                                <Typography variant="body2" color="#666">
                                                    30.000đ
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    {/* Unit Price */}
                                    <Grid item xs={12} sm={2}>
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{
                                                fontFamily: 'sans-serif',
                                                color: '#333',
                                                fontSize: '18px'
                                            }}
                                        >
                                            {item.price.toLocaleString('vi-VN')}đ
                                        </Typography>
                                    </Grid>

                                    {/* Quantity Controls */}
                                    <Grid item xs={12} sm={2}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            bgcolor: '#f5f5f5',
                                            borderRadius: 3,
                                            px: 1,
                                            py: 0.5,
                                            width: 'fit-content'
                                        }}>
                                            <IconButton
                                                onClick={() => onReduceQuantity(item.productId)}
                                                size="small"
                                                sx={{
                                                    color: '#666',
                                                    '&:hover': {
                                                        bgcolor: '#e0e0e0'
                                                    }
                                                }}
                                            >
                                                <Remove fontSize="small" />
                                            </IconButton>

                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    minWidth: 40,
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    color: '#333',
                                                    mx: 1
                                                }}
                                            >
                                                {item.quantity}
                                            </Typography>

                                            <IconButton
                                                onClick={() => onIncreaseQuantity(item.productId)}
                                                size="small"
                                                sx={{
                                                    color: '#666',
                                                    '&:hover': {
                                                        bgcolor: '#e0e0e0'
                                                    }
                                                }}
                                            >
                                                <Add fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Grid>

                                    {/* Total Price & Delete */}
                                    <Grid item xs={12} sm={2}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                                            <Typography
                                                variant="h6"
                                                fontWeight="bold"
                                                sx={{
                                                    fontFamily: 'sans-serif',
                                                    color: '#333',
                                                    fontSize: '18px'
                                                }}
                                            >
                                                {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                            </Typography>
                                            <Button
                                                onClick={() => onDeleteItem(item.productId)}
                                                startIcon={<Delete />}
                                                sx={{
                                                    color: '#ff4444',
                                                    textTransform: 'none',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    '&:hover': {
                                                        bgcolor: 'rgba(255, 68, 68, 0.04)'
                                                    }
                                                }}
                                            >
                                                Xoá
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    </Box>
                </Fade>
            ) : (
                /* Empty Cart State */
                <Box sx={{ textAlign: 'center', py: 12 }}>
                    <ShoppingBag sx={{ fontSize: 80, color: '#e0e0e0', mb: 3 }} />
                    <Typography variant="h5" color="#666" gutterBottom fontWeight="bold">
                        Giỏ hàng của bạn đang trống
                    </Typography>
                    <Typography variant="body2" color="#666" sx={{ mb: 4 }}>
                        Hãy khám phá và thêm những sản phẩm yêu thích vào giỏ hàng
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<ArrowBack />}
                        onClick={onContinueShopping}
                        sx={{
                            borderRadius: 2,
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            bgcolor: '#FF6A00',
                            '&:hover': {
                                bgcolor: '#E55C00'
                            }
                        }}
                    >
                        Tiếp Tục Mua Sắm
                    </Button>
                </Box>
            )}

            {/* Coupon Section */}
            {currentCart?.items?.length > 0 && (
                <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
                    <Typography variant="body2" color="#666">
                        Các coupon đã lưu:
                    </Typography>
                </Box>
            )}
        </Grid>
    )
}

export default CartItemsSection