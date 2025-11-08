// src/utils/cateValidators.js
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
 MAX_ADDRESS_LENGTH,
  VALIDATION_MESSAGES
} from '~/constants/userForm'

export const validateUserForm = (data) => {
   
  const errors = {}

  // Validate displayname
  if (!data.displayName || data.displayName.trim().length < MIN_NAME_LENGTH) {

    errors.displayName = VALIDATION_MESSAGES.NAME_MIN
  } else if (data.displayName.length > MAX_NAME_LENGTH) {
    errors.displayName = VALIDATION_MESSAGES.NAME_MAX
  }

  // Validate address
  if (data.address && data.address.length > MAX_ADDRESS_LENGTH) {
    errors.address = VALIDATION_MESSAGES.ADDRESS_MAX
  }else if(!data.address || data.address.trim().length===0){
    errors.address = 'Địa chỉ là bắt buộc'
  }
// validate phone number
  const phonePattern = /^[0-9]*$/   
    if (data.phoneNumber && !phonePattern.test(data.phoneNumber)) {
        errors.phoneNumber = 'Số điện thoại không hợp lệ'
    }
    else if(!data.phoneNumber || data.phoneNumber.trim().length===0){
        errors.phoneNumber = 'Số điện thoại là bắt buộc'
    }

  return Object.keys(errors).length > 0 ? errors : null
}


export const validateCategoryName = (displayname) => {
  if (!displayname || displayname.trim().length < MIN_NAME_LENGTH) {
    return VALIDATION_MESSAGES.NAME_MIN
  }
  if (displayname.length > MAX_NAME_LENGTH) {
    return VALIDATION_MESSAGES.NAME_MAX
  }
  return null
}


export const validateCategoryDescription = (description) => {
  if (description && description.length > MAX_DESCRIPTION_LENGTH) {
    return VALIDATION_MESSAGES.DESCRIPTION_MAX
  }
  return null
}


export const validateDisplayOrder = (displayOrder) => {
  const order = parseInt(displayOrder)
  if (isNaN(order) || order < 0) {
    return 'Thứ tự hiển thị phải là số nguyên không âm'
  }
  return null
}