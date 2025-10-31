import React, { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import { 
  Typography, 
  Button, 
  TextField, 
  InputAdornment, 
  Tooltip, 
  Badge, 
  IconButton,
  Chip,
  Fade
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MenuIcon from '@mui/icons-material/Menu'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import PhoneIcon from '@mui/icons-material/Phone'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { selectCurrentCart } from '~/redux/cart/cartSlice'
import Profiles from './Menus/Profiles'
import CartPopover from './Menus/CartPopover'
import logo from '~/assets/logo.png'

function Hearder() {
  const [showCartPopover, setShowCartPopover] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const cartPopoverRef = useRef(null)
  const cartIconRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  
  const currentUser = useSelector(selectCurrentUser)
  const currentCart = useSelector(selectCurrentCart)
  
  const [searchValue, setSearchValue] = useState('')
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
    // if (!currentCart?.items || currentCart.items.length === 0) return 0
    // reduce((total, item) => total + item.quantity, 0)
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
      // navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`)
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

  // Hotline và promotion info
  const hotline = '1900 1234'
  const promotionText = '🔥 FREESHIP ĐƠN TỪ 500K'

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1200,
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
      {/* --- LEFT SECTION: LOGO + MENU --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        <IconButton
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
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
                objectFit: 'contain',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '1.4rem',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                LACU MART
              </Typography>
              <Chip
                label={promotionText}
                size="small"
                sx={{
                  height: '20px',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#ff5722'
                }}
              />
            </Box>
          </Box>
        </Link>
      </Box>

      {/* --- CENTER SECTION: SEARCH BAR --- */}
      <Box sx={{
        display: showMobileSearch ? 'flex' : { xs: 'none', md: 'flex' },
        alignItems: 'center',
        flex: 1,
        maxWidth: { md: '500px', lg: '600px' },
        mx: { xs: 1, sm: 2 },
        position: 'relative'
      }}>
        <TextField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleSearch}
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
          placeholder="Tìm kiếm sản phẩm, thương hiệu..."
          type="text"
          size="small"
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '25px',
                borderWidth: '2px'
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
                borderWidth: '2px'
              },
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
            },
            '& input': {
              color: 'white',
              fontWeight: '500',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.8)',
                opacity: 1
              }
            },
          }}
        />
        
        {/* Search suggestions sẽ xuất hiện ở đây */}
      </Box>

      {/* --- RIGHT SECTION: ICONS & BUTTONS --- */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 2 },
        paddingRight: '10px'
      }}>
        {/* Hotline - Desktop */}
        <Tooltip title={`Hotline: ${hotline}`}>
          <Box sx={{ 
            display: { xs: 'none', lg: 'flex' }, 
            alignItems: 'center', 
            gap: 0.5,
            color: 'white',
            cursor: 'pointer'
          }}>
            <PhoneIcon fontSize="small" />
            <Typography variant="body2" fontWeight="bold">
              {hotline}
            </Typography>
          </Box>
        </Tooltip>

        {/* Mobile Search Toggle */}
        <IconButton
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <SearchIcon />
        </IconButton>

        {showMobileSearch && (
          <IconButton
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
            onClick={() => setShowMobileSearch(false)}
          >
            <CloseIcon />
          </IconButton>
        )}

        {/* Wishlist */}
        {currentUser && (
          <Tooltip title="Yêu thích">
            <IconButton 
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
              // onClick={() => navigate('/wishlist')}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
        )}

        {/* Notifications */}
        {currentUser && (
          <Tooltip title="Thông báo">
            <Badge 
              badgeContent={3} 
              color="warning"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <IconButton 
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <NotificationsNoneIcon />
              </IconButton>
            </Badge>
          </Tooltip>
        )}

        {/* Help */}
        <Tooltip title="Trợ giúp">
          <IconButton 
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
            // onClick={() => navigate('/help')}
          >
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>

        {/* Cart */}
        {currentUser && (
          <Tooltip title="Giỏ hàng">
            <Badge
              badgeContent={getTotalCartItems()}
              color="warning"
              ref={cartIconRef}
              onClick={handleToggleCartPopover}
              sx={{ 
                cursor: 'pointer',
                '& .MuiBadge-badge': {
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  minWidth: '20px',
                  height: '20px',
                  transform: 'scale(1) translate(50%, -50%)'
                },
                '&:hover': {
                  '& .MuiBadge-badge': {
                    transform: 'scale(1.1) translate(50%, -50%)',
                    transition: 'transform 0.2s ease'
                  }
                }
              }}
            >
              <LocalMallOutlinedIcon 
                sx={{ 
                  color: 'white',
                  fontSize: '1.4rem'
                }} 
              />
            </Badge>
          </Tooltip>
        )}

        {/* Cart Popover */}
        <Fade in={showCartPopover}>
          <Box
            ref={cartPopoverRef}
            sx={{
              position: 'absolute',
              top: '100%',
              right: 23,
              width: { xs: '320px', sm: '400px' },
              maxWidth: '90vw',
              backgroundColor: 'white',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              borderTop: '3px solid #ff5722',
              zIndex: 999,
              maxHeight: 'calc(100vh - 120px)',
              borderRadius: '0 0 12px 12px',
              overflow: 'hidden',
              display: showCartPopover ? 'block' : 'none'
            }}
          >
            <CartPopover
              showMenu={showCartPopover}
              onClose={handleCloseCartPopover}
              cartTotal={getCartTotal()}
              itemCount={getTotalCartItems()}
            />
          </Box>
        </Fade>

        {/* Login/Register Button */}
        {!currentUser && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  width: { xs: 'auto', sm: '100px' },
                  height: { xs: '36px', sm: '40px' },
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    background: 'white',
                    color: '#ff5722',
                    transform: 'translateY(-1px)'
                  },
                  borderRadius: '20px',
                  px: { xs: 2, sm: 2 },
                  transition: 'all 0.3s ease',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  fontWeight: 'bold'
                }}
              >
                Đăng nhập
              </Button>
            </Link>
            
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  width: { xs: 'auto', sm: '100px' },
                  height: { xs: '36px', sm: '40px' },
                  background: 'white',
                  color: '#ff5722',
                  border: 'none',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(255, 87, 34, 0.3)'
                  },
                  borderRadius: '20px',
                  px: { xs: 2, sm: 2 },
                  transition: 'all 0.3s ease',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  fontWeight: 'bold',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Đăng ký
              </Button>
            </Link>
          </Box>
        )}
        
        {/* User Profile */}
        {currentUser && <Profiles />}
      </Box>
    </Box>
  )
}

export default Hearder