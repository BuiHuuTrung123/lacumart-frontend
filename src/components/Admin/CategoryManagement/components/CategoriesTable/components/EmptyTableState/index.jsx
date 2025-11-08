// src/components/Admin/CategoryManagement/components/EmptyTableState.jsx
import React from 'react'
import { TableRow, TableCell, Box, Typography, Button } from '@mui/material'
import { Add, Category } from '@mui/icons-material'

const EmptyTableState = ({ onAddCategory }) => {
  return (
    <TableRow>
      <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
          <Category sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" gutterBottom>
            Chưa có danh mục nào
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Hãy thêm danh mục đầu tiên để bắt đầu
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onAddCategory}
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' }
            }}
          >
            Thêm danh mục đầu tiên
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default EmptyTableState