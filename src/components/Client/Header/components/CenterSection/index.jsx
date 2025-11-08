import React from 'react'
import { Box, TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

const CenterSection = ({ 
  searchValue, 
  setSearchValue, 
  showMobileSearch, 
  setShowMobileSearch, 
  onSearch 
}) => {
  return (
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
        onKeyPress={onSearch}
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
  )
}

export default CenterSection