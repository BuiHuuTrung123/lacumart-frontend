import React from 'react'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const BreadcrumbSection = ({ product }) => {
  const navigate = useNavigate()
  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName.toLowerCase())}`)
  }
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
        onClick={() => handleCategoryClick(product.mainCategory)}
        sx={{ cursor: 'pointer', '&:hover': { color: '#ff5722' } }}
      >
        {product.mainCategory}
      </Link>
      <Typography color="text.primary">{product.name}</Typography>
    </Breadcrumbs>
  )
}

export default BreadcrumbSection