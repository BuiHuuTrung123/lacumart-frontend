import React from 'react'
import { Box, Typography } from '@mui/material'

function OrderHeader() {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{
                    color: '#ee4d2d',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
            >
                Đơn Mua
            </Typography>
        </Box>
    )
}

export default OrderHeader