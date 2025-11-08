// src/components/Admin/ProductManagement/components/ProductTableRow.jsx
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
import { Edit, Delete } from '@mui/icons-material'

const ProductTableRow = ({ product, onEdit, onDelete }) => {
  // Format price từ API
  const formatPrice = (priceObj) => {
    if (!priceObj) return '0₫'
    return `${priceObj.current?.toLocaleString() || '0'}₫`
  }

  // Format stock status từ API
  const getStockStatus = (stockObj) => {
    return stockObj?.status || 'in_stock'
  }

  // Format stock quantity từ API
  const getStockQuantity = (stockObj) => {
    return stockObj?.quantity || 0
  }

  const getStockStatusColor = (status) => {
    const colors = {
      in_stock: 'success',
      out_of_stock: 'error',
      low_stock: 'warning',
      discontinued: 'default'
    }
    return colors[status] || 'default'
  }

  const getStockStatusText = (status) => {
    const texts = {
      in_stock: 'Còn hàng',
      out_of_stock: 'Hết hàng',
      low_stock: 'Sắp hết',
      discontinued: 'Ngừng kinh doanh'
    }
    return texts[status] || status
  }

  return (
    <TableRow key={product._id} hover>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={product.images}
            variant="rounded"
            sx={{ width: 50, height: 50 }}
          >
            {product.name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {product.name || 'Chưa có tên'}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {product.mainCategory || 'Chưa phân loại'}
          </Typography>
          {product.subCategory && (
            <Typography variant="body2" color="textSecondary" fontSize="12px">
              {product.subCategory}
            </Typography>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={product.brand || 'Không có thương hiệu'}
          size="small"
          variant="outlined"
        />
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="body2" fontWeight={700} color="#ff5722">
            {formatPrice(product.price.current)}
          </Typography>
          {product.price?.discount > 0 && (
            <Typography variant="body2" color="textSecondary" fontSize="12px" sx={{ textDecoration: 'line-through' }}>
              {product.price.original?.toLocaleString()}₫
            </Typography>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {getStockQuantity(product.stock)} sản phẩm
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={getStockStatusText(getStockStatus(product.stock))}
          color={getStockStatusColor(getStockStatus(product.stock))}
          size="small"
        />
      </TableCell>
      <TableCell align="center">
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <IconButton
            color="primary"
            onClick={() => onEdit(product)}
            size="small"
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => onDelete(product._id)}
            size="small"
          >
            <Delete />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default ProductTableRow