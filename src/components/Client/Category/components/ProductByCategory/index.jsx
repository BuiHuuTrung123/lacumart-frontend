import React, { useState, useEffect } from 'react'
import { Container, Box, CircularProgress, Alert } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { addItemToCartApi } from '~/redux/cart/cartSlice'
import { toast } from 'react-toastify'
import Hearder from '~/components/Client/Header'
import Footer from '~/components/Client/Footer/Footer'

import BreadcrumbSection from './components/BreadcrumbSection'
import CategoryHeader from './components/CategoryHeader'
import FiltersAndSort from './components/FiltersAndSort'
import ProductsGrid from './components/ProductsGrid'
import NoProducts from './components/NoProducts'
import Typography from '@mui/material/Typography'
import { useSearchParams } from 'react-router-dom'
const ProductsByCategory = () => {
     const [searchParams] = useSearchParams()
    const categoryName = searchParams.get('name')
    // const { categoryName } = useParams()
console.log(categoryName)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)

    const allProducts = useSelector(state => state.product.products || [])
    
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState('name')
    const [selectedBrands, setSelectedBrands] = useState([])

    const productsPerPage = 12

    useEffect(() => {
        filterProductsByCategory()
    }, [categoryName, allProducts, sortBy, selectedBrands])

    const filterProductsByCategory = () => {
        try {
            setLoading(true)
            
            if (!allProducts || allProducts.length === 0) {
                setFilteredProducts([])
                setLoading(false)
                return
            }

            let filtered = allProducts.filter(product => {
                const productMainCategory = product.mainCategory?.toLowerCase().trim()
                const targetCategory = categoryName?.toLowerCase().trim()
                
                return productMainCategory === targetCategory && !product._destroy
            })

            if (selectedBrands.length > 0) {
                filtered = filtered.filter(product => 
                    product.brand && selectedBrands.includes(product.brand)
                )
            }

            filtered = sortProducts(filtered, sortBy)

            setFilteredProducts(filtered)
            setLoading(false)
        } catch (err) {
            console.error('Lỗi khi lọc sản phẩm:', err)
            setError('Lỗi khi tải sản phẩm')
            setLoading(false)
        }
    }

    const sortProducts = (products, sortType) => {
        const sorted = [...products]
        switch (sortType) {
            case 'price-low':
                return sorted.sort((a, b) => (a.price?.current || 0) - (b.price?.current || 0))
            case 'price-high':
                return sorted.sort((a, b) => (b.price?.current || 0) - (a.price?.current || 0))
            case 'name':
                return sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
            case 'rating':
                return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
            default:
                return sorted
        }
    }

    const handleSortChange = (event) => {
        setSortBy(event.target.value)
        setPage(1)
    }

    const handleBrandFilter = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand) 
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        )
        setPage(1)
    }

    const handleAddToCart = (product, e) => {
        e.stopPropagation()
        
        if (!currentUser) {
            toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng')
            return
        }

        const cartData = {
            productId: product._id,
            quantity: 1,
        }

        dispatch(addItemToCartApi(cartData))
        toast.success('Đã thêm vào giỏ hàng')
    }

    const handleProductClick = (productId) => {
        navigate(`/productDetail/${productId}`)
    }

    const handleQuickBuy = (e) => {
        e.stopPropagation()
    }

    const handleFavoriteClick = (e) => {
        e.stopPropagation()
    }

    const uniqueBrands = [...new Set(filteredProducts.map(product => product.brand).filter(Boolean))]

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    const displayedProducts = filteredProducts.slice(
        (page - 1) * productsPerPage,
        page * productsPerPage
    )

    const categoryInfo = {
        'whey protein': {
            name: 'Whey Protein',
            description: 'Bổ sung protein chất lượng cao cho phát triển cơ bắp',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        'sữa tăng cân': {
            name: 'Sữa Tăng Cân',
            description: 'Hỗ trợ tăng cân, tăng cơ hiệu quả',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        'bcaa amino': {
            name: 'BCAA Amino',
            description: 'Amino acid chuỗi nhánh cho phục hồi cơ bắp',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        'tăng sức mạnh': {
            name: 'Tăng Sức Mạnh',
            description: 'Hỗ trợ tăng sức mạnh và hiệu suất tập luyện',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        },
        'giảm cân': {
            name: 'Giảm Cân',
            description: 'Hỗ trợ giảm cân, đốt mỡ hiệu quả',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        },
        'muscletech': {
            name: 'MuscleTech',
            description: 'Sản phẩm chính hãng từ MuscleTech',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        },
        'vitamin': {
            name: 'Vitamin',
            description: 'Bổ sung vitamin và khoáng chất thiết yếu',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        },
        'phụ kiện': {
            name: 'Phụ Kiện',
            description: 'Phụ kiện hỗ trợ tập luyện thể hình',
            image: '/api/placeholder/800/400',
            color: 'linear-gradient(135deg, #9890e3 0%, #b1f4cf 100%)'
        },
    }

    const currentCategory = categoryInfo[categoryName?.toLowerCase()] || { 
        name: categoryName, 
        description: `Sản phẩm ${categoryName}`,
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
                <Hearder />
                <Container sx={{ py: 4, textAlign: 'center' }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Đang tải sản phẩm...
                    </Typography>
                </Container>
                <Footer />
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
                <Hearder />
                <Container sx={{ py: 4 }}>
                    <Alert severity="error">{error}</Alert>
                </Container>
                <Footer />
            </Box>
        )
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Hearder />
            
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <BreadcrumbSection currentCategory={currentCategory} />
                
                <CategoryHeader 
                    currentCategory={currentCategory}
                    productCount={filteredProducts.length}
                />

                <FiltersAndSort
                    uniqueBrands={uniqueBrands}
                    selectedBrands={selectedBrands}
                    onBrandFilter={handleBrandFilter}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                />

                {displayedProducts.length > 0 ? (
                    <ProductsGrid
                        products={displayedProducts}
                        onProductClick={handleProductClick}
                        onAddToCart={handleAddToCart}
                        onQuickBuy={handleQuickBuy}
                        onFavoriteClick={handleFavoriteClick}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                ) : (
                    <NoProducts 
                        currentCategory={currentCategory}
                        onBackToCategories={() => navigate('/Home')}
                    />
                )}
            </Container>

            <Footer />
        </Box>
    )
}

export default ProductsByCategory