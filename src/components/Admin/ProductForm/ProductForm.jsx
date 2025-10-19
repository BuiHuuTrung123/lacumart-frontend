// src/components/Admin/ProductForm/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid,
  FormControl, InputLabel, Select, MenuItem, Box, Typography, Paper, Chip,
  InputAdornment, Tooltip, IconButton, Card, CardMedia, Alert, CircularProgress,
} from '@mui/material';
import {
  FitnessCenter, LocalOffer, Inventory, AttachMoney, CloudUpload,
  Delete, AddPhotoAlternate, Star,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput';
import FieldErrorAlert from '~/components/Form/FieldErrorAlert';
import { createNewProductdAPI } from '~/apis';

// Constants
const FIELD_REQUIRED_MESSAGE = 'Trường này là bắt buộc';

const MAIN_CATEGORIES = {
  WHEY_PROTEIN: 'Whey Protein',
  MASS_GAINER: 'Sữa tăng cân',
  BCAA_AMINO: 'BCAA Amino Acids',
  STRENGTH: 'Tăng sức mạnh',
  WEIGHT_LOSS: 'Hỗ trợ giảm cân',
  VITAMINS: 'Vitamin khoáng chất',
  FISH_OIL: 'Dầu cá',
  ACCESSORIES: 'Phụ kiện tập gym'
};

const BRANDS = [
  'Redcon1', 'BPI Sports', 'Ostrovit', 'Ultimate Nutrition', 'Labrada',
  'Optimum Nutrition', 'Quaker', 'VitaXtrong', 'Now Foods', 'JNX Sports',
  'Biotech USA', 'Puritan\'s Pride', 'Doctor\'s Best', 'Webber Naturals', 'Scivation'
];

const SUB_CATEGORIES = {
  [MAIN_CATEGORIES.WHEY_PROTEIN]: ['Whey Protein Isolate', 'Whey Protein Blend', 'Hydrolyzed Whey Protein', 'Casein Protein', 'Meal Replacement', 'Protein Bar'],
  [MAIN_CATEGORIES.MASS_GAINER]: [],
  [MAIN_CATEGORIES.BCAA_AMINO]: ['Essential Amino Acids'],
  [MAIN_CATEGORIES.STRENGTH]: ['Pre Workout', 'Beta Alanine', 'Creatine'],
  [MAIN_CATEGORIES.WEIGHT_LOSS]: ['Fat Burn', 'CLA', 'L-Carnitine', 'Yến mạch'],
  [MAIN_CATEGORIES.VITAMINS]: ['MultiVitamin', 'Astaxanthin', 'Testosterone', 'Xương khớp', 'ZMA'],
  [MAIN_CATEGORIES.FISH_OIL]: [],
  [MAIN_CATEGORIES.ACCESSORIES]: ['Bình lắc', 'Dây kháng lực', 'Phụ kiện riêng của lacu', 'Phụ kiện Harbinger']
};

const ProductForm = ({ open, product, onClose, onSave }) => {
 
     
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      shortDescription: '',
      mainCategory: '',
      subCategory: '',
      brand: '',
      price: { current: '', original: '', discount: 0 },
      stock: { quantity: '', status: 'in_stock' }
    }
  });

  const watchPriceOriginal = watch('price.original');
  const watchPriceCurrent = watch('price.current');
  const watchMainCategory = watch('mainCategory');

  // Auto calculate discount
  useEffect(() => {
    const original = parseFloat(watchPriceOriginal) || 0;
    const current = parseFloat(watchPriceCurrent) || 0;
    
    if (original > 0 && current > 0) {
      const discount = Math.round(((original - current) / original) * 100);
      setValue('price.discount', discount);
    } else {
      setValue('price.discount', 0);
    }
  }, [watchPriceOriginal, watchPriceCurrent, setValue]);

  // Auto generate slug
  useEffect(() => {
    const name = watch('name');
    if (name) {
      const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      setValue('slug', slug);
    }
  }, [watch('name'), setValue]);

  // Reset form
  useEffect(() => {
    if (open) {
      if (product) {
        reset({
          ...product,
          price: {
            current: product.price?.current || '',
            original: product.price?.original || '',
            discount: product.price?.discount || 0
          },
          stock: {
            quantity: product.stock?.quantity || '',
            status: product.stock?.status || 'in_stock'
          }
        });
        setImagePreviews(product.images || []);
      } else {
        reset();
        setImagePreviews([]);
      }
    }
  }, [open, product, reset]);

  // Image handlers
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImagePreviews = files.map(file => ({
      url: URL.createObjectURL(file),
      alt: `Product Image ${Date.now()}`,
      isPrimary: imagePreviews.length === 0,
      file: file
    }));
    setImagePreviews(prev => [...prev, ...newImagePreviews]);
    event.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setImagePreviews(prev => {
      const newPreviews = prev.filter((_, i) => i !== index);
      if (prev[index].isPrimary && newPreviews.length > 0) {
        newPreviews[0].isPrimary = true;
      }
      return newPreviews;
    });
  };

  const handleSetPrimary = (index) => {
    setImagePreviews(prev => prev.map((img, i) => ({
      ...img,
      isPrimary: i === index
    })));
  };

  const getAvailableSubCategories = () => SUB_CATEGORIES[watchMainCategory] || [];

  // Number input handler - chỉ cho phép nhập số
  const handleNumberInput = (field, value) => {
    // Chỉ cho phép số và dấu chấm thập phân
    const numericValue = value.replace(/[^\d.]/g, '');
    // Chỉ cho phép một dấu chấm thập phân
    const parts = numericValue.split('.');
    if (parts.length > 2) return;
    
    field.onChange(numericValue);
  };

  // Submit handler
  const submitCreateNewProduct = async (data) => {
    if (imagePreviews.length === 0) {
      toast.error('Vui lòng upload ít nhất một ảnh sản phẩm');
      return;
    }

    // Validate số
    const currentPrice = parseFloat(data.price.current);
    const originalPrice = parseFloat(data.price.original);
    const stockQuantity = parseFloat(data.stock.quantity);

    if (!currentPrice || currentPrice <= 0) {
      toast.error('Giá bán phải là số lớn hơn 0');
      return;
    }

    if (!originalPrice || originalPrice <= 0) {
      toast.error('Giá gốc phải là số lớn hơn 0');
      return;
    }

    if (!stockQuantity || stockQuantity < 0) {
      toast.error('Số lượng tồn kho phải là số lớn hơn hoặc bằng 0');
      return;
    }

    setIsSubmitting(true);

    try {
      const finalFormData = {
        ...data,
        price: {
          current: currentPrice,
          original: originalPrice,
          discount: data.price.discount
        },
        stock: {
          quantity: stockQuantity,
          status: data.stock.status
        },
        images: imagePreviews.map(img => ({
          url: img.url,
          alt: img.alt || data.name,
          isPrimary: img.isPrimary
        }))
      };

      await createNewProductdAPI(finalFormData);
      await onSave(finalFormData);
      toast.success(product ? 'Cập nhật sản phẩm thành công! 🎉' : 'Thêm sản phẩm mới thành công! 🎉');
    } catch (error) {
      toast.error('Lỗi khi lưu sản phẩm. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors) => {
    console.log('Form errors:', errors);
    toast.error('Vui lòng kiểm tra lại thông tin form');
  };

  return (
    <Dialog open={open} onClose={isSubmitting ? undefined : onClose} maxWidth="lg" fullWidth
      PaperProps={{ sx: { borderRadius: 3, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', maxHeight: '90vh', overflow: 'auto' } }}>
      
      <DialogTitle sx={{ background: 'linear-gradient(135deg, #ff5722, #ff8c42)', color: 'white', textAlign: 'center', py: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <FitnessCenter sx={{ fontSize: 32 }} />
          <Typography variant="h4" fontWeight={800}>
            {product ? 'CẬP NHẬT SẢN PHẨM' : 'THÊM SẢN PHẨM MỚI'}
          </Typography>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(submitCreateNewProduct, onError)}>
        <DialogContent sx={{ p: 4 }}>
          <Grid container spacing={4}>

            {/* Images Section */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <AddPhotoAlternate sx={{ color: '#ff5722', fontSize: 28 }} />
                  <Typography variant="h5" fontWeight={700}>HÌNH ẢNH SẢN PHẨM</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Button component="label" variant="outlined" startIcon={<CloudUpload />}
                    sx={{ borderRadius: 2, fontWeight: 600, borderColor: '#ff5722', color: '#ff5722',
                      '&:hover': { backgroundColor: 'rgba(255, 87, 34, 0.1)', borderColor: '#e65100' } }}>
                    TẢI ẢNH LÊN
                    <VisuallyHiddenInput type="file" multiple accept="image/*" onChange={handleImageUpload} />
                  </Button>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Chọn nhiều ảnh để upload. Ảnh đầu tiên sẽ là ảnh chính.
                  </Typography>
                </Box>

                {imagePreviews.length > 0 && (
                  <Grid container spacing={2}>
                    {imagePreviews.map((img, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Card sx={{ position: 'relative', border: img.isPrimary ? '2px solid #ff5722' : '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden' }}>
                          <CardMedia component="img" height="120" image={img.url} alt={img.alt} sx={{ objectFit: 'cover' }} />
                          {img.isPrimary && <Chip label="Ảnh chính" size="small" sx={{ position: 'absolute', top: 8, left: 8, backgroundColor: '#ff5722', color: 'white', fontWeight: 600, fontSize: '10px' }} />}
                          <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 0.5 }}>
                            {!img.isPrimary && (
                              <Tooltip title="Đặt làm ảnh chính">
                                <IconButton size="small" onClick={() => handleSetPrimary(index)} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', '&:hover': { backgroundColor: 'white' } }}>
                                  <Star sx={{ fontSize: 16, color: '#ffc107' }} />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Xóa ảnh">
                              <IconButton size="small" onClick={() => handleRemoveImage(index)} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', '&:hover': { backgroundColor: 'white', color: '#e53935' } }}>
                                <Delete sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {imagePreviews.length === 0 && <Alert severity="warning" sx={{ borderRadius: 2 }}>Vui lòng upload ít nhất một ảnh sản phẩm</Alert>}
              </Paper>
            </Grid>

            {/* Basic Information */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Inventory sx={{ color: '#ff5722', fontSize: 28 }} />
                  <Typography variant="h5" fontWeight={700}>THÔNG TIN CƠ BẢN</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Controller name="name" control={control} rules={{ required: FIELD_REQUIRED_MESSAGE, minLength: 3 }} 
                      render={({ field }) => (
                        <TextField {...field} fullWidth label="Tên sản phẩm" error={!!errors.name} 
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      )} 
                    />
                    <FieldErrorAlert errors={errors} fieldName="name" />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller name="shortDescription" control={control} 
                      render={({ field }) => (
                        <TextField {...field} fullWidth label="Mô tả ngắn" multiline rows={2} 
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      )} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller name="description" control={control} rules={{ required: FIELD_REQUIRED_MESSAGE, minLength: 10 }} 
                      render={({ field }) => (
                        <TextField {...field} fullWidth label="Mô tả chi tiết" multiline rows={4} error={!!errors.description} 
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      )} 
                    />
                    <FieldErrorAlert errors={errors} fieldName="description" />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Category & Brand */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <LocalOffer sx={{ color: '#ff5722', fontSize: 28 }} />
                  <Typography variant="h5" fontWeight={700}>DANH MỤC & THƯƠNG HIỆU</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Controller name="mainCategory" control={control} rules={{ required: FIELD_REQUIRED_MESSAGE }} 
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.mainCategory} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                          <InputLabel>Danh mục chính</InputLabel>
                          <Select {...field} label="Danh mục chính" onChange={(e) => { field.onChange(e); setValue('subCategory', ''); }}>
                            {Object.values(MAIN_CATEGORIES).map((category) => (
                              <MenuItem key={category} value={category}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <FitnessCenter sx={{ fontSize: 18, color: '#ff5722' }} />
                                  {category}
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )} 
                    />
                    <FieldErrorAlert errors={errors} fieldName="mainCategory" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller name="subCategory" control={control} 
                      render={({ field }) => (
                        <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                          <InputLabel>Danh mục phụ</InputLabel>
                          <Select {...field} label="Danh mục phụ" disabled={!watchMainCategory || getAvailableSubCategories().length === 0}>
                            {getAvailableSubCategories().map((subCat) => (
                              <MenuItem key={subCat} value={subCat}>{subCat}</MenuItem>
                            ))}
                            {getAvailableSubCategories().length === 0 && (
                              <MenuItem value="" disabled>Không có danh mục phụ</MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      )} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller name="brand" control={control} rules={{ required: FIELD_REQUIRED_MESSAGE }} 
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.brand} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                          <InputLabel>Thương hiệu</InputLabel>
                          <Select {...field} label="Thương hiệu">
                            {BRANDS.map((brand) => (
                              <MenuItem key={brand} value={brand}>
                                <Chip label={brand} size="small" variant="outlined" sx={{ borderColor: '#ff5722', color: '#ff5722' }} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )} 
                    />
                    <FieldErrorAlert errors={errors} fieldName="brand" />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Price */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <AttachMoney sx={{ color: '#ff5722', fontSize: 28 }} />
                  <Typography variant="h5" fontWeight={700}>GIÁ CẢ</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Controller name="price.original" control={control} rules={{ required: FIELD_REQUIRED_MESSAGE }} 
                      render={({ field }) => (
                        <TextField {...field} fullWidth label="Giá gốc" error={!!errors.price?.original} 
                          InputProps={{ startAdornment: <InputAdornment position="start">₫</InputAdornment> }}
                          onChange={(e) => handleNumberInput(field, e.target.value)}
                          placeholder="0"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      )} 
                    />
                    <FieldErrorAlert errors={errors} fieldName="price.original" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Controller name="price.current" control={control} rules={{ required: FIELD_REQUIRED_MESSAGE }} 
                      render={({ field }) => (
                        <TextField {...field} fullWidth label="Giá bán" error={!!errors.price?.current} 
                          InputProps={{ startAdornment: <InputAdornment position="start">₫</InputAdornment> }}
                          onChange={(e) => handleNumberInput(field, e.target.value)}
                          placeholder="0"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      )} 
                    />
                    <FieldErrorAlert errors={errors} fieldName="price.current" />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Controller name="price.discount" control={control} 
                      render={({ field }) => (
                        <TextField {...field} fullWidth label="Giảm giá" type="number" 
                          InputProps={{ readOnly: true, endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, backgroundColor: field.value > 0 ? 'rgba(76, 175, 80, 0.1)' : 'transparent' } }} />
                      )} 
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Stock */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Inventory sx={{ color: '#ff5722', fontSize: 28 }} />
                  <Typography variant="h5" fontWeight={700}>TỒN KHO</Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Controller name="stock.quantity" control={control} rules={{ required: FIELD_REQUIRED_MESSAGE }} 
                      render={({ field }) => (
                        <TextField {...field} fullWidth label="Số lượng tồn kho" error={!!errors.stock?.quantity} 
                          onChange={(e) => handleNumberInput(field, e.target.value)}
                          placeholder="0"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                      )} 
                    />
                    <FieldErrorAlert errors={errors} fieldName="stock.quantity" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller name="stock.status" control={control} rules={{ required: FIELD_REQUIRED_MESSAGE }} 
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.stock?.status} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                          <InputLabel>Trạng thái</InputLabel>
                          <Select {...field} label="Trạng thái">
                            <MenuItem value="in_stock">🟢 Còn hàng</MenuItem>
                            <MenuItem value="out_of_stock">🔴 Hết hàng</MenuItem>
                            <MenuItem value="low_stock">🟡 Sắp hết</MenuItem>
                            <MenuItem value="discontinued">⚫ Ngừng kinh doanh</MenuItem>
                          </Select>
                        </FormControl>
                      )} 
                    />
                    <FieldErrorAlert errors={errors} fieldName="stock.status" />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, background: 'rgba(255, 87, 34, 0.05)' }}>
          <Button onClick={onClose} variant="outlined" disabled={isSubmitting} 
            sx={{ borderRadius: 2, px: 4, py: 1, fontWeight: 700, borderColor: '#ff5722', color: '#ff5722', 
                  '&:hover': { backgroundColor: 'rgba(255, 87, 34, 0.1)', borderColor: '#e65100' } }}>
            HỦY BỎ
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting || imagePreviews.length === 0} 
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{ borderRadius: 2, px: 4, py: 1, fontWeight: 700, background: 'linear-gradient(135deg, #ff5722, #ff8c42)', 
                  '&:hover': { background: 'linear-gradient(135deg, #e65100, #ff5722)', transform: 'translateY(-2px)' }, 
                  transition: 'all 0.3s ease', '&:disabled': { background: '#ccc', transform: 'none' } }}>
            {isSubmitting ? 'ĐANG XỬ LÝ...' : (product ? 'CẬP NHẬT' : 'THÊM MỚI')} 💪
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductForm;