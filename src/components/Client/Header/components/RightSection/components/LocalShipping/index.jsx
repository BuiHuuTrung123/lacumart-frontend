import React from 'react'
import { IconButton, Tooltip } from '@mui/material'

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom'
const LocalShipping = () => {
   const navigate = useNavigate()
    const handleViewOrder = () => {
      navigate('/order/follow')
      console.log('aa')
    }
  return (
    <Tooltip title="Đơn hàng">
      <IconButton
        onClick={() => handleViewOrder()}
        sx={{
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <LocalShippingIcon />
      </IconButton>
    </Tooltip>
  )
}

export default LocalShipping