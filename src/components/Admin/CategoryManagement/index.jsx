// src/components/Admin/CategoryManagement/CategoryManagement.jsx
import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, Alert } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import {
  selectAllCategories,
  fetchAllCategoriesAPI,
  selectCategoryLoading,
  selectCategoryError,
  deleteCategoryApi
} from '~/redux/category/categorySlice'

import CategoryManagementHeader from '~/components/Admin/CategoryManagement/components/CategoryManagementHeader'
import CategoriesTable from '~/components/Admin/CategoryManagement/components/CategoriesTable'
import CategoryForm from '~/components/Admin/CategoryManagement/components/CategoryForm'
import StatsSummary from '~/components/Admin/CategoryManagement/components/StatsSummary'

const CategoryManagement = () => {
  const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories)
  const loading = useSelector(selectCategoryLoading)
  const error = useSelector(selectCategoryError)

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [dialogMode, setDialogMode] = useState('create') // 'create' | 'edit'

  useEffect(() => {
    dispatch(fetchAllCategoriesAPI())
  }, [dispatch])

  const handleAddCategory = () => {
    setSelectedCategory(null)
    setDialogMode('create')
    setOpenDialog(true)
  }

  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setDialogMode('edit')
    setOpenDialog(true)
  }

  const handleDeleteCategory = (categoryId) => {
    dispatch(deleteCategoryApi(categoryId))
  }

  const handleSaveCategory = (categoryData) => {
    // Refresh data after save
    dispatch(fetchAllCategoriesAPI())
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
      <CategoryManagementHeader onAddCategory={handleAddCategory} />

      <CategoriesTable
        categories={categories}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      <CategoryForm
        open={openDialog}
        category={selectedCategory}
        mode={dialogMode}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveCategory}
      />

      <StatsSummary categories={categories} />
    </Box>
  )
}

export default CategoryManagement