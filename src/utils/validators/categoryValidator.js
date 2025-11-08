// src/utils/cateValidators.js
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  VALIDATION_MESSAGES
} from '~/constants/categoryForm'

export const validateCategoryForm = (data) => {
  const errors = {}

  // Validate name
  if (!data.name || data.name.trim().length < MIN_NAME_LENGTH) {
    errors.name = VALIDATION_MESSAGES.NAME_MIN
  } else if (data.name.length > MAX_NAME_LENGTH) {
    errors.name = VALIDATION_MESSAGES.NAME_MAX
  }

  // Validate description
  if (data.description && data.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = VALIDATION_MESSAGES.DESCRIPTION_MAX
  }

  // Validate displayOrder
  const displayOrder = parseInt(data.displayOrder)
  if (isNaN(displayOrder) || displayOrder < 0) {
    errors.displayOrder = 'Thứ tự hiển thị phải là số nguyên không âm'
  }

  return Object.keys(errors).length > 0 ? errors : null
}


export const validateCategoryName = (name) => {
  if (!name || name.trim().length < MIN_NAME_LENGTH) {
    return VALIDATION_MESSAGES.NAME_MIN
  }
  if (name.length > MAX_NAME_LENGTH) {
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