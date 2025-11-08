import React, { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Fade } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { selectCurrentCart } from '~/redux/cart/cartSlice'

import LeftSection from './components/LeftSection'
import CenterSection from './components/CenterSection'
import RightSection from './components/RightSection'

function Header() {
  const [showCartPopover, setShowCartPopover] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const cartPopoverRef = useRef(null)
  const cartIconRef = useRef(null)
  
  const currentUser = useSelector(selectCurrentUser)
  const currentCart = useSelector(selectCurrentCart)

  // Hiệu ứng scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const getTotalCartItems = () => {
    return currentCart?.items.length 
  }

  // Tính tổng giá trị giỏ hàng
  const getCartTotal = () => {
    if (!currentCart?.items || currentCart.items.length === 0) return 0
    return currentCart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      setSearchValue('')
      setShowMobileSearch(false)
    }
  }

  // Xử lý mở/đóng cart popover
  const handleToggleCartPopover = () => {
    setShowCartPopover(!showCartPopover)
  }

  // Xử lý đóng cart popover
  const handleCloseCartPopover = () => {
    setShowCartPopover(false)
  }

  // Xử lý click outside để đóng popovers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartPopoverRef.current && 
        !cartPopoverRef.current.contains(event.target) &&
        cartIconRef.current && 
        !cartIconRef.current.contains(event.target)
      ) {
        setShowCartPopover(false)
      }
    }

    if (showCartPopover) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCartPopover])

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        zIndex: 1100,
        boxShadow: scrolled ? 3 : 1,
        width: '100%',
        height: (theme) => theme.trelloCustom.headerHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: { xs: 1, sm: 2 },
        px: { xs: 2, sm: 3 },
        backgroundImage: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #e65100, #ff5722)'
            : 'linear-gradient(135deg, #ff8c42, #ff6f61)',
        borderBottom: (theme) =>
          theme.palette.mode === 'light'
            ? '1px solid rgba(255, 140, 66, 0.3)'
            : '1px solid rgba(255, 87, 34, 0.2)',
        transition: 'all 0.4s ease',
      }}
    >
      <LeftSection 
        showMobileSearch={showMobileSearch}
        promotionText="🔥 FREESHIP ĐƠN TỪ 500K"
      />

      <CenterSection 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        showMobileSearch={showMobileSearch}
        setShowMobileSearch={setShowMobileSearch}
        onSearch={handleSearch}
      />

      <RightSection
        currentUser={currentUser}
        showCartPopover={showCartPopover}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        cartPopoverRef={cartPopoverRef}
        cartIconRef={cartIconRef}
        onToggleCartPopover={handleToggleCartPopover}
        onCloseCartPopover={handleCloseCartPopover}
        totalCartItems={getTotalCartItems()}
        cartTotal={getCartTotal()}
        hotline="1900 1234"
      />
    </Box>
  )
}

export default Header