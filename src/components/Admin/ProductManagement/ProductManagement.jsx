// src/components/Admin/ProductManagement/ProductManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Avatar,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
} from '@mui/icons-material';
import ProductForm from '../ProductForm/ProductForm';

import { useDispatch, useSelector } from 'react-redux'
import { 
  selectAllProducts, 
  fetchAllProductsAPI,
  selectProductLoading,
  selectProductError 
} from '~/redux/product/productSlice';

const ProductManagement = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts) // ← SỬA THÀNH products (số nhiều)
  const loading = useSelector(selectProductLoading)
  const error = useSelector(selectProductError)
  
  console.log('📦 Redux products:', products) // Kiểm tra dữ liệu

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProductsAPI())
  }, [dispatch])

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setOpenDialog(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteProduct = (productId) => {
    // TODO: Gọi API xóa sản phẩm
    console.log('Delete product:', productId)
    setDeleteConfirm(null);
  };

  const handleSaveProduct = (productData) => {
    // TODO: Gọi API thêm/sửa sản phẩm
    console.log('Save product:', productData)
    setOpenDialog(false);
  };

  const getStockStatusColor = (status) => {
    const colors = {
      in_stock: 'success',
      out_of_stock: 'error',
      low_stock: 'warning',
      discontinued: 'default'
    };
    return colors[status] || 'default';
  };

  const getStockStatusText = (status) => {
    const texts = {
      in_stock: 'Còn hàng',
      out_of_stock: 'Hết hàng',
      low_stock: 'Sắp hết',
      discontinued: 'Ngừng kinh doanh'
    };
    return texts[status] || status;
  };

  // Format price từ API
  const formatPrice = (priceObj) => {
    if (!priceObj) return '0₫'
    return `${priceObj.current?.toLocaleString() || '0'}₫`
  }

  // Format stock status từ API
  const getStockStatus = (stockObj) => {
    return stockObj?.status || 'in_stock'
  }

  // Format stock quantity từ API
  const getStockQuantity = (stockObj) => {
    return stockObj?.quantity || 0
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Lỗi khi tải dữ liệu: {error}
      </Alert>
    )
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Quản lý sản phẩm
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProduct}
          sx={{
            backgroundColor: '#ff5722',
            '&:hover': { backgroundColor: '#e65100' }
          }}
        >
          Thêm sản phẩm
        </Button>
      </Box>

      {/* Products Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Thương hiệu</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Tồn kho</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={product.images?.[0]?.url}
                        variant="rounded"
                        sx={{ width: 50, height: 50 }}
                      >
                        {product.name?.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {product.name || 'Chưa có tên'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {product.shortDescription || product.description || 'Không có mô tả'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {product.mainCategory || 'Chưa phân loại'}
                      </Typography>
                      {product.subCategory && (
                        <Typography variant="body2" color="textSecondary" fontSize="12px">
                          {product.subCategory}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.brand || 'Không có thương hiệu'}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight={700} color="#ff5722">
                        {formatPrice(product.price)}
                      </Typography>
                      {product.price?.discount > 0 && (
                        <Typography variant="body2" color="textSecondary" fontSize="12px" sx={{ textDecoration: 'line-through' }}>
                          {product.price.original?.toLocaleString()}₫
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {getStockQuantity(product.stock)} sản phẩm
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStockStatusText(getStockStatus(product.stock))}
                      color={getStockStatusColor(getStockStatus(product.stock))}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditProduct(product)}
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setDeleteConfirm(product._id)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    Không có sản phẩm nào
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Product Form Dialog */}
      <ProductForm
        open={openDialog}
        product={selectedProduct}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa sản phẩm này?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Hủy</Button>
          <Button
            onClick={() => handleDeleteProduct(deleteConfirm)}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;