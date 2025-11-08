import React from 'react'
import { Box, Typography } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import CartItem from '~/components/Client/Header/components/RightSection/components/CartIcon/components/CartPopover/components/CartItemsList/CartItem'

const CartItemsList = ({ items, onIncreaseQuantity, onReduceQuantity, onDeleteItem }) => {
    if (!items || items.length === 0) {
        return (
            <Box sx={{
                textAlign: 'center',
                py: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}>
                <ShoppingCart sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                <Typography color="textSecondary">
                    Giỏ hàng trống
                </Typography>
            </Box>
        )
    }

    return (
        <Box sx={{
            flex: 1,
            overflow: 'auto',
            minHeight: 0,
            '&::-webkit-scrollbar': {
                width: '6px',
            },
            '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: '#c1c1c1',
                borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: '#a8a8a8',
            }
        }}>
            <Box sx={{ p: 2 }}>
                {items.map((item, index) => (
                    <CartItem
                        key={item.productId || index}
                        item={item}
                        isLast={index === items.length - 1}
                        onIncreaseQuantity={onIncreaseQuantity}
                        onReduceQuantity={onReduceQuantity}
                        onDeleteItem={onDeleteItem}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default CartItemsList