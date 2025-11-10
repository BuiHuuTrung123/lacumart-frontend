import React from 'react'
import { Card, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import ProductBadges from './components/ProductBadges'
import FavoriteButton from './components/FavoriteButton'
import ProductImage from './components/ProductImage'
import ProductActions from './components/ProductActions'
import ProductContent from './components/ProductContent'
import { addItemToCartApi } from '~/redux/cart/cartSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)

  const handleCardClick = (e) => {
    if (!e.target.closest('.product-actions')) {
      const productId = product.id

      navigate(`/${product.slug}`)
    }
  }

  const handleAddProductToCart = (e) => {
    e.stopPropagation()

    if (!currentUser) {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng')
      return
    }

    const cartData = {
      productId: product.id || product._id,
      quantity: 1,
    }

    dispatch(addItemToCartApi(cartData))
  }

  const handleQuickBuy = (e) => {
    e.stopPropagation()
    if (!currentUser) {
      toast.error('Vui lòng đăng nhập để thêm vào giỏ hàng')
      return
    }

    const cartData = {
      productId: product.id || product._id,
      quantity: 1,
    }

    dispatch(addItemToCartApi(cartData))
    navigate(`/cartDetail`)
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    // Xử lý yêu thích
  }

  if (product.stockStatus === 'out_of_stock') {
    return null
  }

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: {
          xs: 140,
          sm: 160,
          md: 180,
          lg: 200,
          xl: 320
        },
        maxWidth: '100%',
        borderRadius: { xs: 3, sm: 5 },
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08), 0 0 0 1px #f0f0f0',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        cursor: 'pointer',
        border: '1px solid #f0f0f0',
        '&:hover': {
          boxShadow: '0 12px 32px rgba(255, 87, 34, 0.15), 0 0 0 1px #ff5722',
          transform: { xs: 'translateY(-4px)', sm: 'translateY(-6px)' },
        },
        '&:hover .product-actions': {
          opacity: 1,
          transform: 'translateY(0)',
        },
        '&:hover .product-image': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <ProductBadges product={product} />
      
      <FavoriteButton onFavoriteClick={handleFavoriteClick} />
      
      <ProductImage product={product} />
      
      <ProductActions 
        onAddToCart={handleAddProductToCart}
        onQuickBuy={handleQuickBuy}
      />
      
      <ProductContent product={product} />
    </Card>
  )
}

export default ProductCard