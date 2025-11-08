// src/components/Admin/ProductManagement/components/TableHeader.jsx
import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Add } from '@mui/icons-material'

const TableHeader = ({ onAddProduct }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h4" fontWeight={700}>
        Quản lý sản phẩm
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onAddProduct}
        sx={{
          backgroundColor: '#ff5722',
          '&:hover': { backgroundColor: '#e65100' }
        }}
      >
        Thêm sản phẩm
      </Button>
    </Box>
  )
}

export default TableHeader