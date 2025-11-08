import React from 'react'
import { Badge, IconButton, Tooltip } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'


const NotificationsIcon = ({ showNotifications, setShowNotifications }) => {
  return (
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
  )
}

export default NotificationsIcon