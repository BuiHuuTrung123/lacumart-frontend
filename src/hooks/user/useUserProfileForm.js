// hooks/useUserProfileForm.js
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { selectCurrentUser, updateUserAPI } from '~/redux/user/userSlice'
import { validateUserForm } from '~/utils/validators/userValidator'
import { toast } from 'react-toastify'
export const useUserProfileForm = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const [editMode, setEditMode] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)

  // Sử dụng useForm hook
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      displayName: '',
      email: '',
      phoneNumber: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      avatar: null
    }
  })

  // Preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true,
    twoFactorAuth: false
  })

  // Watch form values
  const formData = watch()

  // Hàm chuyển đổi giá trị gender từ backend sang frontend
  const normalizeGender = (gender) => {
    if (!gender) return ''

    const genderMap = {
      'male': 'Nam',
      'female': 'Nữ',
      'other': 'Khác',
      'Nam': 'Nam',
      'Nữ': 'Nữ',
      'Khác': 'Khác'
    }

    return genderMap[gender] || gender
  }

  // Hàm hiển thị gender đẹp hơn
  const getDisplayGender = (gender) => {
    if (!gender) return 'Chưa cập nhật'

    const genderDisplayMap = {
      'Nam': 'Nam',
      'Nữ': 'Nữ',
      'Khác': 'Khác',
      'male': 'Nam',
      'female': 'Nữ',
      'other': 'Khác'
    }

    return genderDisplayMap[gender] || gender
  }

  // Lấy current gender để hiển thị
  const currentGender = getDisplayGender(currentUser?.gender)

  // Load user data vào form
  useEffect(() => {
    if (currentUser) {
      reset({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || currentUser.phone || '',
        address: currentUser.address || '',
        dateOfBirth: currentUser.dateOfBirth || '',
        gender: normalizeGender(currentUser.gender) || '',
        avatar: currentUser.avatar || null
      })

      setPreferences({
        emailNotifications: currentUser.preferences?.emailNotifications ?? true,
        smsNotifications: currentUser.preferences?.smsNotifications ?? false,
        newsletter: currentUser.preferences?.newsletter ?? true,
        twoFactorAuth: currentUser.preferences?.twoFactorAuth ?? false
      })
    }
  }, [currentUser, reset])

  const handlePreferenceChange = (field) => (event) => {
    setPreferences(prev => ({
      ...prev,
      [field]: event.target.checked
    }))
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: 'Kích thước ảnh không được vượt quá 5MB',
          severity: 'error'
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target.result)
        setAvatarFile(file)
        setValue('avatar', file.name) // Cập nhật giá trị vào form
      }
      reader.readAsDataURL(file)
    }
  }

  // Hàm xử lý submit form
  const onSubmit = async (data) => {

    try {
      const formErrors = validateUserForm(data)
      if (formErrors) {
        const firstError = Object.values(formErrors).find(error => error)
        if (firstError) toast.error(firstError)
        return
      }
      // Validation đã được handle bởi useForm, nhưng có thể thêm custom validation ở đây
      if (!data.displayName.trim()) {
        setSnackbar({
          open: true,
          message: 'Tên hiển thị không được để trống',
          severity: 'error'
        })
        return
      }

      // Tạo FormData để gửi file và dữ liệu
      const formDataToSend = new FormData()

      // Thêm các trường dữ liệu từ useForm
      formDataToSend.append('displayName', data.displayName.trim())
      formDataToSend.append('phoneNumber', data.phoneNumber)
      formDataToSend.append('address', data.address.trim())
      formDataToSend.append('dateOfBirth', data.dateOfBirth)
      formDataToSend.append('gender', data.gender)
      formDataToSend.append('preferences', JSON.stringify(preferences))

      // Nếu có avatar mới, thêm vào FormData
      if (avatarFile) {
        formDataToSend.append('avatar', avatarFile)
      }

      // Dispatch update action với FormData
      await dispatch(updateUserAPI(formDataToSend)).unwrap()

      setSnackbar({
        open: true,
        message: 'Cập nhật thông tin thành công!',
        severity: 'success'
      })
      setEditMode(false)
      setAvatarPreview(null)
      setAvatarFile(null)

    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Có lỗi xảy ra khi cập nhật thông tin',
        severity: 'error'
      })
    }
  }

  const handleSave = handleSubmit(onSubmit)

  const handleCancel = () => {
    if (currentUser) {
      reset({
        displayName: currentUser.displayName || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || currentUser.phone || '',
        address: currentUser.address || '',
        dateOfBirth: currentUser.dateOfBirth || '',
        gender: normalizeGender(currentUser.gender) || '',
        avatar: currentUser.avatar || null
      })
      setPreferences({
        emailNotifications: currentUser.preferences?.emailNotifications ?? true,
        smsNotifications: currentUser.preferences?.smsNotifications ?? false,
        newsletter: currentUser.preferences?.newsletter ?? true,
        twoFactorAuth: currentUser.preferences?.twoFactorAuth ?? false
      })
      setAvatarPreview(null)
      setAvatarFile(null)
    }
    setEditMode(false)
  }

  const getAvatarUrl = () => {
    if (avatarPreview) return avatarPreview
    if (formData.avatar && typeof formData.avatar === 'string') return formData.avatar
    return null
  }

  return {
    editMode,
    setEditMode,
    snackbar,
    setSnackbar,
    formData,
    preferences,
    currentUser,
    currentGender,
    register,
    errors,
    handlePreferenceChange,
    handleAvatarChange,
    handleSave,
    handleCancel,
    getAvatarUrl
  }
}