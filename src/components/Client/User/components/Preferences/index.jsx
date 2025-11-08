// components/UserProfile/Preferences.js
import React from 'react'
import { Card, CardContent, Typography, Box, Divider, FormControlLabel, Switch } from '@mui/material'

const Preferences = ({ editMode, preferences, onPreferenceChange }) => {
  const preferenceItems = [
    {
      name: 'emailNotifications',
      label: 'Thông báo qua email',
      checked: preferences.emailNotifications
    },
    {
      name: 'smsNotifications',
      label: 'Thông báo SMS',
      checked: preferences.smsNotifications
    },
    {
      name: 'newsletter',
      label: 'Nhận bản tin',
      checked: preferences.newsletter
    },
    {
      name: 'twoFactorAuth',
      label: 'Xác thực 2 yếu tố',
      checked: preferences.twoFactorAuth
    }
  ]

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Cài Đặt
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {preferenceItems.map((item) => (
            <FormControlLabel
              key={item.name}
              control={
                <Switch
                  checked={item.checked}
                  onChange={onPreferenceChange(item.name)}
                  disabled={!editMode}
                />
              }
              label={item.label}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Preferences