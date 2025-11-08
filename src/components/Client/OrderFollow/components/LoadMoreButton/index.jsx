import React from 'react'
import { Box, Button } from '@mui/material'

function LoadMoreButton() {
    return (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
                variant="outlined"
                sx={{
                    borderColor: 'grey.400',
                    color: 'grey.700',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    px: 4,
                    '&:hover': {
                        borderColor: '#ee4d2d',
                        color: '#ee4d2d'
                    }
                }}
            >
                Xem thêm
            </Button>
        </Box>
    )
}

export default LoadMoreButton