import React, { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { Typography, Button, TextField, InputAdornment, Tooltip, Badge, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import logo from '~/assets/logo.png'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Profiles from './Menus/Profiles'
function Header() {
  const currentUser = useSelector(selectCurrentUser)
  const [searchValue, setSearchValue] = useState('')
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
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
        {/* Mobile Menu Button */}
        <IconButton
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: 'white'
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img
              src={logo}
              alt="Logo"
              style={{
                height: '40px',
                width: '40px',
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

        {/* Desktop Apps Icon */}
        <Link to="/boards">
          <Tooltip title="Board list">
            <AppsIcon sx={{
              color: 'white',
              display: { xs: 'none', md: 'block' }
            }} />
          </Tooltip>
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
        gap: { xs: 1, sm: 2 }
      }}>
        {/* Mobile Search Toggle */}
        <IconButton
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: 'white'
          }}
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <SearchIcon />
        </IconButton>

        {/* Close Mobile Search */}
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

        {/* Theme Toggle */}
        {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <ModeSelect />
        </Box> */}

        {/* Cart */}
        <Tooltip title="Giỏ hàng">
          <Badge
            badgeContent={0}
            color="warning"
            sx={{ cursor: 'pointer' }}
          >
            <LocalMallOutlinedIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>

        {/* Login Button */}
         {!currentUser && 
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
        }
        {currentUser && < Profiles />}



      </Box>
    </Box>
  )
}

export default Header