import React from 'react'
import { Box, Typography, IconButton, Chip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import logo from '~/assets/logo.png'

const LeftSection = ({ showMobileSearch, promotionText }) => {
  return (
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
  )
}

export default LeftSection