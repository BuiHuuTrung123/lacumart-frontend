// src/components/Admin/CategoryManagement/constants/categoryForm.js

// Validation limits
export const MIN_NAME_LENGTH = 2
export const MAX_NAME_LENGTH = 100
export const MAX_ADDRESS_LENGTH = 500
// Validation messages
export const VALIDATION_MESSAGES = {
  FIELD_REQUIRED_MESSAGE: 'Trường này là bắt buộc',
  NAME_REQUIRED: 'Trường này là bắt buộc',
  NAME_MIN: `Tên phải có ít nhất ${MIN_NAME_LENGTH} ký tự`,
  NAME_MAX: `Tên danh mục không được vượt quá ${MAX_NAME_LENGTH} ký tự`,
  ADDRESS_MAX: `Địa chỉ không được vượt quá ${MAX_ADDRESS_LENGTH} ký tự`,
  IMAGE_TYPE: 'Chỉ chấp nhận file ảnh (jpg, jpeg, png)',
  IMAGE_SIZE: 'Kích thước file không được vượt quá 10MB'
}

// Default values
export const defaultValues = {
  name: '',
  address: '',
  phoneNumber: '',
  isActive: true,
}