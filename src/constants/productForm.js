// Constants - Đồng bộ với validation
export const FIELD_REQUIRED_MESSAGE = 'Trường này là bắt buộc'

// Validation limits
export const MIN_NAME_LENGTH = 3
export const MAX_NAME_LENGTH = 100
export const MIN_DESCRIPTION_LENGTH = 10
export const MAX_DESCRIPTION_LENGTH = 1000
export const MIN_QUANTIFICATION_LENGTH = 10
export const MAX_QUANTIFICATION_LENGTH = 1000
export const MAX_PRICE = 1000000000

// Main Categories
export const MAIN_CATEGORIES = {
  WHEY_PROTEIN: 'Whey Protein',
  MASS_GAINER: 'Sữa tăng cân',
  BCAA_AMINO: 'BCAA Amino Acids',
  STRENGTH: 'Tăng sức mạnh',
  WEIGHT_LOSS: 'Hỗ trợ giảm cân',
  VITAMINS: 'Vitamin khoáng chất',
  FISH_OIL: 'Dầu cá',
  ACCESSORIES: 'Phụ kiện tập gym'
}

// Brands
export const BRANDS = [
  'Redcon1', 'BPI Sports', 'Ostrovit', 'Ultimate Nutrition', 'Labrada',
  'Optimum Nutrition', 'Quaker', 'VitaXtrong', 'Now Foods', 'JNX Sports',
  'Biotech USA', 'Puritan\'s Pride', 'Doctor\'s Best', 'Webber Naturals', 'Scivation'
]

// Sub Categories
export const SUB_CATEGORIES = {
  [MAIN_CATEGORIES.WHEY_PROTEIN]: [
    'Hydrolyzed Whey Protein',
    'Whey Protein Isolate',
    'Whey Protein Blend',
    'Casein Protein',
    'Meal Replacement',
    'Protein Bar'
  ],
  [MAIN_CATEGORIES.MASS_GAINER]: [],
  [MAIN_CATEGORIES.BCAA_AMINO]: ['Essential Amino Acids'],
  [MAIN_CATEGORIES.STRENGTH]: ['Pre Workout', 'Beta Alanine', 'Creatine'],
  [MAIN_CATEGORIES.WEIGHT_LOSS]: ['Fat Burn', 'CLA', 'L-Carnitine', 'Yến mạch'],
  [MAIN_CATEGORIES.VITAMINS]: ['MultiVitamin', 'Astaxanthin', 'Testosterone', 'Xương khớp', 'ZMA'],
  [MAIN_CATEGORIES.FISH_OIL]: [],
  [MAIN_CATEGORIES.ACCESSORIES]: ['Bình lắc', 'Dây kháng lực', 'Phụ kiện riêng của lacu', 'Phụ kiện Harbinger']
}

// Categories without subcategories
export const CATEGORIES_WITHOUT_SUBCATEGORIES = [
  MAIN_CATEGORIES.MASS_GAINER,
  MAIN_CATEGORIES.FISH_OIL
]

// Validation messages
export const VALIDATION_MESSAGES = {

  NAME_REQUIRED: FIELD_REQUIRED_MESSAGE,
  NAME_MIN: `Tên sản phẩm phải có ít nhất ${MIN_NAME_LENGTH} ký tự`,
  NAME_MAX: `Tên sản phẩm không được vượt quá ${MAX_NAME_LENGTH} ký tự`,
  DESCRIPTION_REQUIRED: FIELD_REQUIRED_MESSAGE,
  DESCRIPTION_MIN: `Mô tả phải có ít nhất ${MIN_DESCRIPTION_LENGTH} ký tự`,
  DESCRIPTION_MAX: `Mô tả không được vượt quá ${MAX_DESCRIPTION_LENGTH} ký tự`,
  QUANTIFICATION_REQUIRED: FIELD_REQUIRED_MESSAGE,
  QUANTIFICATION_MIN: `Định lượng phải có ít nhất ${MIN_QUANTIFICATION_LENGTH} ký tự`,
  QUANTIFICATION_MAX: `Định lượng không được vượt quá ${MAX_QUANTIFICATION_LENGTH} ký tự`,
  PRICE_REQUIRED: 'Giá sản phẩm là bắt buộc',
  PRICE_MIN: 'Giá sản phẩm phải lớn hơn 0',
  PRICE_MAX: `Giá sản phẩm không được vượt quá ${MAX_PRICE.toLocaleString()} VNĐ`,
  PRICE_INVALID: 'Giá bán phải nhỏ hơn hoặc bằng giá gốc',
  STOCK_REQUIRED: 'Số lượng tồn kho là bắt buộc',
  STOCK_MIN: 'Số lượng tồn kho không được âm',
  STOCK_INTEGER: 'Số lượng tồn kho phải là số nguyên',
  IMAGES_REQUIRED: 'Vui lòng upload ít nhất một ảnh sản phẩm',
  IMAGE_TYPE: 'Chỉ chấp nhận file ảnh (jpg, jpeg, png)',
  IMAGE_SIZE: 'Kích thước file không được vượt quá 10MB'
}

// Default values
export const defaultValues = {
  name: '',
  description: '',
  quantification: '',
  mainCategory: '',
  subCategory: '',
  brand: '',
  price: { current: '', original: '' },
  stock: { quantity: '0' },
}