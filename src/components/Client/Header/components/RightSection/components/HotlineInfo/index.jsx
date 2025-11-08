import React from 'react'
import { Box, Typography, Tooltip } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'

const HotlineInfo = ({ hotline }) => {
  return (
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
  )
}

export default HotlineInfo