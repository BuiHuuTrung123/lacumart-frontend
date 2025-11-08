// src/components/Admin/CategoryManagement/components/CategoryForm/CategoryFormHeader.jsx
import React from 'react'
import { DialogTitle, Box, Typography } from '@mui/material'
import { Category } from '@mui/icons-material'

const CategoryFormHeader = ({ formTitle, isEditMode }) => {
  return (
    <DialogTitle sx={{
      background: isEditMode ?
        'linear-gradient(135deg, #ed6c02, #ff9800)' :
        'linear-gradient(135deg, #1976d2, #42a5f5)',
      color: 'white',
      textAlign: 'center',
      py: 3
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <Category sx={{ fontSize: 32 }} />
        <Typography variant="h4" fontWeight={800}>
          {formTitle}
        </Typography>
      </Box>
    </DialogTitle>
  )
}

export default CategoryFormHeader