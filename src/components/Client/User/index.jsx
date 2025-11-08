// UserProfile.js
import React from 'react'
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  Alert,
  Snackbar
} from '@mui/material'
import { Edit, Save, Cancel } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Hearder from '~/components/Client/Header'
import Footer from '~/components/Client/Footer/Footer'

// Import components và hook
import { useUserProfileForm } from '~/hooks/user/useUserProfileForm'
import AvatarSection from '~/components/Client/User/components/AvatarSection'
import ProfileForm from '~/components/Client/User/components/ProfileForm'
import AccountInfo from '~/components/Client/User/components/AccountInfo'
import Preferences from '~/components/Client/User/components/Preferences'

const UserProfile = () => {
  const currentUser = useSelector(selectCurrentUser)

  const {
    editMode,
    setEditMode,
    snackbar,
    setSnackbar,
    formData,
    currentGender,
    register,
    errors,
    handlePreferenceChange,
    handleAvatarChange,
    handleSave,
    handleCancel,
    getAvatarUrl
  } = useUserProfileForm()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Hearder />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: 'primary.main',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Thông Tin Cá Nhân
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Quản lý thông tin tài khoản và cài đặt cá nhân
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column - Profile Information */}
          <Grid item xs={12} md={8}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>

              <CardContent sx={{ p: 4 }}>
                {/* Header với button Edit/Save */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <Typography variant="h5" fontWeight="bold">
                    Thông Tin Cá Nhân
                  </Typography>

                  {!editMode ? (
                    <Button
                      startIcon={<Edit />}
                      onClick={() => setEditMode(true)}
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    >
                      Chỉnh Sửa
                    </Button>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        startIcon={<Cancel />}
                        onClick={handleCancel}
                        variant="outlined"
                        color="inherit"
                        sx={{ borderRadius: 2 }}
                      >
                        Hủy
                      </Button>
                      <Button
                        startIcon={<Save />}
                        onClick={handleSave} // Đây là handleSubmit từ useForm
                        variant="contained"
                        sx={{
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #ff5722, #ff8c42)'
                        }}
                      >
                        Lưu Thay Đổi
                      </Button>
                    </Box>
                  )}
                </Box>

                <Divider sx={{ mb: 4 }} />

                {/* Avatar Section */}
                <AvatarSection
                  editMode={editMode}
                  avatarUrl={getAvatarUrl()}
                  displayName={formData.displayName}
                  onAvatarChange={handleAvatarChange}
                />

                {/* Form Fields sử dụng useForm */}
                <ProfileForm
                  editMode={editMode}
                  register={register}
                  errors={errors}
                  currentGender={currentGender}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Additional Info & Preferences */}
          <Grid item xs={12} md={4}>
            <AccountInfo currentUser={currentUser} />
            {/* <Preferences
              editMode={editMode}
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
            /> */}
          </Grid>
        </Grid>
      </Container>

      <Footer />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default UserProfile