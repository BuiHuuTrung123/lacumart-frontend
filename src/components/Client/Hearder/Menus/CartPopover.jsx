import React, { useState, useEffect } from 'react'
import { Box, Typography, Grid, Fade, Button, Divider, IconButton } from '@mui/material'
import { Delete, Add, Remove, ShoppingCart } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentCart, getCartDetailApi, deleItemToCartApi, updateQualityItemToCartApi } from '~/redux/cart/cartSlice'
import { selectCurrentUser } from '~/redux/user/userSlice/'
import { useNavigate } from 'react-router-dom'

const CartPopover = ({ showMenu, onClose }) => {
    const navigate = useNavigate()
    const currentCart = useSelector(selectCurrentCart)
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartDetailApi(currentUser._id))
    }, [dispatch])

    //Điều hướng đến trang chi tiết giỏ hàng
    const handleViewCartDetail = () => {
        navigate(`/cartDetail/${currentUser._id}`)
        onClose() // Đóng popover khi điều hướng
    }
 
const handleCheckout = () => {
        navigate(`/checkout/${currentUser._id}`)
    }

    // Format tiền VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }
    const handleUpdateIncreaseQualityItemToCartApi = (productId) => {

        dispatch(updateQualityItemToCartApi({ productId, cartActiveId: currentCart._id, signal: 'increase' }))
    }

    const handleUpdateReduceQualityItemToCartApi = (productId) => {

        dispatch(updateQualityItemToCartApi({ productId, cartActiveId: currentCart._id, signal: 'reduce' }))
    }
    const handleDeleteProductInCart = (productId) => {
        dispatch(deleItemToCartApi({ productId, cartActiveId: currentCart._id }))
    }

    return (
        <Fade in={showMenu} timeout={250}>
            <Box
                onMouseLeave={onClose}
                sx={{
                    width: '100%', // ← ĐỔI THÀNH 100% để fit với cha
                    height: '100%', // ← THÊM height: 100%
                    bgcolor: 'white',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header */}
                <Box sx={{ p: 2, bgcolor: '#ff5722', color: 'white', flexShrink: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '16px' }}>
                        🛒 Giỏ hàng của bạn ({currentCart?.items?.length || 0} sản phẩm)
                    </Typography>
                </Box>

                {/* Cart Items - Chiếm không gian còn lại */}
                <Box sx={{
                    flex: 1,
                    overflow: 'auto',
                    minHeight: 0 // ← QUAN TRỌNG: cho flex scroll hoạt động
                }}>
                    {!currentCart?.items || currentCart.items.length === 0 ? (
                        <Box sx={{
                            textAlign: 'center',
                            py: 4,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ShoppingCart sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                            <Typography color="textSecondary">
                                Giỏ hàng trống
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ p: 2 }}>
                            {currentCart.items.map((item, index) => (
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
                                                border: '1px solid #f0f0f0',
                                                flexShrink: 0
                                            }}
                                        />

                                        {/* Thông tin sản phẩm */}
                                        <Box sx={{ flex: 1, minWidth: 0 }}> {/* ← THÊM minWidth: 0 để text không tràn */}
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                    mb: 0.5,
                                                    lineHeight: 1.2,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
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
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        border: '1px solid #ddd',
                                                        width: 28,
                                                        height: 28
                                                    }}
                                                    onClick={() => { handleUpdateReduceQualityItemToCartApi(item.productId) }}
                                                >
                                                    <Remove sx={{ fontSize: 16 }} />
                                                </IconButton>

                                                <Typography sx={{
                                                    minWidth: '30px',
                                                    textAlign: 'center',
                                                    fontWeight: 600,
                                                    fontSize: '14px'
                                                }}>
                                                    {item.quantity}
                                                </Typography>

                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        border: '1px solid #ddd',
                                                        width: 28,
                                                        height: 28
                                                    }}
                                                    onClick={() => { handleUpdateIncreaseQualityItemToCartApi(item.productId) }}
                                                >
                                                    <Add sx={{ fontSize: 16 }} />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => { handleDeleteProductInCart(item.productId) }}
                                                    size="small"
                                                    sx={{
                                                        ml: 'auto',
                                                        color: '#ff4444',
                                                        '&:hover': { bgcolor: 'rgba(255,68,68,0.1)' },
                                                        width: 28,
                                                        height: 28
                                                    }}
                                                >
                                                    <Delete sx={{ fontSize: 16 }} />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                    {index < currentCart.items.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Footer - Total & Checkout */}
                {currentCart?.items && currentCart.items.length > 0 && (
                    <Box sx={{
                        p: 2,
                        bgcolor: '#f8fafc',
                        borderTop: '1px solid #e0e0e0',
                        flexShrink: 0
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>Tổng cộng:</Typography>
                            <Typography sx={{ fontWeight: 700, color: '#ff5722', fontSize: '18px' }}>
                                {formatPrice(currentCart.total)}
                            </Typography>
                        </Box>

                        <Button
                            fullWidth
                             onClick={handleCheckout}
                            variant="contained"
                            sx={{
                                bgcolor: '#ff5722',
                                fontWeight: 700,
                                py: 1.2,
                                borderRadius: '8px',
                                fontSize: '14px',
                                '&:hover': {
                                    bgcolor: '#e65100',
                                    transform: 'translateY(-1px)',
                                },
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Thanh toán ngay
                        </Button>

                        <Button
                            onClick={handleViewCartDetail}
                            fullWidth
                            variant="outlined"
                            sx={{
                                mt: 1,
                                borderColor: '#ff5722',
                                color: '#ff5722',
                                fontWeight: 600,
                                fontSize: '14px',
                                py: 1,
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