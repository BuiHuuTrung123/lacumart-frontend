import React from 'react'
import {
  Grid,
  Box,
  Typography,
  Button,
  Chip,
  Rating,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  ListItemIcon
} from '@mui/material'
import {
  ShoppingCart,
  FlashOn,
  LocalShipping,
  AssignmentReturn,
  Security
} from '@mui/icons-material'

const ProductInfoSection = ({ product, onAddToCart, onBuyNow }) => {
  return (
    <Grid item xs={12} md={6}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#1a202c' }}>
          {product.name}
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Rating value={4.5} precision={0.5} readOnly sx={{ color: '#ffc107' }} />
          <Typography variant="body2" color="text.secondary">
            (124 đánh giá)
          </Typography>
          <Typography variant="body2" color="success.main" sx={{ fontWeight: 'bold' }}>
            ● 528 đã bán
          </Typography>
        </Box>
      </Box>

      {/* Price */}
      <Box sx={{ mb: 3, p: 3, backgroundColor: '#fff5f5', borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Typography variant="h2" fontWeight="bold" sx={{ color: '#ff5722' }}>
            {product.price?.current?.toLocaleString()}₫
          </Typography>
          {product.price?.original !== product.price?.current && (
            <Typography variant="h5" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              {product.price?.original?.toLocaleString()}₫
            </Typography>
          )}
        </Box>
        {product.price?.discount > 0 && (
          <Chip
            label={`Tiết kiệm ${(product.price.original - product.price.current).toLocaleString()}₫`}
            color="success"
            variant="outlined"
          />
        )}
      </Box>

      {/* Product Details */}
      <Box sx={{ mb: 3 }}>
        <List dense>
          <ListItem>
            <ListItemText
              primary="Định lượng"
              secondary={product.quantification}
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Thương hiệu"
              secondary={product.brand}
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Danh mục"
              secondary={product.mainCategory}
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
          </ListItem>
          <ListItem>
           <ListItemText
    primary="Tình trạng"
    primaryTypographyProps={{ 
      fontWeight: 'bold',
      component: "div" // ← THÊM DÒNG NÀY
    }}
    secondaryTypographyProps={{ 
      component: "div" // ← THÊM DÒNG NÀY
    }}
    secondary={
      <Chip
        label={product.stock?.quantity > 0 ? 'CÒN HÀNG' : 'HẾT HÀNG'}
        color={product.stock?.quantity > 0 ? 'success' : 'error'}
        size="small"
      />
    }
  />
          </ListItem>
        </List>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={onAddToCart}
              sx={{
                backgroundColor: '#ff5722',
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#e65100',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Thêm vào giỏ
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<FlashOn />}
              onClick={onBuyNow}
              sx={{
                borderColor: '#ff5722',
                color: '#ff5722',
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#fff5f5',
                  borderColor: '#e65100',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Mua ngay
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Service Features */}
      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalShipping sx={{ color: '#ff5722' }} />
              </ListItemIcon>
              <ListItemText
                primary="Miễn phí vận chuyển"
                secondary="Cho đơn hàng từ 500.000₫"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AssignmentReturn sx={{ color: '#ff5722' }} />
              </ListItemIcon>
              <ListItemText
                primary="Đổi trả trong 7 ngày"
                secondary="Hoàn tiền 100%"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Security sx={{ color: '#ff5722' }} />
              </ListItemIcon>
              <ListItemText
                primary="Bảo hành chính hãng"
                secondary="12 tháng"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ProductInfoSection