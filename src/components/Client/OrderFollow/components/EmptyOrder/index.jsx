import React from 'react'
import { Paper, Box, Typography, Button } from '@mui/material'
import { ShoppingBag } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function EmptyOrder({ activeTab }) {
    const navigate = useNavigate()
    const handleViewHome = () => {
        navigate('/Home')
    }
    return (
        <Paper
            sx={{
                textAlign: 'center',
                py: 8,
                borderRadius: 2,
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
        >
            <Box
                sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                }}
            >
                <ShoppingBag sx={{ fontSize: 40, color: '#c4c4c4' }} />
            </Box>
            <Typography variant="h6" color="grey.600" gutterBottom fontWeight="400">
                Chưa có đơn hàng
            </Typography>
            <Typography variant="body2" color="grey.500" sx={{ mb: 3, maxWidth: 300, mx: 'auto' }}>
                {activeTab === 0
                    ? 'Bạn chưa mua sản phẩm nào. Hãy bắt đầu mua sắm!'
                    : `Không có đơn hàng nào trong mục này`
                }
            </Typography>
            <Button
                onClick={() => handleViewHome()}
                variant="contained"
                sx={{

                    backgroundColor: '#ee4d2d',
                    borderRadius: 2,
                    px: 4,
                    py: 1,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '400',
                    '&:hover': {
                        backgroundColor: '#d73211'
                    }
                }}
            >
                MUA NGAY
            </Button>
        </Paper>
    )
}

export default EmptyOrder