import React, { useEffect, useState } from 'react'
import Hearder from '~/components/Client/Header'
import Footer from '~/components/Client/Footer/Footer'
import { Box, Container } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentProduct,
  fetchProductByIdAPI
} from '~/redux/product/productSlice'
import { addItemToCartApi } from '~/redux/cart/cartSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'

import BreadcrumbSection from '~/components/Client/Item/components/ProductDetail/components/BreadcrumbSection'
import ProductImagesSection from '~/components/Client/Item/components/ProductDetail/components/ProductImagesSection'
import ProductInfoSection from '~/components/Client/Item/components/ProductDetail/components/ProductInfoSection'
import ProductDescriptionTabs from '~/components/Client/Item/components/ProductDetail/components/ProductDescriptionTabs'
import { Grid, Typography } from '@mui/material'
function ProductDetail() {
  const { productName } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const product = useSelector(selectCurrentProduct)
  const [selectedImage, setSelectedImage] = useState(0)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    if (productName) {
      dispatch(fetchProductByIdAPI(productName))
    }
  }, [productName, dispatch])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleAddToCart = (e) => {
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

  const handleBuyNow = (e) => {
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
    navigate(`/cartDetail/${currentUser._id}`)
  }

  if (!product) {
    return (
      <Box>
        <Hearder />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Typography variant="h5">Đang tải sản phẩm...</Typography>
        </Box>
        <Footer />
      </Box>
    )
  }

  // Mock images array
  const productImages = [
    product.images,
    product.images,
    product.images,
    product.images
  ]

  return (
    <Box sx={{
      backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex',
      flexDirection: 'column'
    }}>
      <Hearder />

      {/* Main Content */}
      <Container maxWidth="xl" sx={{
        py: { xs: 8, sm: 12, md: 20 },   // padding top/bottom responsive
        position: 'relative',
        flexGrow: 1                     // để Container chiếm khoảng trống chính giữa Header và Footer
      }}>
        <BreadcrumbSection product={product} />

        <Grid container spacing={4}>
          <ProductImagesSection
            product={product}
            productImages={productImages}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
          />

          <ProductInfoSection
            product={product}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </Grid>

        <ProductDescriptionTabs
          product={product}
          tabValue={tabValue}
          onTabChange={handleTabChange}
        />
      </Container>

      <Footer />
    </Box>
  )
}

export default ProductDetail