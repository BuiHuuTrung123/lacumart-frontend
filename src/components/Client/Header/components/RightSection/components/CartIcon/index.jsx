import React from 'react'
import { Badge, Tooltip } from '@mui/material'
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined'


const CartIcon = ({ cartIconRef, onToggleCartPopover, totalCartItems }) => {
  return (
    <Tooltip title="Giỏ hàng">
      <Badge
        badgeContent={totalCartItems}
        color="warning"
        ref={cartIconRef}
        onClick={onToggleCartPopover}
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
  )
}

export default CartIcon