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
  Delete, AddPhotoAlternate, Star, Scale, Numbers,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput';
import FieldErrorAlert from '~/components/Form/FieldErrorAlert';
import { createNewProductdAPI, updateProductAPI } from '~/redux/product/productSlice';
import { useDispatch, useSelector } from 'react-redux'
import { singleFileValidator } from '~/utils/validators'
// Constants - Đồng bộ với validation
const FIELD_REQUIRED_MESSAGE = 'Trường này là bắt buộc';
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 1000;
const MIN_QUANTIFICATION_LENGTH = 10;
const MAX_QUANTIFICATION_LENGTH = 1000;

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
  [MAIN_CATEGORIES.WHEY_PROTEIN]: [
    'Hydrolyzed Whey Protein',
    'Whey Protein Isolate',
    'Whey Protein Blend',
    'Casein Protein',
    'Meal Replacement',
    'Protein Bar'
  ],
  [MAIN_CATEGORIES.MASS_GAINER]: [],
  [MAIN_CATEGORIES.BCAA_AMINO]: ['Essential Amino Acids'],
  [MAIN_CATEGORIES.STRENGTH]: ['Pre Workout', 'Beta Alanine', 'Creatine'],
  [MAIN_CATEGORIES.WEIGHT_LOSS]: ['Fat Burn', 'CLA', 'L-Carnitine', 'Yến mạch'],
  [MAIN_CATEGORIES.VITAMINS]: ['MultiVitamin', 'Astaxanthin', 'Testosterone', 'Xương khớp', 'ZMA'],
  [MAIN_CATEGORIES.FISH_OIL]: [],
  [MAIN_CATEGORIES.ACCESSORIES]: ['Bình lắc', 'Dây kháng lực', 'Phụ kiện riêng của lacu', 'Phụ kiện Harbinger']
};

// Danh sách các danh mục chính KHÔNG có danh mục phụ (không bắt buộc nhập)
const CATEGORIES_WITHOUT_SUBCATEGORIES = [
  MAIN_CATEGORIES.MASS_GAINER,
  MAIN_CATEGORIES.FISH_OIL
];

// Validation messages
const VALIDATION_MESSAGES = {
  NAME_REQUIRED: FIELD_REQUIRED_MESSAGE,
  NAME_MIN: `Tên sản phẩm phải có ít nhất ${MIN_NAME_LENGTH} ký tự`,
  NAME_MAX: `Tên sản phẩm không được vượt quá ${MAX_NAME_LENGTH} ký tự`,
  DESCRIPTION_REQUIRED: FIELD_REQUIRED_MESSAGE,
  DESCRIPTION_MIN: `Mô tả phải có ít nhất ${MIN_DESCRIPTION_LENGTH} ký tự`,
  DESCRIPTION_MAX: `Mô tả không được vượt quá ${MAX_DESCRIPTION_LENGTH} ký tự`,
  QUANTIFICATION_REQUIRED: FIELD_REQUIRED_MESSAGE,
  QUANTIFICATION_MIN: `Định lượng phải có ít nhất ${MIN_QUANTIFICATION_LENGTH} ký tự`,
  QUANTIFICATION_MAX: `Định lượng không được vượt quá ${MAX_QUANTIFICATION_LENGTH} ký tự`,
  PRICE_REQUIRED: 'Giá sản phẩm là bắt buộc',
  PRICE_MIN: 'Giá sản phẩm phải lớn hơn 0',
  PRICE_MAX: 'Giá sản phẩm không được vượt quá 1,000,000,000 VNĐ',
  PRICE_INVALID: 'Giá bán phải nhỏ hơn hoặc bằng giá gốc',
  STOCK_REQUIRED: 'Số lượng tồn kho là bắt buộc',
  STOCK_MIN: 'Số lượng tồn kho không được âm',
  STOCK_INTEGER: 'Số lượng tồn kho phải là số nguyên',
  IMAGES_REQUIRED: 'Vui lòng upload ít nhất một ảnh sản phẩm',
  IMAGE_TYPE: 'Chỉ chấp nhận file ảnh (jpg, jpeg, png)',
  IMAGE_SIZE: 'Kích thước file không được vượt quá 10MB'
};

