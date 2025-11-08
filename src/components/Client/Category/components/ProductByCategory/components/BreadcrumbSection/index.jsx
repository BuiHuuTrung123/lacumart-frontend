import React from 'react'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import { NavigateNext, Home, Category as CategoryIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const BreadcrumbSection = ({ currentCategory }) => {
    const navigate = useNavigate()

    return (
        <Breadcrumbs 
            separator={<NavigateNext fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ mb: 4 }}
        >
            <Link
                key="home"
                underline="hover"
                color="inherit"
                href="/"
                onClick={(e) => {
                    e.preventDefault()
                    navigate('/')
                }}
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                Trang chủ
            </Link>
            <Link
                key="categories"
                underline="hover"
                color="inherit"
                href="/categories"
                onClick={(e) => {
                    e.preventDefault()
                    navigate('/categories')
                }}
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <CategoryIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Danh mục
            </Link>
            <Typography key="current-category" color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                {currentCategory.name}
            </Typography>
        </Breadcrumbs>
    )
}

export default BreadcrumbSection