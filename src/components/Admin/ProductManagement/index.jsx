// src/components/Admin/ProductManagement/ProductManagement.jsx
import React, { useState, useEffect } from 'react'
import { Box, Paper, Typography, Button, Alert, CircularProgress } from '@mui/material'
import { Add } from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux'
import { 
  selectAllProducts, 
  fetchAllProductsAPI,
  selectProductLoading,
  selectProductError,
  deleteProductApi 
} from '~/redux/product/productSlice'

import ProductTable from './components/ProductTable'
import ProductForm from './components/ProductForm'
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog'
import TableHeader from './components/TableHeader'

const ProductManagement = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const loading = useSelector(selectProductLoading)
  const error = useSelector(selectProductError)

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    dispatch(fetchAllProductsAPI())
  }, [dispatch])

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setOpenDialog(true)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setOpenDialog(true)
  }

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProductApi(productId))
    setDeleteConfirm(null)
  }

  const handleSaveProduct = (productData) => {
    setOpenDialog(false)
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
      <TableHeader onAddProduct={handleAddProduct} />
      
      <ProductTable 
        products={products}
        onEditProduct={handleEditProduct}
        onDeleteProduct={setDeleteConfirm}
      />

      <ProductForm
        open={openDialog}
        product={selectedProduct}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveProduct}
      />

      <DeleteConfirmationDialog 
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => handleDeleteProduct(deleteConfirm)}
      />
    </Box>
  )
}

export default ProductManagement