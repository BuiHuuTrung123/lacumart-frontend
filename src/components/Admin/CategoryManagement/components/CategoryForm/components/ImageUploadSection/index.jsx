// src/components/Admin/CategoryManagement/components/CategoryForm/ImageUploadSection.jsx
import React from 'react'
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Alert,
  Card,
  CardMedia,
  Chip
} from '@mui/material'
import {
  CloudUpload,
  Delete,
  AddPhotoAlternate
} from '@mui/icons-material'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'

const ImageUploadSection = ({
  imagePreview,
  imageErrors,
  isEditMode,
  hasImage,
  onImageUpload,
  onRemoveImage
}) => {
  const getImageStatus = () => {
    if (imagePreview?.isExisting === false) return 'Ảnh mới'
    if (imagePreview?.isExisting === true) return 'Ảnh hiện tại'
    return 'Chưa có ảnh'
  }

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <AddPhotoAlternate sx={{ color: '#1976d2', fontSize: 28 }} />
          <Typography variant="h5" fontWeight={700}>
            HÌNH ẢNH DANH MỤC {!isEditMode && '*'}
          </Typography>
        </Box>

        {imageErrors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {imageErrors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        )}

        {!isEditMode && !hasImage && (
          <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
            ⚠️ <strong>Ảnh là bắt buộc</strong> - Vui lòng chọn ảnh cho danh mục mới
          </Alert>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUpload />}
            sx={{
              borderRadius: 2, 
              fontWeight: 600, 
              borderColor: '#1976d2', 
              color: '#1976d2',
              '&:hover': { 
                backgroundColor: 'rgba(25, 118, 210, 0.1)', 
                borderColor: '#1565c0' 
              }
            }}
          >
            {hasImage ? 'THAY ĐỔI ẢNH' : 'TẢI ẢNH LÊN'}
            <VisuallyHiddenInput
              type="file"
              multiple={false}
              accept="image/jpg, image/jpeg, image/png"
              onChange={onImageUpload}
            />
          </Button>
          
          {hasImage && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={onRemoveImage}
              sx={{
                borderRadius: 2, 
                fontWeight: 600,
              }}
            >
              XÓA ẢNH
            </Button>
          )}
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 2 }}>
          Chấp nhận: JPG, JPEG, PNG (tối đa 10MB) - Chỉ 1 ảnh duy nhất
          {isEditMode && " - Để trống nếu muốn giữ ảnh hiện tại"}
        </Typography>

        {hasImage && (
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Card sx={{
              position: 'relative',
              border: imagePreview?.isExisting === false ? '2px solid #1976d2' : '2px solid #666',
              borderRadius: 2,
              overflow: 'hidden',
              maxWidth: 200
            }}>
              <CardMedia
                component="img"
                height="160"
                image={imagePreview.url}
                alt={imagePreview.alt}
                sx={{ objectFit: 'cover' }}
              />
              <Chip
                label={getImageStatus()}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  backgroundColor: imagePreview?.isExisting === false ? '#1976d2' : '#666',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '10px'
                }}
              />
            </Card>
          </Box>
        )}
      </Paper>
    </Grid>
  )
}

export default ImageUploadSection