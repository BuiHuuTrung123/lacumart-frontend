import React, { useEffect, useState } from 'react'
import Hearder from '~/components/Client/Hearder/Hearder'
import Footer from '~/components/Client/Footer/Footer'
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Chip, 
  Rating, 
  Divider,
  IconButton,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  ShoppingCart, 
  Favorite, 
  Share, 
  FlashOn,
  LocalShipping,
  AssignmentReturn,
  Security,
  Star,
  ArrowBack 
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentProduct,
  fetchProductByIdAPI
} from '~/redux/product/productSlice';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectCurrentProduct);
  const [selectedImage, setSelectedImage] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAPI(id));
    }
  }, [id, dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddToCart = () => {
    // Xử lý thêm vào giỏ hàng
    console.log('Thêm vào giỏ hàng:', product);
  };

  const handleBuyNow = () => {
    // Xử lý mua ngay
    console.log('Mua ngay:', product);
  };

  if (!product) {
    return (
      <Box>
        <Hearder />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Typography variant="h5">Đang tải sản phẩm...</Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  // Mock images array - trong thực tế có thể lấy từ product.images
  const productImages = [
    product.images,
    product.images,
    product.images,
    product.images
  ];

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Hearder />
      
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link 
            color="inherit" 
            href="/" 
            sx={{ cursor: 'pointer', '&:hover': { color: '#ff5722' } }}
          >
            Trang chủ
          </Link>
          <Link 
            color="inherit" 
            sx={{ cursor: 'pointer', '&:hover': { color: '#ff5722' } }}
          >
            {product.mainCategory}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={productImages[selectedImage]}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: 'fit-content',
                    objectFit: 'cover',
                    backgroundColor: '#f5f5f5'
                  }}
                />
                {/* Badges */}
                <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                  {product.stock?.status === 'low_stock' && (
                    <Chip 
                      label="SẮP HẾT HÀNG" 
                      color="warning"
                      sx={{ fontWeight: 'bold', mr: 1 }}
                    />
                  )}
                  {product.price?.discount > 0 && (
                    <Chip 
                      label={`-${product.price.discount}%`} 
                      color="error"
                      sx={{ fontWeight: 'bold' }}
                    />
                  )}
                </Box>
              </Box>

              {/* Thumbnail Images */}
              <Box sx={{ p: 2, display: 'flex', gap: 1, overflowX: 'auto' }}>
                {productImages.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 120,
                      height:120,
                      objectFit: 'cover',
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: selectedImage === index ? '2px solid #ff5722' : '2px solid transparent',
                      opacity: selectedImage === index ? 1 : 0.7,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        opacity: 1,
                        borderColor: '#ff5722'
                      }
                    }}
                  />
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Product Info */}
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
                    secondary={
                      <Chip 
                        label={product.stock?.quantity > 0 ? 'CÒN HÀNG' : 'HẾT HÀNG'} 
                        color={product.stock?.quantity > 0 ? 'success' : 'error'}
                        size="small"
                      />
                    }
                    primaryTypographyProps={{ fontWeight: 'bold' }}
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
                    onClick={handleAddToCart}
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
                    onClick={handleBuyNow}
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
        </Grid>

        {/* Product Description & Details */}
        <Box sx={{ mt: 6 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }
              }}
            >
              <Tab label="Mô tả sản phẩm" />
              <Tab label="Thông số kỹ thuật" />
              <Tab label="Đánh giá (124)" />
            </Tabs>

            <Box sx={{ p: 4 }}>
              {tabValue === 0 && (
                <Box>
                  <Typography variant="h5" gutterBottom sx={{ color: '#1a202c', mb: 3 }}>
                    Chi tiết sản phẩm
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                    {product.description}
                  </Typography>
                  
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      🎯 Đặc điểm nổi bật:
                    </Typography>
                    <List>
                      <ListItem>
                        <Star sx={{ color: '#ff5722', mr: 2, fontSize: '1.2rem' }} />
                        <ListItemText primary="Chất lượng cao cấp, đảm bảo an toàn" />
                      </ListItem>
                      <ListItem>
                        <Star sx={{ color: '#ff5722', mr: 2, fontSize: '1.2rem' }} />
                        <ListItemText primary="Hiệu quả vượt trội, kết quả nhanh chóng" />
                      </ListItem>
                      <ListItem>
                        <Star sx={{ color: '#ff5722', mr: 2, fontSize: '1.2rem' }} />
                        <ListItemText primary="Được ưa chuộng và tin dùng" />
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              )}
              
              {tabValue === 1 && (
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Thông số kỹ thuật
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Tên sản phẩm" secondary={product.name} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Thương hiệu" secondary={product.brand} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Định lượng" secondary={product.quantification} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Danh mục" secondary={product.mainCategory} />
                    </ListItem>
                  </List>
                </Box>
              )}
              
              {tabValue === 2 && (
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Đánh giá từ khách hàng
                  </Typography>
                  <Typography color="text.secondary">
                    Tính năng đánh giá đang được phát triển...
                  </Typography>
                </Box>
              )}
            </Box>
          </Card>
        </Box>
      </Container>

      <Footer />
    </Box>
  )
}

export default ProductDetail