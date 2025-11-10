import React from 'react'
import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const AuthButtons = () => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button
          sx={{
            width: { xs: 'auto', sm: '120px' },
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
            width: { xs: 'auto', sm: '120px' },
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
  )
}

export default AuthButtons