import React from 'react'
import { Controller } from 'react-hook-form'
import { 
  Grid, 
  TextField, 
  Paper, 
  Box, 
  Typography, 
  InputAdornment 
} from '@mui/material'
import { Inventory, Scale } from '@mui/icons-material'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { 
  MIN_NAME_LENGTH, 
  MAX_NAME_LENGTH, 
  MIN_DESCRIPTION_LENGTH, 
  MAX_DESCRIPTION_LENGTH,
  MIN_QUANTIFICATION_LENGTH,
  MAX_QUANTIFICATION_LENGTH,
  VALIDATION_MESSAGES 
} from '~/constants/productForm'

const BasicInfoSection = ({ control, errors }) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 3, background: 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Inventory sx={{ color: '#ff5722', fontSize: 28 }} />
        <Typography variant="h5" fontWeight={700}>THÔNG TIN CƠ BẢN</Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Product Name */}
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: VALIDATION_MESSAGES.NAME_REQUIRED,
              minLength: { 
                value: MIN_NAME_LENGTH, 
                message: VALIDATION_MESSAGES.NAME_MIN 
              },
              maxLength: { 
                value: MAX_NAME_LENGTH, 
                message: VALIDATION_MESSAGES.NAME_MAX 
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Tên sản phẩm *"
                error={!!errors.name}
                helperText={`${field.value?.length || 0}/${MAX_NAME_LENGTH}`}
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2 
                  } 
                }}
              />
            )}
          />
          <FieldErrorAlert errors={errors} fieldName="name" />
        </Grid>

        {/* Quantification */}
        <Grid item xs={12}>
          <Controller
            name="quantification"
            control={control}
            rules={{
              required: VALIDATION_MESSAGES.QUANTIFICATION_REQUIRED,
              minLength: { 
                value: MIN_QUANTIFICATION_LENGTH, 
                message: VALIDATION_MESSAGES.QUANTIFICATION_MIN 
              },
              maxLength: { 
                value: MAX_QUANTIFICATION_LENGTH, 
                message: VALIDATION_MESSAGES.QUANTIFICATION_MAX 
              }
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
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2 
                  } 
                }}
              />
            )}
          />
          <FieldErrorAlert errors={errors} fieldName="quantification" />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            rules={{
              required: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
              minLength: { 
                value: MIN_DESCRIPTION_LENGTH, 
                message: VALIDATION_MESSAGES.DESCRIPTION_MIN 
              },
              maxLength: { 
                value: MAX_DESCRIPTION_LENGTH, 
                message: VALIDATION_MESSAGES.DESCRIPTION_MAX 
              }
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
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2 
                  } 
                }}
              />
            )}
          />
          <FieldErrorAlert errors={errors} fieldName="description" />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default BasicInfoSection