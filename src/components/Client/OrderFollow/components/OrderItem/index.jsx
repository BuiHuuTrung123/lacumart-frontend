import React from 'react'
import { Box, Avatar, Typography } from '@mui/material'

function OrderItem({ item, index, totalItems }) {
    const formatCurrency = (amount) => {
        if (!amount) return '0 ₫'
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                mb: 2,
                pb: 2,
                borderBottom: index === 0 && totalItems > 1 ? '1px solid' : 'none',
                borderColor: 'grey.100'
            }}
        >
            <Avatar
                src={item.images}
                variant="rounded"
                sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1
                }}
            />
            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="body2"
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 0.5
                    }}
                >
                    {item.name || 'Sản phẩm'}
                </Typography>
                <Typography variant="caption" color="grey.600">
                    Phân loại: {item.variant || 'Mặc định'}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Typography variant="body2" fontWeight="500" color="#ee4d2d">
                        {formatCurrency(item.price)}
                    </Typography>
                    <Typography variant="body2" color="grey.600">
                        x{item.quantity || 1}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default OrderItem