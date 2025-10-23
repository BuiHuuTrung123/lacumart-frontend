import React, { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import { Typography, Button, TextField, InputAdornment, Tooltip, Badge, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { selectCurrentCart } from '~/redux/cart/cartSlice'
import Profiles from './Menus/Profiles'
import CartPopover from './Menus/CartPopover'
import logo from '~/assets/logo.png'

function Header() {
  const [showCartPopover, setShowCartPopover] = useState(false)
  const cartPopoverRef = useRef(null)
  const cartIconRef = useRef(null)
  
  const currentUser = useSelector(selectCurrentUser)
  const currentCart = useSelector(selectCurrentCart)
  
  const [searchValue, setSearchValue] = useState('')
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  // Debug để xem currentCart có thay đổi không
 

  // Tính tổng số lượng sản phẩm trong giỏ hàng từ Redux
  const getTotalCartItems = () => {
    if (!currentCart?.items || currentCart.items.length === 0) return 0
    
    const total = currentCart.items.reduce((total, item) => {
      return total + (item.quantity || 1)
    }, 0)
    
    console.log('Calculated total:', total) // Debug
    return total
  }

  // Xử lý mở/đóng cart popover khi click
  const handleToggleCartPopover = () => {
    setShowCartPopover(!showCartPopover)
  }

  // Xử lý đóng cart popover
  const handleCloseCartPopover = () => {
    setShowCartPopover(false)
  }

  // Xử lý click outside để đóng cart popover
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
        position: 'sticky',
        top: 0,
        zIndex: 1200,
        boxShadow: 1,
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
      {/* --- LEFT SECTION: LOGO + MENU --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        <IconButton
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: 'white'
          }}
        >
          <MenuIcon />
        </IconButton>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                height: '90px',
                width: '90px',
                objectFit: 'contain'
              }}
            />
            <Typography
              variant="span"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 'bold',
                color: 'white',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              LACU MART
            </Typography>
          </Box>
        </Link>
      </Box>

      {/* --- CENTER SECTION: SEARCH BAR --- */}
      <Box sx={{
        display: showMobileSearch ? 'flex' : { xs: 'none', md: 'flex' },
        alignItems: 'center',
        flex: 1,
        maxWidth: { md: '500px', lg: '600px' },
        mx: { xs: 1, sm: 2 }
      }}>
        <TextField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment position="end">
                <CloseIcon
                  onClick={() => setSearchValue('')}
                  fontSize="small"
                  sx={{
                    color: '#bdc3c7',
                    cursor: 'pointer',
                    '&:hover': { color: 'white' }
                  }}
                />
              </InputAdornment>
            ),
          }}
          placeholder="Bạn cần tìm gì?"
          type="text"
          size="small"
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '12px',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& input': {
              color: 'white',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.8)',
                opacity: 1
              }
            },
          }}
        />
      </Box>

      {/* --- RIGHT SECTION: ICONS & BUTTONS --- */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 2 },
        paddingRight: '10px'
      }}>
        <IconButton
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: 'white'
          }}
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <SearchIcon />
        </IconButton>

        {showMobileSearch && (
          <IconButton
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: 'white'
            }}
            onClick={() => setShowMobileSearch(false)}
          >
            <CloseIcon />
          </IconButton>
        )}

        {/* Cart - SỬA QUAN TRỌNG: Đảm bảo component re-render */}
        {currentUser && (
          <Tooltip title="Giỏ hàng">
            <Badge
              // badgeContent={getTotalCartItems()}
              color="warning"
              ref={cartIconRef}
              onClick={handleToggleCartPopover}
              sx={{ 
                cursor: 'pointer',
                '& .MuiBadge-badge': {
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  minWidth: '18px',
                  height: '18px',
                  transform: 'scale(1) translate(50%, -50%)'
                }
              }}
            >
              <LocalMallOutlinedIcon sx={{ color: 'white' }} />
            </Badge>
          </Tooltip>
        )}

        {showCartPopover && (
          <Box
            ref={cartPopoverRef}
            sx={{
              position: 'absolute',
              top: '100%',
              right: 23,
              width: '400px',
              maxWidth: '90vw',
              backgroundColor: 'white',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              borderTop: '3px solid #ff5722',
              zIndex: 999,
              maxHeight: 'calc(100vh - 120px)',
              borderRadius: '0 0 8px 8px',
              overflow: 'hidden'
            }}
          >
            <CartPopover
              showMenu={showCartPopover}
              onClose={handleCloseCartPopover}
            />
          </Box>
        )}

        {!currentUser && (
          <Link to="/login">
            <Button
              sx={{
                width: { xs: 'auto', sm: '140px' },
                height: { xs: '36px', sm: '40px' },
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.18), rgba(20, 20, 20, 0.3))',
                color: 'white',
                border: 'none',
                '&:hover': {
                  color: 'black',
                  background: 'white',
                  transform: 'translateY(-1px)'
                },
                borderRadius: '8px',
                px: { xs: 2, sm: 2 },
                transition: 'all 0.3s ease',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
              startIcon={<PersonOutlineIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
            >
              <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                Đăng nhập
              </Typography>
            </Button>
          </Link>
        )}
        
        {currentUser && <Profiles />}
      </Box>
    </Box>
  )
}

export default Header