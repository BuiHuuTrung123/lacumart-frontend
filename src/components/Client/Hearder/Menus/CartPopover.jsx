import React, { useState, useEffect } from 'react'
import { Box, Typography, Grid, Fade, Button, Divider, IconButton } from '@mui/material'
import { Delete, Add, Remove, ShoppingCart } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentCart, getCartDetailApi } from '~/redux/cart/cartSlice'
import { selectCurrentUser } from '~/redux/user/userSlice/'

const CartPopover = ({ showMenu, onClose }) => {
    const currentCart = useSelector(selectCurrentCart)
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCartDetailApi(currentUser._id))
    }, [dispatch])

    // Tính tổng tiền
    const calculateTotal = () => {
        if (!currentCart?.items) return 0
        return currentCart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    // Format tiền VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }
    { currentUser._id }
    return (
        <Fade in={showMenu} timeout={250}>
            <Box
                onMouseLeave={onClose}
                sx={{
                    width: '400px', // Fixed width cho cart popover
                    bgcolor: 'white',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <Box sx={{ p: 2, bgcolor: '#ff5722', color: 'white' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '16px' }}>
                        🛒 Giỏ hàng của bạn ({currentCart?.items?.length || 0} sản phẩm)
                    </Typography>
                </Box>

                {/* Cart Items */}
                <Box sx={{ maxHeight: '400px', overflow: 'auto', p: 2 }}>
                    {!currentCart?.items || currentCart.items.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <ShoppingCart sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                            <Typography color="textSecondary">
                                Giỏ hàng trống
                            </Typography>
                        </Box>
                    ) : (
                        currentCart.items.map((item, index) => (
                            <Box key={item.productId || index}>
                                <Box sx={{ display: 'flex', gap: 2, py: 2 }}>
                                    {/* Ảnh sản phẩm */}
                                    <Box
                                        component="img"
                                        src={item.images}
                                        alt={item.name}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            border: '1px solid #f0f0f0'
                                        }}
                                    />

                                    {/* Thông tin sản phẩm */}
                                    <Box sx={{ flex: 1 }}>
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                mb: 0.5,
                                                lineHeight: 1.2
                                            }}
                                        >
                                            {item.name}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: 700,
                                                color: '#ff5722'
                                            }}
                                        >
                                            {formatPrice(item.price)}
                                        </Typography>

                                        {/* Quantity controls */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                            <IconButton size="small" sx={{ border: '1px solid #ddd' }}>
                                                <Remove sx={{ fontSize: 16 }} />
                                            </IconButton>

                                            <Typography sx={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>
                                                {item.quantity}
                                            </Typography>

                                            <IconButton size="small" sx={{ border: '1px solid #ddd' }}>
                                                <Add sx={{ fontSize: 16 }} />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                sx={{
                                                    ml: 'auto',
                                                    color: '#ff4444',
                                                    '&:hover': { bgcolor: 'rgba(255,68,68,0.1)' }
                                                }}
                                            >
                                                <Delete sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider />
                            </Box>
                        ))
                    )}
                </Box>

                {/* Footer - Total & Checkout */}
                {currentCart?.items && currentCart.items.length > 0 && (
                    <Box sx={{ p: 2, bgcolor: '#f8fafc' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography sx={{ fontWeight: 600 }}>Tổng cộng:</Typography>
                            <Typography sx={{ fontWeight: 700, color: '#ff5722', fontSize: '18px' }}>
                                {formatPrice(calculateTotal())}
                            </Typography>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: '#ff5722',
                                fontWeight: 700,
                                py: 1.5,
                                borderRadius: '8px',
                                '&:hover': {
                                    bgcolor: '#e65100',
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Thanh toán ngay
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                                mt: 1,
                                borderColor: '#ff5722',
                                color: '#ff5722',
                                fontWeight: 600,
                                '&:hover': {
                                    bgcolor: 'rgba(255,87,34,0.1)',
                                }
                            }}
                        >
                            Xem giỏ hàng chi tiết
                        </Button>
                    </Box>
                )}
            </Box>
        </Fade>
    )
}

export default CartPopover