import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Discount } from '@mui/icons-material'

const NoProducts = ({ currentCategory, onBackToCategories }) => {
    return (
        <Box key="no-products" sx={{ textAlign: 'center', py: 12 }}>
            <Box
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 4
                }}
            >
                <Discount sx={{ fontSize: 48, color: 'white' }} />
            </Box>
            <Typography variant="h4" color="text.secondary" gutterBottom fontWeight="bold">
                Không tìm thấy sản phẩm
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Hiện không có sản phẩm nào trong danh mục {currentCategory.name}
            </Typography>
            <Button
                variant="contained"
                size="large"
                onClick={onBackToCategories}
                sx={{
                    background: 'linear-gradient(45deg, #ff5722, #ff8c42)',
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 25px rgba(255,87,34,0.3)'
                }}
            >
                Quay lại danh mục
            </Button>
        </Box>
    )
}

export default NoProducts