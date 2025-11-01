// src/components/Admin/CategoryManagement/CategoryManagement.jsx
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
  Category,
} from '@mui/icons-material';
import CategoryForm from '~/components/Admin/CategoryManagement/CategoryForm/CategoryForm'

import { useDispatch, useSelector } from 'react-redux'
import { 
  selectAllCategories, 
  fetchAllCategoriesAPI,
  selectCategoryLoading,
  selectCategoryError,
  deleteCategoryApi 
} from '~/redux/category/categorySlice';

const CategoryManagement = () => {
  const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories)
  const loading = useSelector(selectCategoryLoading)
  const error = useSelector(selectCategoryError)
  
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCategoriesAPI())
  }, [dispatch])

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setOpenDialog(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategoryApi(categoryId))
    setDeleteConfirm(null);
  };

  const handleSaveCategory = (categoryData) => {
    setOpenDialog(false);
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'success' : 'default';
  };

  const getStatusText = (isActive) => {
    return isActive ? 'Đang hoạt động' : 'Ngừng hoạt động';
  };

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
          Quản lý danh mục
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddCategory}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' }
          }}
        >
          Thêm danh mục
        </Button>
      </Box>

      {/* Categories Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Danh mục</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Thứ tự hiển thị</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category._id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={category.image}
                        variant="rounded"
                        sx={{ width: 50, height: 50, bgcolor: '#1976d2' }}
                      >
                        <Category />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {category.name || 'Chưa có tên'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Slug: {category.slug}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {category.description || 'Không có mô tả'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {category.displayOrder || 0}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(category.isActive)}
                      color={getStatusColor(category.isActive)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditCategory(category)}
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setDeleteConfirm(category._id)}
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
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    Không có danh mục nào
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Category Form Dialog */}
      <CategoryForm
        open={openDialog}
        category={selectedCategory}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveCategory}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa danh mục này?</Typography>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Lưu ý: Không thể xóa nếu danh mục đang có sản phẩm
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Hủy</Button>
          <Button
            onClick={() => handleDeleteCategory(deleteConfirm)}
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

export default CategoryManagement;