// src/components/Admin/CategoryManagement/components/CategoryTableRow.jsx
import React from 'react'
import {
  TableRow,
  TableCell,
  Box,
  Avatar,
  Typography,
  Chip,
  IconButton,
} from '@mui/material'
import { Edit, Delete, Category } from '@mui/icons-material'

const CategoryTableRow = ({ category, onEdit, onDelete }) => {
  const getStatusColor = (isActive) => {
    return isActive ? 'success' : 'default'
  }

  const getStatusText = (isActive) => {
    return isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'
  }

  const formatImageUrl = (image) => {
    if (!image) return null
    // Nếu image là full URL thì return luôn, nếu là path thì thêm base URL
    if (image.startsWith('http')) return image
    return `${process.env.REACT_APP_API_URL}${image}`
  }

  return (
    <TableRow 
      key={category._id} 
      hover
      sx={{ 
        '&:last-child td, &:last-child th': { border: 0 },
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: '#f8fafc'
        }
      }}
    >
      <TableCell sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={formatImageUrl(category.image)}
            variant="rounded"
            sx={{ 
              width: 50, 
              height: 50, 
              bgcolor: '#1976d2',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)'
            }}
          >
            {category.image ? null : <Category />}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
              {category.name || 'Chưa có tên'}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
              Slug: {category.slug}
            </Typography>
            <Typography variant="caption" color="textSecondary" sx={{ fontSize: '0.7rem' }}>
              ID: {category._id}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={{ py: 2 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            maxWidth: 300,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {category.description || 'Không có mô tả'}
        </Typography>
      </TableCell>
      <TableCell sx={{ py: 2 }}>
        <Chip
          label={category.displayOrder || 0}
          size="small"
          variant="outlined"
          sx={{ 
            fontWeight: 600,
            borderColor: '#1976d2',
            color: '#1976d2'
          }}
        />
      </TableCell>
      <TableCell sx={{ py: 2 }}>
        <Chip
          label={getStatusText(category.isActive)}
          color={getStatusColor(category.isActive)}
          size="small"
          sx={{ 
            fontWeight: 600,
            minWidth: 120
          }}
        />
      </TableCell>
      <TableCell align="center" sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <IconButton
            color="primary"
            onClick={() => onEdit(category)}
            size="small"
            sx={{
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.15)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => onDelete(category._id)}
            size="small"
            sx={{
              backgroundColor: 'rgba(244, 67, 54, 0.08)',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.15)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default CategoryTableRow