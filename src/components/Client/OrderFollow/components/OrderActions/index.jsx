import React from 'react'
import { Box, Button, IconButton } from '@mui/material'
import { MoreVert } from '@mui/icons-material'

function OrderActions({ status }) {
    const getStatusActions = (status) => {
        switch (status) {
            case 'completed':
                return [
                    { label: 'Đánh giá', color: 'primary', variant: 'outlined' },
                    { label: 'Mua lại', color: 'primary', variant: 'contained' }
                ]
            case 'pending':
                return [
                    { label: 'Liên hệ người bán', color: 'secondary', variant: 'outlined' },
                    { label: 'Hủy đơn', color: 'error', variant: 'outlined' }
                ]
            case 'shipping':
                return [
                    { label: 'Liên hệ người bán', color: 'secondary', variant: 'outlined' },
                    { label: 'Theo dõi đơn', color: 'primary', variant: 'contained' }
                ]
            case 'cancelled':
                return [
                    { label: 'Mua lại', color: 'primary', variant: 'contained' }
                ]
            default:
                return []
        }
    }

    const actions = getStatusActions(status)

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'grey.100'
        }}>
            {actions.map((action, index) => (
                <Button
                    key={index}
                    variant={action.variant}
                    color={action.color}
                    size="small"
                    sx={{
                        borderRadius: 2,
                        fontSize: '0.8rem',
                        textTransform: 'none',
                        minWidth: 'auto',
                        px: 2,
                        borderColor: action.color === 'secondary' ? 'grey.400' : undefined,
                        color: action.color === 'secondary' ? 'grey.700' : undefined
                    }}
                >
                    {action.label}
                </Button>
            ))}
            <IconButton 
                size="small" 
                sx={{ 
                    border: '1px solid', 
                    borderColor: 'grey.400', 
                    borderRadius: 2 
                }}
            >
                <MoreVert sx={{ fontSize: 18 }} />
            </IconButton>
        </Box>
    )
}

export default OrderActions