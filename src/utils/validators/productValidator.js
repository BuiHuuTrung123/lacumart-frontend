import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MIN_QUANTIFICATION_LENGTH,
  MAX_QUANTIFICATION_LENGTH,
  MAX_PRICE,
  VALIDATION_MESSAGES,
  CATEGORIES_WITHOUT_SUBCATEGORIES,
  SUB_CATEGORIES
} from '~/constants/productForm'

// Một vài biểu thức chính quy - Regular Expression và custom message.
// Về Regular Expression khá hại não: https://viblo.asia/p/hoc-regular-expression-va-cuoc-doi-ban-se-bot-kho-updated-v22-Az45bnoO5xY
export const FIELD_REQUIRED_MESSAGE = 'This field is required.'
export const EMAIL_RULE = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE = 'Email is invalid. (example@trungquandev.com)'
export const PASSWORD_RULE = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const PASSWORD_RULE_MESSAGE = 'Password must include at least 1 letter, a number, and at least 8 characters.'
export const PASSWORD_CONFIRMATION_MESSAGE = 'Password Confirmation does not match!'


// Liên quan đến Validate File
export const LIMIT_COMMON_FILE_SIZE = 10485760 // byte = 10 MB
export const ALLOW_COMMON_FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
export const singleFileValidator = (file) => {
  if (!file || !file.name || !file.size || !file.type) {
    return 'File cannot be blank.'
  }
  if (file.size > LIMIT_COMMON_FILE_SIZE) {
    return 'Maximum file size exceeded. (10MB)'
  }
  if (!ALLOW_COMMON_FILE_TYPES.includes(file.type)) {
    return 'File type is invalid. Only accept jpg, jpeg and png'
  }
  return null
}
export const validateForm = (data, mainCategory) => {
  const errors = {}
  if (!data.images || data.images.length === 0) {
    errors.images = VALIDATION_MESSAGES.IMAGES_REQUIRED
  }
  // Validate name
  if (!data.name || data.name.trim().length < MIN_NAME_LENGTH) {
    errors.name = VALIDATION_MESSAGES.NAME_MIN
  } else if (data.name.length > MAX_NAME_LENGTH) {
    errors.name = VALIDATION_MESSAGES.NAME_MAX
  }

  // Validate description
  if (!data.description || data.description.trim().length < MIN_DESCRIPTION_LENGTH) {
    errors.description = VALIDATION_MESSAGES.DESCRIPTION_MIN
  } else if (data.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = VALIDATION_MESSAGES.DESCRIPTION_MAX
  }

  // Validate quantification
  if (!data.quantification || data.quantification.trim().length < MIN_QUANTIFICATION_LENGTH) {
    errors.quantification = VALIDATION_MESSAGES.QUANTIFICATION_MIN
  } else if (data.quantification.length > MAX_QUANTIFICATION_LENGTH) {
    errors.quantification = VALIDATION_MESSAGES.QUANTIFICATION_MAX
  }

  // Validate price
  const currentPrice = parseFloat(data.price?.current)
  const originalPrice = parseFloat(data.price?.original)

  if (!currentPrice || currentPrice <= 0) {
    errors.price = { ...errors.price, current: VALIDATION_MESSAGES.PRICE_MIN }
  } else if (currentPrice > MAX_PRICE) {
    errors.price = { ...errors.price, current: VALIDATION_MESSAGES.PRICE_MAX }
  }

  if (!originalPrice || originalPrice <= 0) {
    errors.price = { ...errors.price, original: VALIDATION_MESSAGES.PRICE_MIN }
  } else if (originalPrice > MAX_PRICE) {
    errors.price = { ...errors.price, original: VALIDATION_MESSAGES.PRICE_MAX }
  }

  // Validate price comparison
  if (currentPrice > originalPrice) {
    errors.price = { ...errors.price, current: VALIDATION_MESSAGES.PRICE_INVALID }
  }

  // Validate stock
  const stockError = validateStock(data.stock?.quantity)
  if (stockError) {
    errors.stock = { quantity: stockError }
  }

  // Validate subcategory
  const isSubCategoryRequired = !CATEGORIES_WITHOUT_SUBCATEGORIES.includes(mainCategory)
  const availableSubCategories = SUB_CATEGORIES[mainCategory] || []

  if (isSubCategoryRequired && availableSubCategories.length > 0 && !data.subCategory) {
    errors.subCategory = VALIDATION_MESSAGES.FIELD_REQUIRED_MESSAGE
  }

  return Object.keys(errors).length > 0 ? errors : null
}

export const validateStock = (quantity) => {
  if (quantity === '' || quantity === undefined) {
    return VALIDATION_MESSAGES.STOCK_REQUIRED
  }

  const stockQty = parseFloat(quantity)
  if (isNaN(stockQty)) {
    return VALIDATION_MESSAGES.STOCK_INTEGER
  }

  if (stockQty < 0) {
    return VALIDATION_MESSAGES.STOCK_MIN
  }

  if (!Number.isInteger(stockQty)) {
    return VALIDATION_MESSAGES.STOCK_INTEGER
  }

  return null
}

export const validatePrice = (current, original) => {
  if (!current || !original) return null

  const currentPrice = parseFloat(current)
  const originalPrice = parseFloat(original)

  if (currentPrice > originalPrice) {
    return VALIDATION_MESSAGES.PRICE_INVALID
  }

  return null
}

export const handleNumberInput = (field, value, isInteger = false) => {
  let numericValue = value.replace(/[^\d.]/g, '')

  if (isInteger) {
    numericValue = numericValue.replace(/\./g, '')
  }

  const parts = numericValue.split('.')
  if (parts.length > 2) return

  field.onChange(numericValue)
}