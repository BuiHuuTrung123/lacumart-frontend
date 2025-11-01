// src/components/Admin/CategoryForm/CategoryForm.jsx
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid,
  FormControl, InputLabel, Select, MenuItem, Box, Typography, Paper, Switch,
  FormControlLabel, Card, CardMedia, Alert, CircularProgress,InputAdornment, Chip, IconButton

// src/components/Admin/CategoryForm/CategoryForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid,
  FormControl, InputLabel, Select, MenuItem, Box, Typography, Paper, Switch,
  FormControlLabel, Card, CardMedia, Alert, CircularProgress,InputAdornment, Chip, IconButton
} from '@mui/material';
import {
  Category, Description, CloudUpload, Delete, AddPhotoAlternate,
  Sort, Visibility, VisibilityOff
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput';
import FieldErrorAlert from '~/components/Form/FieldErrorAlert';
import { createNewCategoryAPI } from '~/redux/category/categorySlice';
import { useDispatch } from 'react-redux'
import { singleFileValidator } from '~/utils/validators'

const FIELD_REQUIRED_MESSAGE = 'Trường này là bắt buộc';
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 500;

const VALIDATION_MESSAGES = {
  NAME_REQUIRED: FIELD_REQUIRED_MESSAGE,
  NAME_MIN: `Tên danh mục phải có ít nhất ${MIN_NAME_LENGTH} ký tự`,
  NAME_MAX: `Tên danh mục không được vượt quá ${MAX_NAME_LENGTH} ký tự`,
  DESCRIPTION_MAX: `Mô tả không được vượt quá ${MAX_DESCRIPTION_LENGTH} ký tự`,
  IMAGE_TYPE: 'Chỉ chấp nhận file ảnh (jpg, jpeg, png)',
  IMAGE_SIZE: 'Kích thước file không được vượt quá 10MB'
};

const defaultValues = {
  name: '',
  description: '',
  displayOrder: 0,
  isActive: true,
  image: null
};

const CategoryForm = ({ open, onClose, onSave }) => {
  const dispatch = useDispatch();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageErrors, setImageErrors] = useState([]);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: defaultValues
  });

  // Reset form
  useEffect(() => {
    if (open) {
      reset(defaultValues);
      setImagePreviews([]);
      setImageErrors([]);
    }
  }, [open, reset]);

  // Image handlers
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newErrors = [];

    // Chỉ cho phép 1 ảnh
    if (imagePreviews.length >= 1) {
      toast.error('Chỉ được upload tối đa 1 ảnh');
      event.target.value = '';
      return;
    }

    files.forEach((file) => {
      const fileError = singleFileValidator(file);
      if (fileError) {
        newErrors.push(`File ${file.name}: ${fileError}`);
      } else {
        const newImagePreview = {
          url: URL.createObjectURL(file),
          alt: `Category Image ${Date.now()}`,
          isPrimary: true,
          file: file
        };
        setImagePreviews([newImagePreview]);
      }
    });

    if (newErrors.length > 0) {
      setImageErrors(newErrors);
      toast.error('Có lỗi xảy ra khi upload ảnh');
    } else {
      setImageErrors([]);
    }

    event.target.value = '';
  };

  const handleRemoveImage = () => {
    if (imagePreviews[0]?.url) {
      URL.revokeObjectURL(imagePreviews[0].url);
    }
    setImagePreviews([]);
  };

  // Submit handler
  const submitCategory = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Validate ảnh - BẮT BUỘC CÓ ẢNH KHI TẠO MỚI
      const primaryImage = imagePreviews[0];
      if (!primaryImage || !primaryImage.file) {
        toast.error('Vui lòng chọn ảnh cho danh mục');
        setIsSubmitting(false);
        return;
      }

      formData.append('image', primaryImage.file);

      // Tạo object data theo đúng model
      const categoryData = {
        name: data.name,
        description: data.description || '',
        displayOrder: parseInt(data.displayOrder) || 0,
        isActive: Boolean(data.isActive)
      };

      formData.append('data', JSON.stringify(categoryData));

      // Gọi API create
      dispatch(createNewCategoryAPI(formData));
      toast.success('Thêm danh mục mới thành công! 🎉');

      await onSave(categoryData);
      onClose();
    } catch (error) {
      toast.error('Lỗi khi thêm danh mục. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors) => {
    toast.error('Vui lòng kiểm tra lại thông tin form');
  };

  return (
    <Dialog open={open} onClose={isSubmitting ? undefined : onClose} maxWidth="md" fullWidth
      PaperProps={{ sx: { borderRadius: 3, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', maxHeight: '90vh', overflow: 'auto' } }}>

      <DialogTitle sx={{ background: 'linear-gradient(135deg, #1976d2, #42a5f5)', color: 'white', textAlign: 'center', py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Category sx={{ fontSize: 32 }} />
          <Typography variant="h4" fontWeight={800}>
            THÊM DANH MỤC MỚI
          </Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(submitCategory, onError)}>
        <DialogContent sx={{ p: 4 }}>
          <Grid container spacing={4}>

            {/* Image Section - BẮT BUỘC */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <AddPhotoAlternate sx={{ color: '#1976d2', fontSize: 28 }} />
                  <Typography variant="h5" fontWeight={700}>HÌNH ẢNH DANH MỤC *</Typography>
                </Box>

                {imageErrors.length > 0 && (
                  <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                    {imageErrors.map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </Alert>
                )}

                <Box sx={{ mb: 3 }}>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    disabled={imagePreviews.length >= 1}
                    sx={{
                      borderRadius: 2, fontWeight: 600, borderColor: '#1976d2', color: '#1976d2',
                      '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)', borderColor: '#1565c0' },
                      '&:disabled': { borderColor: '#ccc', color: '#ccc' }
                    }}
                  >
                    TẢI ẢNH LÊN
                    <VisuallyHiddenInput
                      type="file"
                      multiple={false}
                      accept="image/jpg, image/jpeg, image/png"
                      onChange={handleImageUpload}
                    />
                  </Button>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Chấp nhận: JPG, JPEG, PNG (tối đa 10MB) - Chỉ 1 ảnh duy nhất
                  </Typography>
                </Box>

                {imagePreviews && imagePreviews.length > 0 ? (
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {imagePreviews.map((img, index) => (
                      <Card key={index} sx={{
                        position: 'relative',
                        border: '2px solid #1976d2',
                        borderRadius: 2,
                        overflow: 'hidden',
                        maxWidth: 200
                      }}>
                        <CardMedia
                          component="img"
                          height="160"
                          image={img.url}
                          alt={img.alt}
                          sx={{ objectFit: 'cover' }}
                        />
                        <Chip
                          label="Ảnh chính"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            backgroundColor: '#1976d2',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '10px'
                          }}
                        />
                        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                          <IconButton
                            size="small"
                            onClick={handleRemoveImage}
                            sx={{
                              backgroundColor: 'rgba(255,255,255,0.9)',
                              '&:hover': { backgroundColor: 'white', color: '#e53935' }
                            }}
                          >
                            <Delete sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      </Card>
                    ))}
                  </Box>
                ) : (
                  <Alert severity="warning" sx={{ borderRadius: 2 }}>
                    Vui lòng chọn ít nhất 1 ảnh cho danh mục
                  </Alert>
                )}
              </Paper>
            </Grid>

            {/* Basic Information */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Description sx={{ color: '#1976d2', fontSize: 28 }} />
                  <Typography variant="h5" fontWeight={700}>THÔNG TIN DANH MỤC</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      rules={{
                        required: VALIDATION_MESSAGES.NAME_REQUIRED,
                        minLength: { value: MIN_NAME_LENGTH, message: VALIDATION_MESSAGES.NAME_MIN },
                        maxLength: { value: MAX_NAME_LENGTH, message: VALIDATION_MESSAGES.NAME_MAX }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Tên danh mục *"
                          error={!!errors.name}
                          helperText={`${field.value?.length || 0}/${MAX_NAME_LENGTH}`}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      )}
                    />
                    <FieldErrorAlert errors={errors} fieldName="name" />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="description"
                      control={control}
                      rules={{
                        maxLength: { value: MAX_DESCRIPTION_LENGTH, message: VALIDATION_MESSAGES.DESCRIPTION_MAX }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Mô tả"
                          multiline
                          rows={3}
                          error={!!errors.description}
                          helperText={`${field.value?.length || 0}/${MAX_DESCRIPTION_LENGTH}`}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      )}
                    />
                    <FieldErrorAlert errors={errors} fieldName="description" />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Controller
                      name="displayOrder"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Thứ tự hiển thị"
                          type="number"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Sort sx={{ color: '#1976d2' }} />
                              </InputAdornment>
                            )
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Switch
                              {...field}
                              checked={field.value}
                              color="primary"
                            />
                          }
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {field.value ? <Visibility /> : <VisibilityOff />}
                              <Typography>
                                {field.value ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                              </Typography>
                            </Box>
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, background: 'rgba(25, 118, 210, 0.05)' }}>
          <Button onClick={onClose} variant="outlined" disabled={isSubmitting}
            sx={{
              borderRadius: 2, px: 4, py: 1, fontWeight: 700, borderColor: '#1976d2', color: '#1976d2',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)', borderColor: '#1565c0' }
            }}>
            HỦY BỎ
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting || imagePreviews.length === 0}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{
              borderRadius: 2, px: 4, py: 1, fontWeight: 700, background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
              '&:hover': { background: 'linear-gradient(135deg, #1565c0, #1976d2)', transform: 'translateY(-2px)' },
              transition: 'all 0.3s ease', '&:disabled': { background: '#ccc', transform: 'none' }
            }}>
            {isSubmitting ? 'ĐANG XỬ LÝ...' : 'THÊM MỚI'} 📁
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryForm;