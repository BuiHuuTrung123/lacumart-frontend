import React from 'react'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const MobileSearchToggle = () => {
  return (
    <IconButton
      sx={{
        display: { xs: 'flex', md: 'none' },
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }
      }}
    >
      <SearchIcon />
    </IconButton>
  )
}

export default MobileSearchToggle