// src/components/Admin/CategoryManagement/components/StatsSummary.jsx
import React from 'react'
import { Box, Chip } from '@mui/material'

const StatsSummary = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Chip
        label={`Tổng số: ${categories.length} danh mục`}
        variant="outlined"
        color="primary"
      />
      <Chip
        label={`Đang hoạt động: ${categories.filter(cat => cat.isActive).length}`}
        variant="outlined"
        color="success"
      />
      <Chip
        label={`Ngừng hoạt động: ${categories.filter(cat => !cat.isActive).length}`}
        variant="outlined"
        color="default"
      />
    </Box>
  )
}

export default StatsSummary