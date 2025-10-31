// UserProfile.js
import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Avatar,
    Divider,
    Paper,
    Switch,
    FormControlLabel,
    Alert,
    Snackbar,
    InputAdornment,
    IconButton,
    Chip,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Edit,
    Save,
    Cancel,
    CameraAlt,
    Email,
    Phone,
    LocationOn,
    CalendarToday,
    Person,
    Security,
    Notifications,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '~/redux/user/userSlice';
import Hearder from '~/components/Client/Hearder/Hearder';
import Footer from '~/components/Client/Footer/Footer';
import { useSearchParams, useNavigate } from 'react-router-dom'

const UserProfile = () => {
    const navigate = useNavigate()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [avatarPreview, setAvatarPreview] = useState(null);

    // Form state với các trường mặc định
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        avatar: null
    });

    // Preferences state
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        smsNotifications: false,
        newsletter: true,
        twoFactorAuth: false
    });

    // Load user data khi component mount
    useEffect(() => {
        if (currentUser) {
            setFormData({
                displayName: currentUser.displayName || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                address: currentUser.address || '',
                dateOfBirth: currentUser.dateOfBirth || '',
                gender: currentUser.gender || '',
                avatar: currentUser.avatar || null
            });

            setPreferences({
                emailNotifications: currentUser.preferences?.emailNotifications ?? true,
                smsNotifications: currentUser.preferences?.smsNotifications ?? false,
                newsletter: currentUser.preferences?.newsletter ?? true,
                twoFactorAuth: currentUser.preferences?.twoFactorAuth ?? false
            });
        }
    }, [currentUser]);

    const handleInputChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handlePreferenceChange = (field) => (event) => {
        setPreferences(prev => ({
            ...prev,
            [field]: event.target.checked
        }));
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setSnackbar({
                    open: true,
                    message: 'Kích thước ảnh không được vượt quá 5MB',
                    severity: 'error'
                });
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target.result);
                setFormData(prev => ({
                    ...prev,
                    avatar: file
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            // Validation
            if (!formData.displayName.trim()) {
                setSnackbar({
                    open: true,
                    message: 'Tên hiển thị không được để trống',
                    severity: 'error'
                });
                return;
            }

            if (!formData.email.trim()) {
                setSnackbar({
                    open: true,
                    message: 'Email không được để trống',
                    severity: 'error'
                });
                return;
            }

            // Prepare update data
            const updateData = {
                displayName: formData.displayName,
                phone: formData.phone,
                address: formData.address,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                preferences: preferences
            };

            // If avatar changed, include it
            if (formData.avatar && typeof formData.avatar !== 'string') {
                updateData.avatar = formData.avatar;
            }

            // Dispatch update action
            //   await dispatch(updateUserProfile({
            //     userId: currentUser._id,
            //     updateData
            //   })).unwrap();

            setSnackbar({
                open: true,
                message: 'Cập nhật thông tin thành công!',
                severity: 'success'
            });
            setEditMode(false);

        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Có lỗi xảy ra khi cập nhật thông tin',
                severity: 'error'
            });
        }
    };

    const handleCancel = () => {
        // Reset form to original data
        if (currentUser) {
            setFormData({
                displayName: currentUser.displayName || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                address: currentUser.address || '',
                dateOfBirth: currentUser.dateOfBirth || '',
                gender: currentUser.gender || '',
                avatar: currentUser.avatar || null
            });
            setAvatarPreview(null);
        }
        setEditMode(false);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Chưa cập nhật';
        return new Date(timestamp).toLocaleDateString('vi-VN');
    };

    const getAvatarUrl = () => {
        if (avatarPreview) return avatarPreview;
        if (formData.avatar) return formData.avatar;
        return null;
    };

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
                                                onClick={handleSave}
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
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <Avatar
                                            src={getAvatarUrl()}
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                fontSize: '2rem',
                                                bgcolor: 'primary.main',
                                                border: '4px solid white',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            {formData.displayName ? formData.displayName.charAt(0).toUpperCase() : 'U'}
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
                                                    onChange={handleAvatarChange}
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

                                {/* Form Fields */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Tên hiển thị"
                                            value={formData.displayName}
                                            onChange={handleInputChange('displayName')}
                                            disabled={!editMode}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Person color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ mb: 2 }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            value={formData.email}
                                            disabled // Email không cho chỉnh sửa
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Email color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ mb: 2 }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Số điện thoại"
                                            value={formData.phone}
                                            onChange={handleInputChange('phone')}
                                            disabled={!editMode}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Phone color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ mb: 2 }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Ngày sinh"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange('dateOfBirth')}
                                            disabled={!editMode}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CalendarToday color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 2 }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Giới tính"
                                            value={formData.gender}
                                            onChange={handleInputChange('gender')}
                                            disabled={!editMode}
                                            sx={{ mb: 2 }}
                                        >
                                            <option value="">Chọn giới tính</option>
                                            <option value="male">Nam</option>
                                            <option value="female">Nữ</option>
                                            <option value="other">Khác</option>
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Địa chỉ"
                                            value={formData.address}
                                            onChange={handleInputChange('address')}
                                            disabled={!editMode}
                                            multiline
                                            rows={3}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationOn color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ mb: 2 }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Column - Additional Info & Preferences */}
                    <Grid item xs={12} md={4}>
                        {/* Account Info */}
                        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 40px rgba(0,0,0,0.08)', mb: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Thông Tin Tài Khoản
                                </Typography>
                                <Divider sx={{ mb: 2 }} />

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary">Tên đăng nhập:</Typography>
                                        <Typography variant="body2" fontWeight="medium">
                                            {currentUser?.username}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary">Vai trò:</Typography>
                                        <Chip
                                            label={currentUser?.role === 'client' ? 'Khách hàng' : currentUser?.role}
                                            size="small"
                                            color="primary"
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary">Trạng thái:</Typography>
                                        <Chip
                                            label={currentUser?.isActive ? 'Đang hoạt động' : 'Đã khóa'}
                                            size="small"
                                            color={currentUser?.isActive ? 'success' : 'error'}
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary">Ngày tham gia:</Typography>
                                        <Typography variant="body2" fontWeight="medium">
                                            {formatDate(currentUser?.createdAt)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Preferences */}
                        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Cài Đặt
                                </Typography>
                                <Divider sx={{ mb: 2 }} />

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={preferences.emailNotifications}
                                                onChange={handlePreferenceChange('emailNotifications')}
                                                disabled={!editMode}
                                            />
                                        }
                                        label="Thông báo qua email"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={preferences.smsNotifications}
                                                onChange={handlePreferenceChange('smsNotifications')}
                                                disabled={!editMode}
                                            />
                                        }
                                        label="Thông báo SMS"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={preferences.newsletter}
                                                onChange={handlePreferenceChange('newsletter')}
                                                disabled={!editMode}
                                            />
                                        }
                                        label="Nhận bản tin"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={preferences.twoFactorAuth}
                                                onChange={handlePreferenceChange('twoFactorAuth')}
                                                disabled={!editMode}
                                            />
                                        }
                                        label="Xác thực 2 yếu tố"
                                    />
                                </Box>
                            </CardContent>
                        </Card>
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
    );
};

export default UserProfile;