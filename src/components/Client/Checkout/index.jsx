// Checkout.jsx
import React from 'react'
import {
    Box,
    Typography,
    Grid,
    Container,
    Paper,
    Stepper,
    Step,
    StepLabel,
    IconButton,
    Button,
    Alert
} from '@mui/material'
import { ArrowBack, AssignmentTurnedIn, Payment } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentCart } from '~/redux/cart/cartSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useOrderForm } from '~/hooks/order/useOrderForm'

// Components
import OrderSummary from './components/OrderSummary'
import ShippingStep from './components/ShippingStep'
import PaymentStep from './components/PaymentStep'
import ConfirmationStep from './components/ConfirmationStep'

const Checkout = () => {
    const navigate = useNavigate()
    const currentCart = useSelector(selectCurrentCart)
    const currentUser = useSelector(selectCurrentUser)
    
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        errors,
        activeStep,
        loading,
        paymentMethod,
        agreeTerms,
        cartItems,
        subtotal,
        shippingFee,
        total,
        handleNext,
        handleBack,
        handleCityChange,
        handleDistrictChange,
        selectedCity,
        selectedDistrict
    } = useOrderForm()

    const steps = ['Thông tin giao hàng', 'Phương thức thanh toán', 'Xác nhận đơn hàng']

    // Kiểm tra nếu giỏ hàng trống
    if (!cartItems || cartItems.length === 0) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container maxWidth="sm">
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h5" color="text.secondary" gutterBottom>
                            Giỏ hàng trống
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán
                        </Typography>
                        <Button 
                            variant="contained" 
                            onClick={() => navigate(`/cartDetail/${currentUser._id}`)}
                            startIcon={<ArrowBack />}
                        >
                            Quay lại giỏ hàng
                        </Button>
                    </Paper>
                </Container>
            </Box>
        )
    }

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <ShippingStep 
                        register={register} 
                        errors={errors} 
                        watch={watch} 
                        setValue={setValue}
                        selectedCity={selectedCity}
                        selectedDistrict={selectedDistrict}
                        onCityChange={handleCityChange}
                        onDistrictChange={handleDistrictChange}
                    />
                )
            case 1:
                return (
                    <PaymentStep 
                        paymentMethod={paymentMethod} 
                        setValue={setValue} 
                    />
                )
            case 2:
                return (
                    <ConfirmationStep 
                        watch={watch} 
                        paymentMethod={paymentMethod} 
                        cartItems={cartItems} 
                        agreeTerms={agreeTerms} 
                        setValue={setValue} 
                    />
                )
            default:
                return null
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconButton onClick={() => navigate(`/cartDetail/${currentUser._id}`)} sx={{ mr: 2 }}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        Thanh Toán
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Main Content */}
                    <Grid item xs={12} lg={8}>
                        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                            {/* Stepper */}
                            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            <Box sx={{ mb: 2 }}>
                                {activeStep === 2 && !agreeTerms && (
                                    <Alert severity="warning" sx={{ mb: 2 }}>
                                        Vui lòng đồng ý với điều khoản và điều kiện để hoàn tất đơn hàng
                                    </Alert>
                                )}
                            </Box>

                            {/* Step Content */}
                            <form onSubmit={handleSubmit}>
                                {renderStepContent()}

                                {/* Navigation Buttons */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                    <Button
                                        onClick={handleBack}
                                        disabled={activeStep === 0 || loading}
                                        startIcon={<ArrowBack />}
                                        sx={{ borderRadius: 2 }}
                                    >
                                        Quay lại
                                    </Button>
                                    
                                    {activeStep === steps.length - 1 ? (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={!agreeTerms || loading}
                                            startIcon={<AssignmentTurnedIn />}
                                            sx={{ 
                                                borderRadius: 2,
                                                px: 4,
                                                py: 1,
                                                fontWeight: 'bold',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                '&:disabled': {
                                                    background: 'grey.300'
                                                }
                                            }}
                                        >
                                            {loading ? 'Đang xử lý...' : 'Đặt Hàng'}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            disabled={loading}
                                            endIcon={<Payment />}
                                            sx={{ 
                                                borderRadius: 2,
                                                px: 4,
                                                py: 1,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Tiếp tục
                                        </Button>
                                    )}
                                </Box>
                            </form>
                        </Paper>
                    </Grid>

                    {/* Order Summary */}
                    <Grid item xs={12} lg={4}>
                        <OrderSummary 
                            cartItems={cartItems}
                            subtotal={subtotal}
                            shippingFee={shippingFee}
                            total={total}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
        
    )
}

export default Checkout