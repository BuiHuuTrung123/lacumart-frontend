import React from 'react'
import {
  Box, Typography, Button, Grid, Card, CardMedia, Chip,
  IconButton, Tooltip, Alert, Paper
} from '@mui/material'
import { CloudUpload, Delete, AddPhotoAlternate } from '@mui/icons-material'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import { VALIDATION_MESSAGES } from '~/constants/productForm'

const ImageSection = ({ 
  imagePreview,        
  imageErrors = [],
  handleImageUpload, 
  handleRemoveImage 
}) => {
  const hasImage = !!imagePreview;
  const errors = imageErrors || [];

  // Sửa lại hàm xử lý file
  const handleFileChange = (event) => {
    const files = event.target.files;
  

    
    if (files && files.length > 0) {
      const file = files[0]; // Chỉ lấy file đầu tiên
     
      
      
      if (file && handleImageUpload) {
        handleImageUpload(file);
      }
    } else {
      console.error('❌ No files selected');
    }
    
    // Reset input
    event.target.value = '';
  };

 
  return (
    <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <AddPhotoAlternate sx={{ color: '#ff5722', fontSize: 28 }} />
        <Typography variant="h5" fontWeight={700}>HÌNH ẢNH SẢN PHẨM</Typography>
      </Box>

      {errors?.length > 0 && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUpload />}
          disabled={hasImage}
          sx={{
            borderRadius: 2, 
            fontWeight: 600, 
            borderColor: '#ff5722', 
            color: '#ff5722',
            '&:hover': { 
              backgroundColor: 'rgba(255, 87, 34, 0.1)', 
              borderColor: '#e65100' 
            },
            '&:disabled': { 
              borderColor: '#ccc', 
              color: '#ccc' 
            }
          }}
        >
          TẢI ẢNH LÊN
          <VisuallyHiddenInput
            type="file"
            multiple={false} // Đảm bảo là false
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleFileChange}
          />
        </Button>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Chấp nhận: JPG, JPEG, PNG (tối đa 10MB) - Chỉ 1 ảnh duy nhất
        </Typography>
      </Box>

      {hasImage ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{
            position: 'relative',
            border: '2px solid #ff5722',
            borderRadius: 2,
            overflow: 'hidden',
            maxWidth: 300,
            width: '100%'
          }}>
            <CardMedia
              component="img"
              height="200"
              image={typeof imagePreview === 'string' ? imagePreview : imagePreview?.url}
              alt={typeof imagePreview === 'string' ? 'Product image' : imagePreview?.alt || 'Product image'}
              sx={{ 
                objectFit: 'cover',
                width: '100%',
                height: '200px'
              }}
              onLoad={() => console.log('✅ Image loaded successfully')}
              onError={(e) => {
                console.error('❌ Image load error:', {
                  imagePreview,
                  url: typeof imagePreview === 'string' ? imagePreview : imagePreview?.url,
                  element: e.target
                });
              }}
            />
            <Chip
              label="Ảnh chính"
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: '#ff5722',
                color: 'white',
                fontWeight: 600,
                fontSize: '10px'
              }}
            />
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
              <Tooltip title="Xóa ảnh">
                <IconButton
                  size="small"
                  onClick={handleRemoveImage}
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    '&:hover': { 
                      backgroundColor: 'white', 
                      color: '#e53935' 
                    }
                  }}
                >
                  <Delete sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        </Box>
      ) : (
        <Alert severity="warning" sx={{ borderRadius: 2 }}>
          Chưa có ảnh sản phẩm. Vui lòng tải ảnh lên.
        </Alert>
      )}
    </Paper>
  );
};

export default ImageSection;