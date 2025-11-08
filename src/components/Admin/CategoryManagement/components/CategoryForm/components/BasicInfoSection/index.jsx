// src/components/Admin/CategoryManagement/components/CategoryForm/BasicInfoSection.jsx
import React from 'react'
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  InputAdornment
} from '@mui/material'
import {
  Description,
  Sort,
  Visibility,
  VisibilityOff
} from '@mui/icons-material'
import { Controller } from 'react-hook-form'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { 
  VALIDATION_MESSAGES,
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MAX_DESCRIPTION_LENGTH 
} from '~/constants/categoryForm'

const BasicInfoSection = ({
  control,
  errors
}) => {
  return (
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
  )
}

export default BasicInfoSection