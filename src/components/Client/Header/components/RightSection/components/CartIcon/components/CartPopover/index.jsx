import React, { useState, useEffect } from 'react'
import { Box, Fade } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCurrentCart, getCartDetailApi, deleItemToCartApi, updateQualityItemToCartApi } from '~/redux/cart/cartSlice'
import { selectCurrentUser } from '~/redux/user/userSlice/'

import CartHeader from '~/components/Client/Header/components/RightSection/components/CartIcon/components/CartPopover/components/CartHeader'
import CartItemsList from '~/components/Client/Header/components/RightSection/components/CartIcon/components/CartPopover/components/CartItemsList'
import CartFooter from '~/components/Client/Header/components/RightSection/components/CartIcon/components/CartPopover/components/CartFooter'

const CartPopover = ({ showMenu, onClose }) => {
    const navigate = useNavigate()
    const currentCart = useSelector(selectCurrentCart)
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        if(currentUser){
              dispatch(getCartDetailApi(currentUser?._id))
        }
    }, [dispatch, currentUser])

    const handleViewCartDetail = () => {
        navigate(`/cartDetail/${currentUser._id}`)
        onClose()
    }
 
    const handleCheckout = () => {
        navigate(`/checkout/${currentUser._id}`)
    }

    const handleUpdateIncreaseQualityItemToCartApi = (productId) => {
        dispatch(updateQualityItemToCartApi({ productId, cartActiveId: currentCart._id, signal: 'increase' }))
    }

    const handleUpdateReduceQualityItemToCartApi = (productId) => {
        dispatch(updateQualityItemToCartApi({ productId, cartActiveId: currentCart._id, signal: 'reduce' }))
    }

    const handleDeleteProductInCart = (productId) => {
        dispatch(deleItemToCartApi({ productId, cartActiveId: currentCart._id }))
    }

    return (
        
        
        <Fade in={showMenu} timeout={250}>
            <Box
                onMouseLeave={onClose}
                sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: 'white',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <CartHeader itemCount={currentCart?.items?.length || 0} />
                
                <CartItemsList 
                    items={currentCart?.items}
                    onIncreaseQuantity={handleUpdateIncreaseQualityItemToCartApi}
                    onReduceQuantity={handleUpdateReduceQualityItemToCartApi}
                    onDeleteItem={handleDeleteProductInCart}
                />
                
                {currentCart?.items && currentCart.items.length > 0 && (
                    <CartFooter 
                        total={currentCart.total}
                        onCheckout={handleCheckout}
                        onViewCartDetail={handleViewCartDetail}
                    />
                )}
            </Box>
        </Fade>


    )
}

export default CartPopover