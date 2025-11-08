import React from 'react'
import {
    Paper,
    Typography,
    Box,
    Divider,
    Button,
    Chip,
    LinearProgress
} from '@mui/material'
import {
    ShoppingCartCheckout,
    Discount,
    Security,
    LocalShipping,
    CheckCircle
} from '@mui/icons-material'
import { Grid } from '@mui/material'

const OrderSummary = ({ currentCart, totalAmount, shippingFee, finalTotal, onCheckout }) => {
    const freeShippingThreshold = 500000;
    const amountToFreeShipping = Math.max(freeShippingThreshold - totalAmount, 0);
    const progress = Math.min((totalAmount / freeShippingThreshold) * 100, 100);

    return (
        <Grid item xs={12} lg={4}>
            <Paper
                sx={{
                    maxHeight: '100%',
                    p: 4,
                    borderRadius: 3,
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    position: 'sticky',
                    top: 234
                }}
            >   
                <Typography 
                    variant="h5" 
                    fontWeight="bold" 
                    gutterBottom 
                    sx={{ 
                        fontFamily: 'sans-serif',
                        color: '#333',
                        fontSize: '20px',
                        mb: 3
                    }}
                >
                    Tổng Đơn Hàng
                </Typography>

                {/* Free Shipping Progress */}
                {shippingFee > 0 && totalAmount < freeShippingThreshold && (
                    <Box sx={{ mb: 3, p: 2, background: 'rgba(255, 106, 0, 0.05)', borderRadius: 2, border: '1px solid rgba(255, 106, 0, 0.1)' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2" fontWeight="bold" color="#FF6A00">
                                Miễn phí vận chuyển
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="#FF6A00">
                                {progress.toFixed(0)}%
                            </Typography>
                        </Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={progress} 
                            sx={{ 
                                height: 6, 
                                borderRadius: 3,
                                backgroundColor: 'rgba(255, 106, 0, 0.2)',
                                '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(90deg, #FF6A00 0%, #FF8C00 100%)',
                                    borderRadius: 3
                                }
                            }} 
                        />
                        <Typography variant="caption" color="#666" sx={{ mt: 1, display: 'block' }}>
                            Mua thêm {amountToFreeShipping.toLocaleString('vi-VN')}đ để được MIỄN PHÍ VẬN CHUYỂN
                        </Typography>
                    </Box>
                )}

                {/* Order Details */}
                <Box sx={{ mb: 2 }}>
                    {/* Temporary Amount */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 2,
                        py: 1.5,
                        px: 1
                    }}>
                        <Typography variant="body1" color="#666">
                            Tạm tính ({currentCart?.items?.length || 0} sản phẩm)
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" color="#333">
                            {totalAmount.toLocaleString('vi-VN')}đ
                        </Typography>
                    </Box>

                    {/* Shipping Fee */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 2,
                        py: 1.5,
                        px: 1
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocalShipping sx={{ 
                                color: shippingFee === 0 ? '#00C853' : '#666',
                                fontSize: 20 
                            }} />
                            <Typography variant="body1" color="#666">
                                Phí vận chuyển
                            </Typography>
                        </Box>
                        <Typography 
                            variant="body1" 
                            fontWeight="bold" 
                            color={shippingFee === 0 ? '#00C853' : '#333'}
                        >
                            {shippingFee === 0 ? 'MIỄN PHÍ' : `${shippingFee.toLocaleString('vi-VN')}đ`}
                        </Typography>
                    </Box>

                    {/* Discount */}
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 2,
                        py: 1.5,
                        px: 1
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Discount sx={{ color: '#00C853', fontSize: 20 }} />
                            <Typography variant="body1" color="#666">
                                Giảm giá
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="#00C853" fontWeight="bold">
                            -0đ
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3, borderColor: '#e0e0e0' }} />

                {/* Final Total */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: 4,
                    py: 2,
                    px: 1
                }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '18px', color: '#333' }}>
                        Tổng thanh toán
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="#FF6A00" sx={{ fontSize: '20px' }}>
                        {finalTotal.toLocaleString('vi-VN')}đ
                    </Typography>
                </Box>

                {/* Checkout Button */}
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<ShoppingCartCheckout />}
                    disabled={!currentCart?.items?.length}
                    onClick={onCheckout}
                    sx={{
                        borderRadius: 2,
                        py: 2,
                        fontWeight: 'bold',
                        fontSize: '16px',
                        background: 'linear-gradient(135deg, #FF6A00 0%, #FF8C00 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #E55C00 0%, #E57C00 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(255, 106, 0, 0.3)'
                        },
                        '&.Mui-disabled': {
                            background: '#e0e0e0',
                            color: '#9e9e9e'
                        },
                        transition: 'all 0.3s ease',
                        mb: 3,
                        textTransform: 'none'
                    }}
                >
                    Tiến Hành Thanh Toán
                </Button>   

                {/* Security & Benefits */}
                <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 3 }}>
                        <Security sx={{ color: '#00C853', fontSize: 18 }} />
                        <Typography variant="body2" color="#666">
                            Thanh toán an toàn & bảo mật
                        </Typography>
                    </Box>
                    
                    {/* Benefits */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle sx={{ fontSize: 16, color: '#00C853' }} />
                            <Typography variant="caption" color="#666">
                                Giao hàng nhanh trong 2h
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle sx={{ fontSize: 16, color: '#00C853' }} />
                            <Typography variant="caption" color="#666">
                                Đổi trả trong 7 ngày
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle sx={{ fontSize: 16, color: '#00C853' }} />
                            <Typography variant="caption" color="#666">
                                Hỗ trợ 24/7
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Grid>
    )
}

export default OrderSummary