import React from 'react'
import { Box, Typography, IconButton, Divider } from '@mui/material'
import { Delete, Add, Remove } from '@mui/icons-material'

const CartItem = ({ item, isLast, onIncreaseQuantity, onReduceQuantity, onDeleteItem }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price)
    }

    return (
        <Box>
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
                <Box sx={{ flex: 1, minWidth: 0 }}>
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
                            onClick={() => { onReduceQuantity(item.productId) }}
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
                            onClick={() => { onIncreaseQuantity(item.productId) }}
                        >
                            <Add sx={{ fontSize: 16 }} />
                        </IconButton>

                        <IconButton
                            onClick={() => { onDeleteItem(item.productId) }}
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
            {!isLast && <Divider />}
        </Box>
    )
}

export default CartItem