// components/OrderSummary.jsx
import React from 'react'
import {
    Box,
    Typography,
    Paper,
    Divider
} from '@mui/material'
import { Security } from '@mui/icons-material'

const OrderSummary = ({ cartItems, subtotal, shippingFee, total }) => {
    return (
        <Paper 
            sx={{ 
                p: 4, 
                borderRadius: 3,
                boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                background: 'white',
                position: { lg: 'fixed' },
                top: 120,
                right: { lg: 'calc((100vw - 1280px) / 2 + 16px)' },
                width: { lg: '400px' },
                maxHeight: { lg: 'calc(100vh - 200px)' },
                overflow: 'auto'
            }}
        >
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Tổng Đơn Hàng
            </Typography>

            {/* Order Items Preview */}
            <Box sx={{ mb: 3 }}>
                {cartItems.slice(0, 3).map((item) => (
                    <Box key={item.productId} sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                        <img 
                            src={item.images} 
                            alt={item.name}
                            style={{ 
                                width: 40, 
                                height: 40, 
                                objectFit: 'cover', 
                                borderRadius: 4, 
                                marginRight: 12 
                            }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" fontWeight="medium" noWrap>
                                {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {item.quantity} × {item.price.toLocaleString('vi-VN')}₫
                            </Typography>
                        </Box>
                    </Box>
                ))}
                {cartItems.length > 3 && (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                        +{cartItems.length - 3} sản phẩm khác
                    </Typography>
                )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Order Summary */}
            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" color="text.secondary">
                        Tạm tính ({cartItems.length} sản phẩm)
                    </Typography>
                    <Typography variant="body1">
                        {subtotal.toLocaleString('vi-VN')}₫
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" color="text.secondary">
                        Phí vận chuyển
                    </Typography>
                    <Typography variant="body1" color={shippingFee === 0 ? 'success.main' : 'text.primary'}>
                        {shippingFee === 0 ? 'MIỄN PHÍ' : shippingFee.toLocaleString('vi-VN') + '₫'}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" color="text.secondary">
                        Giảm giá
                    </Typography>
                    <Typography variant="body1" color="success.main">
                        -0₫
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    Tổng cộng
                </Typography>
                <Typography variant="h5" color="primary" fontWeight="bold">
                    {total.toLocaleString('vi-VN')}₫
                </Typography>
            </Box>

            {/* Security Badge */}
            <Box sx={{ textAlign: 'center', pt: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Security sx={{ fontSize: 16, color: 'success.main' }} />
                    <Typography variant="caption" color="text.secondary">
                        Thanh toán an toàn & bảo mật
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}

export default OrderSummary