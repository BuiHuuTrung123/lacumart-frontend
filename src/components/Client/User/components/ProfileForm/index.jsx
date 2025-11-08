// components/UserProfile/ProfileForm.js
import React from 'react'
import { Grid, TextField, InputAdornment, MenuItem, Typography, Box, FormControl } from '@mui/material'
import { Person, Email, Phone, CalendarToday, LocationOn } from '@mui/icons-material'

const ProfileForm = ({ editMode, register, errors, currentGender }) => {
  // Sửa thành giá trị tiếng Việt để khớp với backend
  const genderOptions = [
    { value: '', label: 'Chọn giới tính' },
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
    { value: 'Khác', label: 'Khác' }
  ]

  const fields = [
    {
      name: 'displayName',
      label: 'Tên hiển thị',
      xs: 12, sm: 6,
      icon: <Person color="action" />,
      disabled: !editMode,
      required: true,
      validation: { required: 'Tên hiển thị là bắt buộc' }
    },
    {
      name: 'email',
      label: 'Email',
      xs: 12, sm: 6,
      icon: <Email color="action" />,
      disabled: true,
      type: 'email'
    },
    {
      name: 'phoneNumber',
      label: 'Số điện thoại',
      xs: 12, sm: 6,
      icon: <Phone color="action" />,
      disabled: !editMode,
      validation: {
        pattern: {
          value: /^[0-9]{10,11}$/,
          message: 'Số điện thoại không hợp lệ'
        }
      }
    },
    {
      name: 'dateOfBirth',
      label: 'Ngày sinh',
      xs: 12, sm: 6,
      type: 'date',
      icon: <CalendarToday color="action" />,
      disabled: !editMode,
      InputLabelProps: { shrink: true }
    }
  ]

  return (
    <Grid container spacing={3}>
      {fields.map((field) => (
        <Grid item xs={field.xs} sm={field.sm} key={field.name}>
          <FormControl fullWidth>
            <TextField
              {...register(field.name, field.validation)}
              fullWidth
              label={field.label}
              disabled={field.disabled}
              type={field.type}
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message}
              InputProps={{
                startAdornment: field.icon ? (
                  <InputAdornment position="start">
                    {field.icon}
                  </InputAdornment>
                ) : undefined,
              }}
              InputLabelProps={field.InputLabelProps}
              sx={{ mb: 2 }}
            />
          </FormControl>
        </Grid>
      ))}
      
      {/* Field giới tính - đặt trước địa chỉ */}
      <Grid item xs={12} sm={6}>
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <TextField
              {...register('gender')}
              select
              fullWidth
              label="Giới tính"
              disabled={!editMode}
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          {/* Hiển thị current gender khi không ở chế độ edit */}
          {!editMode && currentGender && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mt: 1, ml: 1 }}
            >
              Hiện tại: {currentGender}
            </Typography>
          )}
        </Box>
      </Grid>

      {/* Field địa chỉ - đặt cuối cùng */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            {...register('address')}
            fullWidth
            label="Địa chỉ"
            disabled={!editMode}
            multiline
            rows={3}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default ProfileForm