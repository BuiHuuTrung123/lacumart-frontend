import React from 'react'
import { Box, Typography, Button } from '@mui/material'

const CartFooter = ({ total, onCheckout, onViewCartDetail }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    return (
        <Box sx={{
            p: 2,
            bgcolor: '#f8fafc',
            borderTop: '1px solid #e0e0e0',
            flexShrink: 0
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>Tổng cộng:</Typography>
                <Typography sx={{ fontWeight: 700, color: '#ff5722', fontSize: '18px' }}>
                    {formatPrice(total)}
                </Typography>
            </Box>

            <Button
                fullWidth
                onClick={onCheckout}
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
                onClick={onViewCartDetail}
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
    )
}

export default CartFooter