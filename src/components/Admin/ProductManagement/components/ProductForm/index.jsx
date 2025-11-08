import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Box,
  Typography
} from '@mui/material'
import { FitnessCenter } from '@mui/icons-material'

// Custom hooks
import { useProductForm } from '../../../../../hooks/product/useProductForm'
import { useImageHandling } from '../../../../../hooks/product/useImageHandling'

// Components
import ImageSection from './components/ImageSection'
import BasicInfoSection from './components/BasicInfoSection'
import CategorySection from './components/CategorySection'
import PriceStockSection from './components/PriceStockSection'
import FormActions from './components/FormActions'

const ProductForm = ({ open, product, onClose, onSave }) => {

  const {
    imagePreview,
    imageErrors = [],
    handleImageUpload,
    handleRemoveImage,
    hasImages,
    imageFile // 🎯 Khai báo imageFile trước
  } = useImageHandling(product)

  // 🎯 SỬA: useProductForm sử dụng imageFile đã khai báo
  const {
    control,
    handleSubmit,
    errors,
    watch,
    setValue,
    isSubmitting,
    watchPriceOriginal,
    watchPriceCurrent,
    watchMainCategory,
    watchStockQuantity,
    onSubmit,
    onError
  } = useProductForm(product, onClose, onSave, imageFile) // 🎯 imageFile đã có


  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      maxWidth="lg"
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
      <DialogTitle sx={{
        background: 'linear-gradient(135deg, #ff5722, #ff8c42)',
        color: 'white',
        textAlign: 'center',
        py: 3
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}>
          <FitnessCenter sx={{ fontSize: 32 }} />
          <Typography variant="h4" fontWeight={800}>
            {product ? 'CẬP NHẬT SẢN PHẨM' : 'THÊM SẢN PHẨM MỚI'}
          </Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <DialogContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Image Section */}
            <Grid item xs={12}>
              <ImageSection
                imagePreview={imagePreview}
                imageErrors={imageErrors}
                handleImageUpload={handleImageUpload}
                handleRemoveImage={handleRemoveImage}
              />
            </Grid>

            {/* Basic Information */}
            <Grid item xs={12}>
              <BasicInfoSection
                control={control}
                errors={errors}
              />
            </Grid>

            {/* Category & Brand */}
            <Grid item xs={12}>
              <CategorySection
                control={control}
                errors={errors}
                watchMainCategory={watchMainCategory}
                setValue={setValue}
              />
            </Grid>

            {/* Price & Stock */}
            <Grid item xs={12}>
              <PriceStockSection
                control={control}
                errors={errors}
                watchPriceOriginal={watchPriceOriginal}
                watchPriceCurrent={watchPriceCurrent}
                watchStockQuantity={watchStockQuantity}
              />
            </Grid>
          </Grid>
        </DialogContent>

        {/* Form Actions */}
        <FormActions
          onClose={onClose}
          isSubmitting={isSubmitting}
          hasImages={hasImages}
          isEdit={!!product}
        />
      </form>
    </Dialog>
  )
}

export default ProductForm