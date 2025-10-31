import React, { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    Grid,
    Fade,
    Button,
    Divider,
    IconButton,
    Card,
    Container,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Chip
} from '@mui/material'
import {
    Add,
    Remove,
    Delete,
    ShoppingBag,
    ShoppingCartCheckout,
    ArrowBack,
    LocalShipping,
    Payment,
    AssignmentTurnedIn,
    Discount,
    Security
} from '@mui/icons-material'
import Hearder from '~/components/Client/Hearder/Hearder'
import Footer from '~/components/Client/Footer/Footer'
import { selectCurrentUser } from '~/redux/user/userSlice/'
import { selectCurrentCart, getCartDetailApi, deleItemToCartApi, updateQualityItemToCartApi } from '~/redux/cart/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Cart() {
    const currentCart = useSelector(selectCurrentCart)
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        if (currentUser) {
            dispatch(getCartDetailApi(currentUser._id))
        }

    }, [dispatch])

    const handleUpdateIncreaseQualityItemToCartApi = (productId) => {
        dispatch(updateQualityItemToCartApi({ productId, cartActiveId: currentCart._id, signal: 'increase' }))
    }

    const handleUpdateReduceQualityItemToCartApi = (productId) => {
        if (currentCart.items.find(item => item.productId === productId)?.quantity > 1) {
            dispatch(updateQualityItemToCartApi({ productId, cartActiveId: currentCart._id, signal: 'reduce' }))
        }
    }

    const handleDeleteProductInCart = (productId) => {
        dispatch(deleItemToCartApi({ productId, cartActiveId: currentCart._id }))
    }

    const handleContinueShopping = () => {
        navigate('/products')
    }

    const handleCheckout = () => {
        navigate(`/checkout/${currentUser._id}`)
    }
    // Thêm hàm này để extract public_id
    const getImagePublicId = (imageUrl) => {
        if (!imageUrl) return '';

        // Nếu URL đã có transformation, cần xử lý đặc biệt
        if (imageUrl.includes('/upload/')) {
            const parts = imageUrl.split('/upload/');
            if (parts.length === 2) {
                // Lấy phần sau /upload/ và bỏ transformation nếu có
                const afterUpload = parts[1];
                // Tìm vị trí của version (v123456...)
                const versionIndex = afterUpload.indexOf('/v');
                if (versionIndex !== -1) {
                    return afterUpload.substring(versionIndex + 1);
                }
                return afterUpload;
            }
        }
        return imageUrl;
    };
    const steps = ['Giỏ hàng', 'Vận chuyển', 'Thanh toán', 'Xác nhận']

    const totalAmount = currentCart?.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0
    const shippingFee = totalAmount > 500000 ? 0 : 30000
    const finalTotal = totalAmount + shippingFee

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Hearder />

            <Container maxWidth="xl" sx={{ py: 4, position: 'relative' }}>
                {/* Progress Stepper */}
                <Paper
                    sx={{
                        p: 4,
                        mb: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white'
                    }}
                >
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel
                                    sx={{
                                        '& .MuiStepLabel-label': {
                                            color: 'white !important',
                                            fontWeight: 'bold'
                                        }
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>

                <Grid container spacing={4}>
                    {/* Cart Items Section */}
                    <Grid item xs={12} lg={8}>
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                background: 'white'
                            }}
                        >
                            {/* Header */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: '2px solid', borderColor: 'primary.main' }}>
                                <ShoppingBag sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                                <Box>
                                    <Typography variant="h4" fontWeight="bold" color="primary">
                                        Giỏ Hàng Của Bạn
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {currentCart?.items?.length || 0} sản phẩm trong giỏ hàng
                                    </Typography>
                                </Box>
                                {currentCart?.items?.length > 0 && (
                                    <Chip
                                        label={`${currentCart.items.length} sản phẩm`}
                                        color="primary"
                                        variant="outlined"
                                        sx={{ ml: 'auto', fontWeight: 'bold' }}
                                    />
                                )}
                            </Box>

                            {/* Cart Items List */}
                            {currentCart && currentCart.items && currentCart.items.length > 0 ? (
                                <Fade in={true}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {currentCart.items.map((item) => (
                                            <Card
                                                key={item.productId}
                                                sx={{
                                                    p: 3,
                                                    borderRadius: 3,
                                                    border: '2px solid',
                                                    borderColor: 'grey.100',
                                                    transition: 'all 0.3s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                                        borderColor: 'primary.light'
                                                    }
                                                }}
                                            >
                                                <Grid container spacing={3} alignItems="center">
                                                    {/* Product Image */}
                                                    <Grid item xs={12} sm={3} md={2}>
                                                        <Box
                                                            sx={{
                                                                width: '100%',
                                                                height: 120,
                                                                borderRadius: 2,
                                                                overflow: 'hidden',
                                                                bgcolor: 'grey.50',
                                                                position: 'relative'
                                                            }}
                                                        >
                                                            <img
                                                                src={item.images.replace(
                                                                    '/upload/',
                                                                    '/upload/w_200,h_200,c_fit,q_95,f_webp/'
                                                                )}
                                                                alt={item.name}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover', // Đổi thành contain
                                                                    imageRendering: 'crisp-edges',
                                                                    background: '#f8fafc'
                                                                }}
                                                            />                       </Box>
                                                    </Grid>

                                                    {/* Product Info */}
                                                    <Grid item xs={12} sm={4} md={5}>
                                                        <Typography
                                                            variant="h6"
                                                            fontWeight="bold"
                                                            gutterBottom
                                                            sx={{
                                                                color: 'text.primary',
                                                                lineHeight: 1.3
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="h5"
                                                            color="primary"
                                                            fontWeight="bold"
                                                            sx={{ mt: 1 }}
                                                        >
                                                            {item.price.toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            })}
                                                        </Typography>
                                                    </Grid>

                                                    {/* Quantity Controls */}
                                                    <Grid item xs={12} sm={3} md={3}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <IconButton
                                                                onClick={() => handleUpdateReduceQualityItemToCartApi(item.productId)}
                                                                sx={{
                                                                    border: '2px solid',
                                                                    borderColor: 'primary.main',
                                                                    borderRadius: 2,
                                                                    color: 'primary.main',
                                                                    '&:hover': {
                                                                        bgcolor: 'primary.main',
                                                                        color: 'white'
                                                                    },
                                                                    transition: 'all 0.2s'
                                                                }}
                                                            >
                                                                <Remove fontSize="small" />
                                                            </IconButton>

                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    mx: 3,
                                                                    minWidth: 40,
                                                                    textAlign: 'center',
                                                                    fontWeight: 'bold',
                                                                    color: 'text.primary'
                                                                }}
                                                            >
                                                                {item.quantity}
                                                            </Typography>

                                                            <IconButton
                                                                onClick={() => handleUpdateIncreaseQualityItemToCartApi(item.productId)}
                                                                sx={{
                                                                    border: '2px solid',
                                                                    borderColor: 'primary.main',
                                                                    borderRadius: 2,
                                                                    color: 'primary.main',
                                                                    '&:hover': {
                                                                        bgcolor: 'primary.main',
                                                                        color: 'white'
                                                                    },
                                                                    transition: 'all 0.2s'
                                                                }}
                                                            >
                                                                <Add fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </Grid>

                                                    {/* Total and Actions */}
                                                    <Grid item xs={12} sm={2} md={2}>
                                                        <Box sx={{ textAlign: 'center' }}>
                                                            <Typography
                                                                variant="h5"
                                                                color="primary"
                                                                fontWeight="bold"
                                                                gutterBottom
                                                            >
                                                                {(item.price * item.quantity).toLocaleString('vi-VN', {
                                                                    style: 'currency',
                                                                    currency: 'VND'
                                                                })}
                                                            </Typography>
                                                            <IconButton
                                                                onClick={() => handleDeleteProductInCart(item.productId)}
                                                                sx={{
                                                                    color: 'error.main',
                                                                    borderRadius: 2,
                                                                    '&:hover': {
                                                                        bgcolor: 'error.main',
                                                                        color: 'white',
                                                                        transform: 'scale(1.1)'
                                                                    },
                                                                    transition: 'all 0.2s'
                                                                }}
                                                            >
                                                                <Delete />
                                                            </IconButton>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        ))}
                                    </Box>
                                </Fade>
                            ) : (
                                /* Empty Cart State */
                                <Box sx={{ textAlign: 'center', py: 8 }}>
                                    <ShoppingBag sx={{ fontSize: 80, color: 'grey.300', mb: 3 }} />
                                    <Typography variant="h4" color="text.secondary" gutterBottom fontWeight="bold">
                                        Giỏ hàng của bạn đang trống
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                                        Hãy khám phá và thêm những sản phẩm yêu thích vào giỏ hàng để bắt đầu mua sắm
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<ArrowBack />}
                                        onClick={handleContinueShopping}
                                        sx={{
                                            borderRadius: 3,
                                            px: 4,
                                            py: 1.5,
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Tiếp Tục Mua Sắm
                                    </Button>
                                </Box>
                            )}
                        </Paper>
                    </Grid>

                    {/* Order Summary - Fixed Position */}
                    <Grid item xs={12} lg={4}>
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                                background: 'white',
                                position: { xs: 'static', lg: 'static' },
                                top: 140,
                                right: { lg: 'calc((100vw - 1280px) / 2 + 16px)' },
                                width: { xs: '100%', lg: '400px' },
                                maxHeight: { xs: 'auto', lg: 'calc(100vh - 200px)' },
                                overflow: 'auto',
                                zIndex: 1000
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                                Tổng Đơn Hàng
                            </Typography>

                            {/* Order Details */}
                            <Box sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, py: 1 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        Tạm tính ({currentCart?.items?.length || 0} sản phẩm)
                                    </Typography>
                                    <Typography variant="body1" fontWeight="medium">
                                        {totalAmount.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, py: 1 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        Phí vận chuyển
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        fontWeight="medium"
                                        color={shippingFee === 0 ? 'success.main' : 'text.primary'}
                                    >
                                        {shippingFee === 0 ? 'MIỄN PHÍ' : '30.000₫'}
                                    </Typography>
                                </Box>

                                {shippingFee > 0 && (
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, py: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Miễn phí vận chuyển từ 500K
                                        </Typography>
                                        <Chip
                                            label={`Còn ${(500000 - totalAmount).toLocaleString('vi-VN')}₫`}
                                            size="small"
                                            color="warning"
                                            variant="outlined"
                                        />
                                    </Box>
                                )}

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, py: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Discount sx={{ mr: 1, color: 'success.main' }} />
                                        <Typography variant="body1" color="text.secondary">
                                            Giảm giá
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" color="success.main" fontWeight="medium">
                                        -0₫
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* Final Total */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, py: 1 }}>
                                <Typography variant="h5" fontWeight="bold">
                                    Tổng cộng
                                </Typography>
                                <Typography variant="h4" color="primary" fontWeight="bold">
                                    {finalTotal.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND'
                                    })}
                                </Typography>
                            </Box>

                            {/* Checkout Button */}
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                startIcon={<ShoppingCartCheckout />}
                                disabled={!currentCart?.items?.length}
                                onClick={handleCheckout}
                                sx={{
                                    borderRadius: 3,
                                    py: 2,
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Tiến Hành Thanh Toán
                            </Button>

                            {/* Security Badge */}
                            <Box sx={{ textAlign: 'center', mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <Security sx={{ fontSize: 16, color: 'success.main' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        Thanh toán an toàn & bảo mật
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </Box>
    )
}

export default Cart