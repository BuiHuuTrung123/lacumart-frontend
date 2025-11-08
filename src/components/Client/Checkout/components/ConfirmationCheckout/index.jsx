import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  IconButton
} from '@mui/material'
import { 
  Home, 
  ShoppingBag, 
  LocalShipping, 
  Payment, 
  CheckCircle,
  ArrowBack
} from '@mui/icons-material'
import { selectCurrentOrder } from '~/redux/order/orderSlice'

function ConfirmationCheckout() {
  const order = useSelector(selectCurrentOrder)
  const location = useLocation()
  const navigate = useNavigate()
  const { showBankInfo, orderCode, totalAmount } = location.state || {}

  const steps = ['Đặt hàng', 'Xác nhận', 'Hoàn thành']

  if (!order) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Không tìm thấy thông tin đơn hàng
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Home />}
            onClick={() => navigate('/home')}
            sx={{ mt: 2 }}
          >
            Về trang chủ
          </Button>
        </Box>
      </Container>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleBackToHome = () => {
    navigate('/home')
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header với stepper */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <IconButton 
          onClick={handleBackToHome}
          sx={{ mb: 2, alignSelf: 'flex-start' }}
        >
          <ArrowBack />
        </IconButton>
        
        <CheckCircle 
          sx={{ fontSize: 80, color: 'success.main', mb: 2 }} 
        />
        
        <Typography variant="h3" gutterBottom fontWeight="bold" color="success.main">
          Đặt Hàng Thành Công!
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
        </Typography>

        <Stepper activeStep={2} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Grid container spacing={4}>
        {/* Thông tin đơn hàng chi tiết */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="bold">
                Chi Tiết Đơn Hàng
              </Typography>
              <Chip 
                label={order.status === 'pending' ? 'ĐANG CHỜ XỬ LÝ' : order.status.toUpperCase()}
                color={order.status === 'pending' ? 'warning' : 'success'}
                variant="filled"
                sx={{ fontWeight: 'bold' }}
              />
            </Box>

            {/* Thông tin mã đơn hàng */}
            <Box sx={{ backgroundColor: '#f8f9fa', p: 3, borderRadius: 2, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    Mã đơn hàng
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {order.orderCode}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    Thời gian đặt hàng
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formatDate(order.createdAt?.$date || order.createdAt)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Danh sách sản phẩm */}
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
              Sản Phẩm Đã Đặt
            </Typography>

            {order.items?.map((item, index) => (
              <Card 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  mb: 2, 
                  p: 2, 
                  borderRadius: 2,
                  '&:last-child': { mb: 0 }
                }}
                variant="outlined"
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    objectFit: 'cover', 
                    borderRadius: 2,
                    mr: 2
                  }}
                  image={item.images}
                  alt={item.name}
                />
                <CardContent sx={{ flex: 1, py: 1, px: 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body1" fontWeight="medium" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Số lượng: {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight="bold" color="primary">
                      {formatCurrency(item.price * item.quantity)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Đơn giá: {formatCurrency(item.price)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>

        {/* Sidebar thông tin */}
        <Grid item xs={12} lg={4}>
          {/* Thông tin khách hàng */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
              <ShoppingBag sx={{ mr: 1 }} />
              Thông Tin Khách Hàng
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" fontWeight="medium" gutterBottom>
                {order.customerInfo?.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                📞 {order.customerInfo?.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                ✉️ {order.customerInfo?.email}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Địa chỉ giao hàng:
              </Typography>
              <Typography variant="body2">
                {order.customerInfo?.address?.street}
              </Typography>
              {order.customerInfo?.address?.note && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
                  Ghi chú: {order.customerInfo.address.note}
                </Typography>
              )}
            </Box>
          </Paper>

          {/* Tổng thanh toán */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
              <Payment sx={{ mr: 1 }} />
              Tổng Thanh Toán
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="body2">Tạm tính:</Typography>
                  <Typography variant="body2">{formatCurrency(order.subtotal)}</Typography>
                </Grid>
                <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography variant="body2">Phí vận chuyển:</Typography>
                  <Typography variant="body2">{formatCurrency(order.shippingFee)}</Typography>
                </Grid>
                {order.discount > 0 && (
                  <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2">Giảm giá:</Typography>
                    <Typography variant="body2" color="error">
                      -{formatCurrency(order.discount)}
                    </Typography>
                  </Grid>
                )}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Grid container justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                  Tổng cộng:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {formatCurrency(order.total)}
                </Typography>
              </Grid>
            </Box>
          </Paper>

          {/* Phương thức thanh toán */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalShipping sx={{ mr: 1 }} />
              Phương Thức Thanh Toán
            </Typography>
            <Chip 
              label={order.customerInfo?.paymentMethod === 'cod' 
                ? 'Thanh toán khi nhận hàng (COD)' 
                : 'Chuyển khoản ngân hàng'}
              color={order.customerInfo?.paymentMethod === 'cod' ? 'default' : 'primary'}
              variant="filled"
              sx={{ mt: 1, fontWeight: 'bold' }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Thông tin chuyển khoản ngân hàng */}
      {showBankInfo && (
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            mt: 4, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
            border: '2px solid #ffd43b'
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold" color="#856404" sx={{ display: 'flex', alignItems: 'center' }}>
            <Payment sx={{ mr: 1 }} />
            Thông Tin Chuyển Khoản
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" fontWeight="medium" color="#856404">
                  Số tài khoản:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#495057">
                  2111666165
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" fontWeight="medium" color="#856404">
                  Ngân hàng:
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="#495057">
                  BIDV (Ngân hàng Đầu tư và Phát triển Việt Nam)
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" fontWeight="medium" color="#856404">
                  Chủ tài khoản:
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="#495057">
                  BÙI HỮU TRUNG
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" fontWeight="medium" color="#856404">
                  Nội dung chuyển khoản:
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="primary" sx={{ fontFamily: 'monospace' }}>
                  {orderCode}_{order.customerInfo?.phone}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ 
                backgroundColor: 'white', 
                p: 2, 
                borderRadius: 2,
                border: '1px dashed #ffc107'
              }}>
                <Typography variant="body2" fontWeight="medium" color="#856404">
                  Số tiền cần chuyển:
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="error" sx={{ mt: 1 }}>
                  {formatCurrency(totalAmount || order.total)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Typography variant="body2" sx={{ mt: 3, fontStyle: 'italic', color: '#856404' }}>
            💡 Lưu ý: Vui lòng chuyển khoản đúng số tiền và nội dung như trên để đơn hàng được xử lý nhanh chóng.
          </Typography>
        </Paper>
      )}

      {/* Nút hành động */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Home />}
          onClick={handleBackToHome}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          Tiếp Tục Mua Sắm
        </Button>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Mọi thắc mắc xin liên hệ hotline: 0353868428
        </Typography>
      </Box>
    </Container>
  )
}

export default ConfirmationCheckout