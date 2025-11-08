// src/components/Admin/CategoryManagement/components/CategoryForm/CategoryForm.jsx
import React, { useState } from 'react'
import { Dialog, DialogContent } from '@mui/material'

import { useCategoryForm } from '~/hooks/category/useCategoryForm'
import { useCategoryImageHandling } from '~/hooks/category/useCategoryImageHandling'

import CategoryFormHeader from '~/components/Admin/CategoryManagement/components/CategoryForm/components/CategoryFormHeader'
import ImageUploadSection from '~/components/Admin/CategoryManagement/components/CategoryForm/components/ImageUploadSection'
import BasicInfoSection from '~/components/Admin/CategoryManagement/components/CategoryForm/components/BasicInfoSection'
import FormActions from '~/components/Admin/CategoryManagement/components/CategoryForm/components/FormActions'
import DeleteConfirmation from '~/components/Admin/CategoryManagement/components/CategoryForm/components/DeleteConfirmation'

const CategoryForm = ({ open, category, onClose, onSave, mode = 'create' }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  
  const isEditMode = mode === 'edit'
  const formTitle = isEditMode ? 'CẬP NHẬT DANH MỤC' : 'THÊM DANH MỤC MỚI'

  // Use custom hooks
  const {
    imageFile,
    imagePreview,
    imageErrors,
    handleImageUpload,
    handleRemoveImage,
    hasImage
  } = useCategoryImageHandling(category)

  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    onError,
    methods
  } = useCategoryForm(category, onClose, onSave, imageFile)

  // Delete handlers
  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = async () => {
    setDeleteConfirmOpen(false)
    onClose()
  }

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false)
  }

  const canSubmit = !isSubmitting && (isEditMode ? true : imageFile)

  return (
    <>
      {/* Category Form Dialog */}
      <Dialog 
        open={open} 
        onClose={isSubmitting ? undefined : onClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{ 
          sx: { 
            borderRadius: 3, 
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
            maxHeight: '90vh', 
            overflow: 'auto' 
          } 
        }}
      >
        <CategoryFormHeader 
          formTitle={formTitle} 
          isEditMode={isEditMode} 
        />

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogContent sx={{ p: 4 }}>
            <ImageUploadSection
              imagePreview={imagePreview}
              imageErrors={imageErrors}
              isEditMode={isEditMode}
              hasImage={hasImage}
              onImageUpload={handleImageUpload}
              onRemoveImage={handleRemoveImage}
            />

            <BasicInfoSection
              control={control}
              errors={errors}
            />
          </DialogContent>

          <FormActions
            isEditMode={isEditMode}
            isSubmitting={isSubmitting}
            canSubmit={canSubmit}
            submitButtonText={isSubmitting ? 'ĐANG XỬ LÝ...' : (isEditMode ? 'CẬP NHẬT' : 'THÊM MỚI')}
            onDeleteClick={handleDeleteClick}
            onClose={onClose}
          />
        </form>
      </Dialog>

      {/* Delete Confirmation */}
      <DeleteConfirmation
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}

export default CategoryForm