// Default values để tránh lỗi uncontrolled/controlled
const defaultValues = {
  name: '',
  description: '',
  quantification: '',
  mainCategory: '',
  subCategory: '',
  brand: '',
  price: { current: '', original: '' },
  stock: { quantity: '0' },
};

const ProductForm = ({ open, product, onClose, onSave }) => {
  const dispatch = useDispatch();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageErrors, setImageErrors] = useState([]);

  const { control, handleSubmit, formState: { errors }, watch, setValue, reset, trigger } = useForm({
    defaultValues: defaultValues
  });

  const watchPriceOriginal = watch('price.original');
  const watchPriceCurrent = watch('price.current');
  const watchMainCategory = watch('mainCategory');
  const watchStockQuantity = watch('stock.quantity');
  const watchSubCategory = watch('subCategory');

  // Auto calculate discount (chỉ tính toán nhưng không hiển thị)
  useEffect(() => {
    const original = parseFloat(watchPriceOriginal) || 0;
    const current = parseFloat(watchPriceCurrent) || 0;

    if (original > 0 && current > 0) {
      const discount = Math.round(((original - current) / original) * 100);
      setValue('price.discount', Math.max(0, discount));
    } else {
      setValue('price.discount', 0);
    }
  }, [watchPriceOriginal, watchPriceCurrent, setValue]);


  // Reset form - FIXED: Đảm bảo luôn có giá trị mặc định
  // Reset form - FIXED: Đảm bảo luôn có giá trị mặc định
  useEffect(() => {
    if (open) {
      if (product) {
        // Đảm bảo tất cả fields đều có giá trị, không undefined
        const productData = {
          ...defaultValues,
          ...product,
          price: {
            current: product.price?.current?.toString() || '',
            original: product.price?.original?.toString() || '',
            discount: product.price?.discount || 0
          },
          stock: {
            quantity: product.stock?.quantity?.toString() || '0'
          },
          subCategory: product.subCategory || '',
        };
        reset(productData);

        // FIX: Đảm bảo imagePreviews luôn là array
        if (product.images) {
          // Nếu images là string (URL), chuyển thành array
          if (typeof product.images === 'string') {
            setImagePreviews([{
              url: product.images,
              alt: product.name || 'Product Image',
              isPrimary: true
            }]);
          }
          // Nếu images là array, dùng trực tiếp
          else if (Array.isArray(product.images)) {
            setImagePreviews(product.images);
          }
          // Nếu không có images, set array rỗng
          else {
            setImagePreviews([]);
          }
        } else {
          setImagePreviews([]);
        }
      } else {
        reset(defaultValues);
        setImagePreviews([]);
      }
      setImageErrors([]);
    }
  }, [open, product, reset]);

  // Image handlers
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newErrors = [];

    // CHỈ CHO PHÉP 1 ẢNH
    if (imagePreviews.length >= 1) {
      toast.error('Chỉ được upload tối đa 1 ảnh');
      event.target.value = '';
      return;
    }

    files.forEach((file, index) => {
      const fileError = singleFileValidator(file); // ← ĐỔI TÊN BIẾN (bỏ "s")

      // SỬA: Kiểm tra nếu có lỗi (fileError là string)
      if (fileError) {
        newErrors.push(`File ${file.name}: ${fileError}`); // ← DÙNG fileError (không có .length)
      } else {
        const newImagePreview = {
          url: URL.createObjectURL(file),
          alt: `Product Image ${Date.now()}_${index}`,
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

  const handleRemoveImage = (index) => {
    // Cleanup memory - quan trọng với URL.createObjectURL
    if (imagePreviews[index]?.url) {
      URL.revokeObjectURL(imagePreviews[index].url);
    }
    setImagePreviews([]);
  };

  const handleSetPrimary = (index) => {
    setImagePreviews(prev => prev.map((img, i) => ({
      ...img,
      isPrimary: i === index
    })));
  };

  const getAvailableSubCategories = () => {
    const subCats = SUB_CATEGORIES[watchMainCategory] || [];
    return subCats;
  };

  const isSubCategoryRequired = () => {
    return !CATEGORIES_WITHOUT_SUBCATEGORIES.includes(watchMainCategory);
  };

  // Number input handler
  const handleNumberInput = (field, value, isInteger = false) => {
    let numericValue = value.replace(/[^\d.]/g, '');

    if (isInteger) {
      numericValue = numericValue.replace(/\./g, ''); // Remove decimal points for integers
    }

    const parts = numericValue.split('.');
    if (parts.length > 2) return;

    field.onChange(numericValue);
  };

  // Price validation
  const validatePrice = (current, original) => {
    if (!current || !original) return null;

    const currentPrice = parseFloat(current);
    const originalPrice = parseFloat(original);

    if (currentPrice > originalPrice) {
      return VALIDATION_MESSAGES.PRICE_INVALID;
    }

    return null;
  };

  // Stock validation
  const validateStock = (quantity) => {
    if (quantity === '' || quantity === undefined) {
      return VALIDATION_MESSAGES.STOCK_REQUIRED;
    }

    const stockQty = parseFloat(quantity);
    if (isNaN(stockQty)) {
      return VALIDATION_MESSAGES.STOCK_INTEGER;
    }

    if (stockQty < 0) {
      return VALIDATION_MESSAGES.STOCK_MIN;
    }

    if (!Number.isInteger(stockQty)) {
      return VALIDATION_MESSAGES.STOCK_INTEGER;
    }

    return null;
  };

  // Form validation before submit
  const validateForm = (data) => {
    const errors = {};

    // Validate name
    if (!data.name || data.name.trim().length < MIN_NAME_LENGTH) {
      errors.name = VALIDATION_MESSAGES.NAME_MIN;
    } else if (data.name.length > MAX_NAME_LENGTH) {
      errors.name = VALIDATION_MESSAGES.NAME_MAX;
    }

    // Validate description
    if (!data.description || data.description.trim().length < MIN_DESCRIPTION_LENGTH) {
      errors.description = VALIDATION_MESSAGES.DESCRIPTION_MIN;
    } else if (data.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.description = VALIDATION_MESSAGES.DESCRIPTION_MAX;
    }

    // Validate quantification
    if (!data.quantification || data.quantification.trim().length < MIN_QUANTIFICATION_LENGTH) {
      errors.quantification = VALIDATION_MESSAGES.QUANTIFICATION_MIN;
    } else if (data.quantification.length > MAX_QUANTIFICATION_LENGTH) {
      errors.quantification = VALIDATION_MESSAGES.QUANTIFICATION_MAX;
    }

    // Validate price
    const currentPrice = parseFloat(data.price.current);
    const originalPrice = parseFloat(data.price.original);

    if (!currentPrice || currentPrice <= 0) {
      errors.price = { ...errors.price, current: VALIDATION_MESSAGES.PRICE_MIN };
    } else if (currentPrice > 1000000000) {
      errors.price = { ...errors.price, current: VALIDATION_MESSAGES.PRICE_MAX };
    }

    if (!originalPrice || originalPrice <= 0) {
      errors.price = { ...errors.price, original: VALIDATION_MESSAGES.PRICE_MIN };
    } else if (originalPrice > 1000000000) {
      errors.price = { ...errors.price, original: VALIDATION_MESSAGES.PRICE_MAX };
    }

    // Validate price comparison
    const priceError = validatePrice(data.price.current, data.price.original);
    if (priceError) {
      errors.price = { ...errors.price, current: priceError };
    }

    // Validate stock
    const stockError = validateStock(data.stock.quantity);
    if (stockError) {
      errors.stock = { quantity: stockError };
    }

    // Validate subcategory - FIXED: chỉ validate khi required và có danh mục phụ
    if (isSubCategoryRequired() && getAvailableSubCategories().length > 0 && !data.subCategory) {
      errors.subCategory = FIELD_REQUIRED_MESSAGE;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };

  // Submit handler
  // Submit handler
  const submitCreateNewProduct = async (data) => {
    // Validate images
    if (!imagePreviews || imagePreviews.length === 0) {
      toast.error(VALIDATION_MESSAGES.IMAGES_REQUIRED);
      return;
    }

    // Validate form data
    const formErrors = validateForm(data);
    if (formErrors) {
      const firstError = Object.values(formErrors).find(error => error);
      if (firstError) toast.error(firstError);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // XỬ LÝ ẢNH: Nếu là edit và không có file mới, không append image
      const primaryImage = imagePreviews[0];
      if (primaryImage && primaryImage.file) {
        // Có file mới - append vào formData
        formData.append('image', primaryImage.file);
      } else if (!product) {
        // Tạo mới nhưng không có file - báo lỗi
        toast.error('Không tìm thấy file ảnh');
        return;
      }
      // Edit và không có file mới - không append image (giữ ảnh cũ)

      // Tạo object data
      const productData = {
        ...data,
        price: {
          current: parseFloat(data.price.current),
          original: parseFloat(data.price.original),
          discount: data.price.discount || 0
        },
        stock: {
          quantity: parseInt(data.stock.quantity)
        }
      };


    delete productData._id;
    delete productData.images;
    delete productData._destroy;
    delete productData.createdAt;
    delete productData.updatedAt;
      formData.append('data', JSON.stringify(productData));

      // Gọi API - cần sửa API để hỗ trợ cả update


      if (product && product._id) {
        dispatch(updateProductAPI({
          id: product._id,
          formData: formData
        }));
        toast.success('Cập nhật sản phẩm thành công! 🎉');
      } else {
        dispatch(createNewProductdAPI(formData));
        toast.success('Thêm sản phẩm mới thành công! 🎉');
      }

      await onSave(data);
      onClose();
    } catch (error) {
      toast.error(`Lỗi khi ${product ? 'cập nhật' : 'thêm'} sản phẩm. Vui lòng thử lại.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors) => {
 
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
                    disabled={imagePreviews.length >= 1} // ← DISABLE KHI ĐÃ CÓ ẢNH
                    sx={{
                      borderRadius: 2, fontWeight: 600, borderColor: '#ff5722', color: '#ff5722',
                      '&:hover': { backgroundColor: 'rgba(255, 87, 34, 0.1)', borderColor: '#e65100' },
                      '&:disabled': { borderColor: '#ccc', color: '#ccc' }
                    }}
                  >
                    TẢI ẢNH LÊN
                    <VisuallyHiddenInput
                      type="file"
                      multiple={false} // ← QUAN TRỌNG: chỉ cho chọn 1 file
                      accept="image/jpg, image/jpeg, image/png"
                      onChange={handleImageUpload}
                    />
                  </Button>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Chấp nhận: JPG, JPEG, PNG (tối đa 10MB) - Chỉ 1 ảnh duy nhất {/* ← Update message */}
                  </Typography>
                </Box>

                {imagePreviews && imagePreviews.length > 0 ? (
                  <Grid container spacing={2}>
                    {imagePreviews.map((img, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{
                          position: 'relative',
                          border: '2px solid #ff5722',
                          borderRadius: 2,
                          overflow: 'hidden',
                          maxWidth: 200
                        }}>
                          <CardMedia
                            component="img"
                            height="160"
                            image={typeof img === 'string' ? img : img.url} // ← HANDLE CẢ STRING VÀ OBJECT
                            alt={typeof img === 'string' ? product?.name || 'Product Image' : img.alt}
                            sx={{ objectFit: 'cover' }}
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
                                onClick={() => handleRemoveImage(index)}
                                sx={{
                                  backgroundColor: 'rgba(255,255,255,0.9)',
                                  '&:hover': { backgroundColor: 'white', color: '#e53935' }
                                }}
                              >
                                <Delete sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Alert severity="warning" sx={{ borderRadius: 2 }}>
                    {VALIDATION_MESSAGES.IMAGES_REQUIRED}
                  </Alert>
                )}

                {imagePreviews.length === 0 && (
                  <Alert severity="warning" sx={{ borderRadius: 2 }}>
                    {VALIDATION_MESSAGES.IMAGES_REQUIRED}
                  </Alert>
                )}
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
                          label="Tên sản phẩm *"
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
                      name="quantification"
                      control={control}
                      rules={{
                        required: VALIDATION_MESSAGES.QUANTIFICATION_REQUIRED,
                        minLength: { value: MIN_QUANTIFICATION_LENGTH, message: VALIDATION_MESSAGES.QUANTIFICATION_MIN },
                        maxLength: { value: MAX_QUANTIFICATION_LENGTH, message: VALIDATION_MESSAGES.QUANTIFICATION_MAX }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Định lượng *"
                          multiline
                          rows={2}
                          error={!!errors.quantification}
                          helperText={`${field.value?.length || 0}/${MAX_QUANTIFICATION_LENGTH}`}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Scale sx={{ color: '#ff5722' }} />
                              </InputAdornment>
                            )
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      )}
                    />
                    <FieldErrorAlert errors={errors} fieldName="quantification" />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="description"
                      control={control}
                      rules={{
                        required: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
                        minLength: { value: MIN_DESCRIPTION_LENGTH, message: VALIDATION_MESSAGES.DESCRIPTION_MIN },
                        maxLength: { value: MAX_DESCRIPTION_LENGTH, message: VALIDATION_MESSAGES.DESCRIPTION_MAX }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Mô tả chi tiết *"
                          multiline
                          rows={4}
                          error={!!errors.description}
                          helperText={`${field.value?.length || 0}/${MAX_DESCRIPTION_LENGTH}`}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
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
                    <Controller
                      name="mainCategory"
                      control={control}
                      rules={{ required: FIELD_REQUIRED_MESSAGE }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.mainCategory} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                          <InputLabel>Danh mục chính *</InputLabel>
                          <Select
                            {...field}
                            label="Danh mục chính *"
                            value={field.value || ''} // FIXED: Đảm bảo không undefined
                            onChange={(e) => {
                              field.onChange(e);
                              setValue('subCategory', '');
                            }}
                          >
                            {Object.values(MAIN_CATEGORIES).map((category) => (
                              <MenuItem key={category} value={category}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <FitnessCenter sx={{ fontSize: 18, color: '#ff5722' }} />
                                  {category}
                                  {CATEGORIES_WITHOUT_SUBCATEGORIES.includes(category) && (
                                    <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                                      (Không có danh mục phụ)
                                    </Typography>
                                  )}
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
                    <Controller
                      name="subCategory"
                      control={control}
                      rules={{
                        required: isSubCategoryRequired() && getAvailableSubCategories().length > 0 ? FIELD_REQUIRED_MESSAGE : false
                      }}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.subCategory}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                          disabled={!watchMainCategory || getAvailableSubCategories().length === 0}
                        >
                          <InputLabel>
                            Danh mục phụ {isSubCategoryRequired() && getAvailableSubCategories().length > 0 ? '*' : ''}
                          </InputLabel>
                          <Select
                            {...field}
                            label={`Danh mục phụ ${isSubCategoryRequired() && getAvailableSubCategories().length > 0 ? '*' : ''}`}
                            value={field.value || ''} // FIXED: Đảm bảo không undefined
                          >
                            {getAvailableSubCategories().length > 0 ? (
                              getAvailableSubCategories().map((subCat) => (
                                <MenuItem key={subCat} value={subCat}>{subCat}</MenuItem>
                              ))
                            ) : (
                              <MenuItem value="">
                                <em>Không có danh mục phụ</em>
                              </MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <FieldErrorAlert errors={errors} fieldName="subCategory" />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="brand"
                      control={control}
                      rules={{ required: FIELD_REQUIRED_MESSAGE }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.brand} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
                          <InputLabel>Thương hiệu *</InputLabel>
                          <Select
                            {...field}
                            label="Thương hiệu *"
                            value={field.value || ''} // FIXED: Đảm bảo không undefined
                          >
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

            {/* Price & Stock */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <AttachMoney sx={{ color: '#ff5722', fontSize: 28 }} />
                  <Typography variant="h5" fontWeight={700}>GIÁ CẢ & TỒN KHO</Typography>
                </Box>
                <Grid container spacing={3}>
                  {/* Giá gốc */}
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="price.original"
                      control={control}
                      rules={{ required: VALIDATION_MESSAGES.PRICE_REQUIRED }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Giá gốc *"
                          error={!!errors.price?.original}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">₫</InputAdornment>,
                            inputMode: 'decimal'
                          }}
                          onChange={(e) => handleNumberInput(field, e.target.value)}
                          placeholder="0"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      )}
                    />
                    <FieldErrorAlert errors={errors} fieldName="price.original" />
                  </Grid>

                  {/* Giá bán */}
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="price.current"
                      control={control}
                      rules={{ required: VALIDATION_MESSAGES.PRICE_REQUIRED }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Giá bán *"
                          error={!!errors.price?.current}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">₫</InputAdornment>,
                            inputMode: 'decimal'
                          }}
                          onChange={(e) => handleNumberInput(field, e.target.value)}
                          placeholder="0"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      )}
                    />
                    <FieldErrorAlert errors={errors} fieldName="price.current" />
                    {validatePrice(watchPriceCurrent, watchPriceOriginal) && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                        {VALIDATION_MESSAGES.PRICE_INVALID}
                      </Typography>
                    )}
                  </Grid>

                  {/* Số lượng tồn kho */}
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="stock.quantity"
                      control={control}
                      rules={{ required: VALIDATION_MESSAGES.STOCK_REQUIRED }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Số lượng tồn kho *"
                          error={!!errors.stock?.quantity}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Numbers sx={{ color: '#ff5722' }} />
                              </InputAdornment>
                            ),
                            inputMode: 'numeric'
                          }}
                          onChange={(e) => handleNumberInput(field, e.target.value, true)}
                          placeholder="0"
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      )}
                    />
                    <FieldErrorAlert errors={errors} fieldName="stock.quantity" />
                    {watchStockQuantity && (
                      <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                        Số lượng: {parseInt(watchStockQuantity) || 0}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, background: 'rgba(255, 87, 34, 0.05)' }}>
          <Button onClick={onClose} variant="outlined" disabled={isSubmitting}
            sx={{
              borderRadius: 2, px: 4, py: 1, fontWeight: 700, borderColor: '#ff5722', color: '#ff5722',
              '&:hover': { backgroundColor: 'rgba(255, 87, 34, 0.1)', borderColor: '#e65100' }
            }}>
            HỦY BỎ
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting || imagePreviews.length === 0}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            sx={{
              borderRadius: 2, px: 4, py: 1, fontWeight: 700, background: 'linear-gradient(135deg, #ff5722, #ff8c42)',
              '&:hover': { background: 'linear-gradient(135deg, #e65100, #ff5722)', transform: 'translateY(-2px)' },
              transition: 'all 0.3s ease', '&:disabled': { background: '#ccc', transform: 'none' }
            }}>
            {isSubmitting ? 'ĐANG XỬ LÝ...' : (product ? 'CẬP NHẬT' : 'THÊM MỚI')} 💪
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductForm;