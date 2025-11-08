import React from 'react'
import { Breadcrumbs, Link, Typography } from '@mui/material'

const BreadcrumbSection = ({ product }) => {
  return (
    <Breadcrumbs sx={{ mb: 3 }}>
      <Link
        color="inherit"
        href="/"
        sx={{ cursor: 'pointer', '&:hover': { color: '#ff5722' } }}
      >
        Trang chủ
      </Link>
      <Link
        color="inherit"
        sx={{ cursor: 'pointer', '&:hover': { color: '#ff5722' } }}
      >
        {product.mainCategory}
      </Link>
      <Typography color="text.primary">{product.name}</Typography>
    </Breadcrumbs>
  )
}

export default BreadcrumbSection