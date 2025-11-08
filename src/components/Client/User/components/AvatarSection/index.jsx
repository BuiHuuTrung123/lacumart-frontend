// components/UserProfile/AvatarSection.js
import React from 'react'
import { Box, Avatar, IconButton, Typography } from '@mui/material'
import { CameraAlt } from '@mui/icons-material'

const AvatarSection = ({ editMode, avatarUrl, displayName, onAvatarChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar
          src={avatarUrl}
          sx={{
            width: 100,
            height: 100,
            fontSize: '2rem',
            bgcolor: 'primary.main',
            border: '4px solid white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
        </Avatar>

        {editMode && (
          <IconButton
            component="label"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
          >
            <CameraAlt />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={onAvatarChange}
            />
          </IconButton>
        )}
      </Box>

      <Box>
        <Typography variant="h6" fontWeight="bold">
          Ảnh Đại Diện
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {editMode
            ? 'Chọn ảnh từ thiết bị của bạn (JPG, PNG, tối đa 5MB)'
            : 'Cập nhật ảnh đại diện của bạn'
          }
        </Typography>
      </Box>
    </Box>
  )
}

export default AvatarSection