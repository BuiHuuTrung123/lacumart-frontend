import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Divider,
    Card,
    Container,
    Paper,
    Stepper,
    Step,
    StepLabel,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Checkbox,
    IconButton,
    Chip,
    Alert
} from '@mui/material';
import {
    ArrowBack,
    ShoppingCartCheckout,
    LocalShipping,
    Payment,
    AssignmentTurnedIn,
    Security,
    CreditCard,
    AccountBalance,
    QrCode,
    LocationOn,
    Edit,
    Delete
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentCart } from '~/redux/cart/cartSlice';
import { selectCurrentUser } from '~/redux/user/userSlice/';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const currentCart = useSelector(selectCurrentCart);
    const currentUser = useSelector(selectCurrentUser);
    
    const [activeStep, setActiveStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [saveShippingInfo, setSaveShippingInfo] = useState(true);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        fullName: '',
        phone: '',
        address: '',
        ward: '',
        district: '',
        city: ''
    });

    // Lấy dữ liệu từ cart
    const cartItems = currentCart?.items || [];
    const totalAmount = currentCart?.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;
    const shippingFee = totalAmount > 500000 ? 0 : 30000;
    const finalTotal = totalAmount + shippingFee;

    const steps = ['Thông tin giao hàng', 'Phương thức thanh toán', 'Xác nhận đơn hàng'];

    // Load user info khi component mount
    useEffect(() => {
        if (currentUser) {
            setShippingAddress(prev => ({
                ...prev,
                fullName: currentUser.fullName || '',
                phone: currentUser.phone || '',
                // Thêm các trường khác từ user nếu có
            }));
        }
    }, [currentUser]);

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleAddressChange = (field, value) => {
        setShippingAddress(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePlaceOrder = () => {
        // Xử lý đặt hàng - gọi API đặt hàng
        const orderData = {
            userId: currentUser._id,
            cartId: currentCart._id,
            items: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            totalAmount: totalAmount,
            shippingFee: shippingFee,
            finalTotal: finalTotal
        };
        
   
        // dispatch(createOrderApi(orderData));
        // navigate('/order-confirmation');
    };

    const renderShippingStep = () => (
        <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Thông tin giao hàng
            </Typography>
            
            {/* Địa chỉ mặc định nếu có */}
            {shippingAddress.fullName && (
                <Card sx={{ p: 3, mb: 3, border: '2px solid', borderColor: 'primary.main' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                {shippingAddress.fullName}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {shippingAddress.phone}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {shippingAddress.address}, {shippingAddress.ward}, {shippingAddress.district}, {shippingAddress.city}
                            </Typography>
                        </Box>
                        <IconButton color="primary">
                            <Edit />
                        </IconButton>
                    </Box>
                    <Chip 
                        icon={<LocationOn />} 
                        label="Địa chỉ giao hàng" 
                        color="primary" 
                        variant="outlined" 
                    />
                </Card>
            )}

            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4, mb: 2 }}>
                {shippingAddress.fullName ? 'Chỉnh sửa thông tin' : 'Thông tin người nhận'}
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Họ và tên"
                        value={shippingAddress.fullName}
                        onChange={(e) => handleAddressChange('fullName', e.target.value)}
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Số điện thoại"
                        value={shippingAddress.phone}
                        onChange={(e) => handleAddressChange('phone', e.target.value)}
                        variant="outlined"
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Địa chỉ"
                        value={shippingAddress.address}
                        onChange={(e) => handleAddressChange('address', e.target.value)}
                        variant="outlined"
                        multiline
                        rows={2}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth required>
                        <InputLabel>Tỉnh/Thành phố</InputLabel>
                        <Select 
                            value={shippingAddress.city} 
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                            label="Tỉnh/Thành phố"
                        >
                            <MenuItem value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</MenuItem>
                            <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                            <MenuItem value="Đà Nẵng">Đà Nẵng</MenuItem>
                            <MenuItem value="Cần Thơ">Cần Thơ</MenuItem>
                            <MenuItem value="Hải Phòng">Hải Phòng</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth required>
                        <InputLabel>Quận/Huyện</InputLabel>
                        <Select 
                            value={shippingAddress.district} 
                            onChange={(e) => handleAddressChange('district', e.target.value)}
                            label="Quận/Huyện"
                        >
                            <MenuItem value="Quận 1">Quận 1</MenuItem>
                            <MenuItem value="Quận Gò Vấp">Quận Gò Vấp</MenuItem>
                            <MenuItem value="Quận Tân Bình">Quận Tân Bình</MenuItem>
                            <MenuItem value="Quận Bình Thạnh">Quận Bình Thạnh</MenuItem>
                            <MenuItem value="Quận Phú Nhuận">Quận Phú Nhuận</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth required>
                        <InputLabel>Phường/Xã</InputLabel>
                        <Select 
                            value={shippingAddress.ward} 
                            onChange={(e) => handleAddressChange('ward', e.target.value)}
                            label="Phường/Xã"
                        >
                            <MenuItem value="Phường 1">Phường 1</MenuItem>
                            <MenuItem value="Phường 2">Phường 2</MenuItem>
                            <MenuItem value="Phường 3">Phường 3</MenuItem>
                            <MenuItem value="Phường 4">Phường 4</MenuItem>
                            <MenuItem value="Phường 5">Phường 5</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={saveShippingInfo} 
                                onChange={(e) => setSaveShippingInfo(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Lưu thông tin giao hàng cho lần mua tiếp theo"
                    />
                </Grid>
            </Grid>
        </Box>
    );

    const renderPaymentStep = () => (
        <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Phương thức thanh toán
            </Typography>

            <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    {/* Credit Card */}
                    <Card sx={{ p: 3, mb: 2, border: '2px solid', borderColor: paymentMethod === 'credit-card' ? 'primary.main' : 'transparent' }}>
                        <FormControlLabel
                            value="credit-card"
                            control={<Radio />}
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <CreditCard sx={{ mr: 2, color: 'primary.main' }} />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            Thẻ tín dụng/Ghi nợ
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Thanh toán an toàn với thẻ Visa, MasterCard
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <img src="/api/placeholder/40/25" alt="Visa" style={{ height: 25 }} />
                                        <img src="/api/placeholder/40/25" alt="MasterCard" style={{ height: 25 }} />
                                    </Box>
                                </Box>
                            }
                            sx={{ width: '100%', m: 0 }}
                        />
                        
                        {paymentMethod === 'credit-card' && (
                            <Box sx={{ mt: 3, pl: 4 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Số thẻ"
                                            placeholder="1234 5678 9012 3456"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            fullWidth
                                            label="Tên chủ thẻ"
                                            placeholder="NGUYEN VAN A"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            fullWidth
                                            label="MM/YY"
                                            placeholder="12/25"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            fullWidth
                                            label="CVV"
                                            placeholder="123"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Card>

                    {/* Bank Transfer */}
                    <Card sx={{ p: 3, mb: 2, border: '2px solid', borderColor: paymentMethod === 'bank-transfer' ? 'primary.main' : 'transparent' }}>
                        <FormControlLabel
                            value="bank-transfer"
                            control={<Radio />}
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AccountBalance sx={{ mr: 2, color: 'primary.main' }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            Chuyển khoản ngân hàng
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Chuyển khoản trực tiếp đến tài khoản ngân hàng của chúng tôi
                                        </Typography>
                                    </Box>
                                </Box>
                            }
                            sx={{ width: '100%', m: 0 }}
                        />
                    </Card>

                    {/* COD */}
                    <Card sx={{ p: 3, mb: 2, border: '2px solid', borderColor: paymentMethod === 'cod' ? 'primary.main' : 'transparent' }}>
                        <FormControlLabel
                            value="cod"
                            control={<Radio />}
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LocalShipping sx={{ mr: 2, color: 'primary.main' }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            Thanh toán khi nhận hàng (COD)
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Thanh toán bằng tiền mặt khi nhận được hàng
                                        </Typography>
                                    </Box>
                                </Box>
                            }
                            sx={{ width: '100%', m: 0 }}
                        />
                    </Card>

                    {/* E-wallet */}
                    <Card sx={{ p: 3, border: '2px solid', borderColor: paymentMethod === 'e-wallet' ? 'primary.main' : 'transparent' }}>
                        <FormControlLabel
                            value="e-wallet"
                            control={<Radio />}
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <QrCode sx={{ mr: 2, color: 'primary.main' }} />
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            Ví điện tử
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Momo, ZaloPay, VNPay
                                        </Typography>
                                    </Box>
                                </Box>
                            }
                            sx={{ width: '100%', m: 0 }}
                        />
                    </Card>
                </RadioGroup>
            </FormControl>

            <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                    Thông tin thẻ của bạn sẽ được bảo mật và mã hóa. Chúng tôi không lưu trữ thông tin thẻ của bạn.
                </Typography>
            </Alert>
        </Box>
    );

    const renderConfirmationStep = () => (
        <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Xác nhận đơn hàng
            </Typography>

            <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Địa chỉ giao hàng
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {shippingAddress.fullName} | {shippingAddress.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {shippingAddress.address}, {shippingAddress.ward}, {shippingAddress.district}, {shippingAddress.city}
                </Typography>
            </Card>

            <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Phương thức thanh toán
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {paymentMethod === 'credit-card' && <CreditCard sx={{ mr: 2, color: 'primary.main' }} />}
                    {paymentMethod === 'bank-transfer' && <AccountBalance sx={{ mr: 2, color: 'primary.main' }} />}
                    {paymentMethod === 'cod' && <LocalShipping sx={{ mr: 2, color: 'primary.main' }} />}
                    {paymentMethod === 'e-wallet' && <QrCode sx={{ mr: 2, color: 'primary.main' }} />}
                    <Typography variant="body1">
                        {paymentMethod === 'credit-card' && 'Thẻ tín dụng/Ghi nợ'}
                        {paymentMethod === 'bank-transfer' && 'Chuyển khoản ngân hàng'}
                        {paymentMethod === 'cod' && 'Thanh toán khi nhận hàng'}
                        {paymentMethod === 'e-wallet' && 'Ví điện tử'}
                    </Typography>
                </Box>
            </Card>

            <Card sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Sản phẩm đã đặt
                </Typography>
                {cartItems.map((item) => (
                    <Box key={item.productId} sx={{ display: 'flex', alignItems: 'center', py: 2, borderBottom: '1px solid', borderColor: 'grey.200' }}>
                        <img 
                            src={item.images} 
                            alt={item.name}
                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, marginRight: 16 }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body1" fontWeight="medium">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Số lượng: {item.quantity} × {item.price.toLocaleString('vi-VN')}₫
                            </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="bold" color="primary">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </Typography>
                    </Box>
                ))}
            </Card>

            <FormControlLabel
                control={
                    <Checkbox 
                        checked={agreeTerms} 
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        color="primary"
                    />
                }
                label={
                    <Typography variant="body2">
                        Tôi đồng ý với <span style={{ color: '#1976d2', cursor: 'pointer' }}>điều khoản và điều kiện</span> của LACU MART
                    </Typography>
                }
                sx={{ mt: 3 }}
            />
        </Box>
    );

    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return renderShippingStep();
            case 1:
                return renderPaymentStep();
            case 2:
                return renderConfirmationStep();
            default:
                return null;
        }
    };

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
        );
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

                            <Divider sx={{ mb: 4 }} />

                            {/* Step Content */}
                            {renderStepContent()}

                            {/* Navigation Buttons */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                <Button
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                    startIcon={<ArrowBack />}
                                    sx={{ borderRadius: 2 }}
                                >
                                    Quay lại
                                </Button>
                                
                                {activeStep === steps.length - 1 ? (
                                    <Button
                                        variant="contained"
                                        onClick={handlePlaceOrder}
                                        disabled={!agreeTerms}
                                        startIcon={<AssignmentTurnedIn />}
                                        sx={{ 
                                            borderRadius: 2,
                                            px: 4,
                                            py: 1,
                                            fontWeight: 'bold',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                        }}
                                    >
                                        Đặt Hàng
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
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
                        </Paper>
                    </Grid>

                    {/* Order Summary */}
                    <Grid item xs={12} lg={4}>
                        <Paper 
                            sx={{ 
                                p: 4, 
                                borderRadius: 3,
                                boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                                background: 'white',
                                position: { lg: 'fixed' },
                                top: 120,
                                right: { lg: 'calc((100vw - 1280px) / 2 + 16px)' },
                                width: { lg: '400px' },
                                maxHeight: { lg: 'calc(100vh - 200px)' },
                                overflow: 'auto'
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                                Tổng Đơn Hàng
                            </Typography>

                            {/* Order Items Preview */}
                            <Box sx={{ mb: 3 }}>
                                {cartItems.slice(0, 3).map((item) => (
                                    <Box key={item.productId} sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                                        <img 
                                            src={item.images} 
                                            alt={item.name}
                                            style={{ 
                                                width: 40, 
                                                height: 40, 
                                                objectFit: 'cover', 
                                                borderRadius: 4, 
                                                marginRight: 12 
                                            }}
                                        />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body2" fontWeight="medium" noWrap>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {item.quantity} × {item.price.toLocaleString('vi-VN')}₫
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                                {cartItems.length > 3 && (
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                                        +{cartItems.length - 3} sản phẩm khác
                                    </Typography>
                                )}
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Order Summary */}
                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        Tạm tính ({cartItems.length} sản phẩm)
                                    </Typography>
                                    <Typography variant="body1">
                                        {totalAmount.toLocaleString('vi-VN')}₫
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        Phí vận chuyển
                                    </Typography>
                                    <Typography variant="body1" color={shippingFee === 0 ? 'success.main' : 'text.primary'}>
                                        {shippingFee === 0 ? 'MIỄN PHÍ' : '30.000₫'}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        Giảm giá
                                    </Typography>
                                    <Typography variant="body1" color="success.main">
                                        -0₫
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    Tổng cộng
                                </Typography>
                                <Typography variant="h5" color="primary" fontWeight="bold">
                                    {finalTotal.toLocaleString('vi-VN')}₫
                                </Typography>
                            </Box>

                            {/* Security Badge */}
                            <Box sx={{ textAlign: 'center', pt: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                    <Security sx={{ fontSize: 16, color: 'success.main' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        Thanh toán an toàn & bảo mật
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Checkout;