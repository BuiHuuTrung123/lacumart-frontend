// components/UserProfile/AccountInfo.js
import React from 'react'
import { Card, CardContent, Typography, Box, Divider, Chip } from '@mui/material'

const AccountInfo = ({ currentUser }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Chưa cập nhật'
    return new Date(timestamp).toLocaleDateString('vi-VN')
  }

  const infoItems = [
    {
      label: 'Tên đăng nhập:',
      value: currentUser?.username,
      component: 'text'
    },
    {
      label: 'Số điện thoại:',
      value: currentUser?.phoneNumber || currentUser?.phone || 'Chưa cập nhật', // Hiển thị cả phoneNumber và phone
      component: 'text'
    },
    {
      label: 'Vai trò:',
      value: currentUser?.role === 'client' ? 'Khách hàng' : currentUser?.role,
      component: 'chip',
      color: 'primary'
    },
    {
      label: 'Trạng thái:',
      value: currentUser?.isActive ? 'Đang hoạt động' : 'Đã khóa',
      component: 'chip',
      color: currentUser?.isActive ? 'success' : 'error'
    },
    {
      label: 'Ngày tham gia:',
      value: formatDate(currentUser?.createdAt),
      component: 'text'
    }
  ]

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 8px 40px rgba(0,0,0,0.08)', mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Thông Tin Tài Khoản
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {infoItems.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">{item.label}</Typography>
              {item.component === 'chip' ? (
                <Chip
                  label={item.value}
                  size="small"
                  color={item.color}
                />
              ) : (
                <Typography variant="body2" fontWeight="medium">
                  {item.value}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default AccountInfo