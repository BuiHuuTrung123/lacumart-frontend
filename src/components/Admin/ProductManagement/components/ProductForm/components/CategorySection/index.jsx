import React from 'react'
import { Controller } from 'react-hook-form'
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Box,
  Typography,
  Chip
} from '@mui/material'
import { LocalOffer, FitnessCenter } from '@mui/icons-material'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import {
  MAIN_CATEGORIES,
  BRANDS,
  SUB_CATEGORIES,
  CATEGORIES_WITHOUT_SUBCATEGORIES,
  FIELD_REQUIRED_MESSAGE
} from '~/constants/productForm'

const CategorySection = ({ 
  control, 
  errors, 
  watchMainCategory, 
  setValue 
}) => {
  const getAvailableSubCategories = () => {
    return SUB_CATEGORIES[watchMainCategory] || []
  }

  const isSubCategoryRequired = () => {
    return !CATEGORIES_WITHOUT_SUBCATEGORIES.includes(watchMainCategory)
  }

  const availableSubCategories = getAvailableSubCategories()

  return (
    <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <LocalOffer sx={{ color: '#ff5722', fontSize: 28 }} />
        <Typography variant="h5" fontWeight={700}>DANH MỤC & THƯƠNG HIỆU</Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Main Category */}
        <Grid item xs={12} md={6}>
          <Controller
            name="mainCategory"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <FormControl 
                fullWidth 
                error={!!errors.mainCategory}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2 
                  } 
                }}
              >
                <InputLabel>Danh mục chính *</InputLabel>
                <Select
                  {...field}
                  label="Danh mục chính *"
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(e)
                    setValue('subCategory', '')
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

        {/* Sub Category */}
        <Grid item xs={12} md={6}>
          <Controller
            name="subCategory"
            control={control}
            rules={{
              required: isSubCategoryRequired() && availableSubCategories.length > 0 
                ? FIELD_REQUIRED_MESSAGE 
                : false
            }}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={!!errors.subCategory}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2 
                  } 
                }}
                disabled={!watchMainCategory || availableSubCategories.length === 0}
              >
                <InputLabel>
                  Danh mục phụ {isSubCategoryRequired() && availableSubCategories.length > 0 ? '*' : ''}
                </InputLabel>
                <Select
                  {...field}
                  label={`Danh mục phụ ${isSubCategoryRequired() && availableSubCategories.length > 0 ? '*' : ''}`}
                  value={field.value || ''}
                >
                  {availableSubCategories.length > 0 ? (
                    availableSubCategories.map((subCat) => (
                      <MenuItem key={subCat} value={subCat}>
                        {subCat}
                      </MenuItem>
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

        {/* Brand */}
        <Grid item xs={12}>
          <Controller
            name="brand"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <FormControl 
                fullWidth 
                error={!!errors.brand}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2 
                  } 
                }}
              >
                <InputLabel>Thương hiệu *</InputLabel>
                <Select
                  {...field}
                  label="Thương hiệu *"
                  value={field.value || ''}
                >
                  {BRANDS.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      <Chip 
                        label={brand} 
                        size="small" 
                        variant="outlined" 
                        sx={{ 
                          borderColor: '#ff5722', 
                          color: '#ff5722' 
                        }} 
                      />
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
  )
}

export default CategorySection