import React from 'react'
import { Box, Typography } from '@mui/material'

const CartHeader = ({ itemCount }) => {
    return (
        <Box sx={{ p: 2, bgcolor: '#ff5722', color: 'white', flexShrink: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '16px' }}>
                🛒 Giỏ hàng của bạn ({itemCount} sản phẩm)
            </Typography>
        </Box>
    )
}

export default CartHeader