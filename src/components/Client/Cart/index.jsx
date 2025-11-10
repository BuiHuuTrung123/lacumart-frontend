import React, { useState, useEffect } from 'react'
import { Box, Container, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Hearder from '~/components/Client/Header'
import Footer from '~/components/Client/Footer/Footer'
import { selectCurrentUser } from '~/redux/user/userSlice/'
import { selectCurrentCart, getCartDetailApi, deleItemToCartApi, updateQualityItemToCartApi } from '~/redux/cart/cartSlice'

import ProgressStepper from './components/ProgressStepper'
import CartItemsSection from './components/CartItemsSection'
import OrderSummary from './components/OrderSummary'

function Cart() {
    const currentCart = useSelector(selectCurrentCart)
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        if (currentUser) {
            dispatch(getCartDetailApi(currentUser._id))
        }
    }, [dispatch, currentUser])

    const handleUpdateIncreaseQualityItemToCartApi = (productId) => {
        dispatch(updateQualityItemToCartApi({ productId, cartActiveId: currentCart._id, signal: 'increase' }))
    }

    const handleUpdateReduceQualityItemToCartApi = (productId) => {
        if (currentCart.items.find(item => item.productId === productId)?.quantity > 1) {
            dispatch(updateQualityItemToCartApi({ productId, cartActiveId: currentCart._id, signal: 'reduce' }))
        }
    }

    const handleDeleteProductInCart = (productId) => {
        dispatch(deleItemToCartApi({ productId, cartActiveId: currentCart._id }))
    }

    const handleContinueShopping = () => {
        navigate('/products')
    }

    const handleCheckout = () => {
        navigate(`/checkout`)
    }

    const steps = ['Giỏ hàng', 'Vận chuyển', 'Thanh toán', 'Xác nhận']

    const totalAmount = currentCart?.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0
    const shippingFee = totalAmount > 500000 ? 0 : 30000
    const finalTotal = totalAmount + shippingFee

    return (
        <Box sx={{
            minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex',
            flexDirection: 'column'
        }}>
            <Hearder />

            <Container maxWidth="xl"
                sx={{
                    py: { xs: 8, sm: 12, md: 20 },   // padding top/bottom responsive
                    position: 'relative',
                    flexGrow: 1                     // để Container chiếm khoảng trống chính giữa Header và Footer
                }}>
                {/* <ProgressStepper activeStep={activeStep} steps={steps} /> */}

                <Grid container spacing={4}>
                    <CartItemsSection
                        currentCart={currentCart}
                        onIncreaseQuantity={handleUpdateIncreaseQualityItemToCartApi}
                        onReduceQuantity={handleUpdateReduceQualityItemToCartApi}
                        onDeleteItem={handleDeleteProductInCart}
                        onContinueShopping={handleContinueShopping}
                    />

                    <OrderSummary
                        currentCart={currentCart}
                        totalAmount={totalAmount}
                        shippingFee={shippingFee}
                        finalTotal={finalTotal}
                        onCheckout={handleCheckout}
                    />
                </Grid>
            </Container>

            <Footer />
        </Box>
    )
}

export default Cart