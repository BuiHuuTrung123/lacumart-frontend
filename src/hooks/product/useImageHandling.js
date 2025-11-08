import { useState, useEffect } from 'react'
import { singleFileValidator } from '~/utils/validators/productValidator'

export const useImageHandling = (product) => {
  const [imageFile, setImageFile] = useState(null) // Chỉ lưu file mới
  const [imagePreview, setImagePreview] = useState(null) // Preview URL
  const [imageErrors, setImageErrors] = useState([])

  // Initialize image when product changes
  useEffect(() => {
    if (product?.images) {
      // Backend trả về images là string (URL)
      if (typeof product.images === 'string') {
        setImagePreview({
          url: product.images,
          alt: product.name || 'Product Image',
          isExisting: true
        })
      } 
      // Hoặc nếu là array (fallback)
      else if (Array.isArray(product.images) && product.images.length > 0) {
        const firstImage = product.images[0]
        setImagePreview({
          url: typeof firstImage === 'string' ? firstImage : firstImage.url,
          alt: product.name || 'Product Image',
          isExisting: true
        })
      } else {
        setImagePreview(null)
      }
    } else {
      setImagePreview(null)
    }
    setImageFile(null)
    setImageErrors([])
  }, [product])

  // Image handler - ĐƠN GIẢN như CategoryForm
 // useImageHandling.js
const handleImageUpload = (file) => {

  
  if (!file) {
    console.error('❌ No file provided')
    return
  }

  const fileError = singleFileValidator(file)
  
  if (fileError) {
    setImageErrors([fileError])
    return
  }

  try {
    // Cleanup ảnh cũ nếu có
    if (imagePreview?.url && !imagePreview.isExisting) {
      URL.revokeObjectURL(imagePreview.url)
    }

    // Tạo object URL
    const imageUrl = URL.createObjectURL(file)

    
    // 🚨 QUAN TRỌNG: Set state ĐỒNG THỜI
    const newImagePreview = {
      url: imageUrl,
      alt: file.name,
      file: file,
      isExisting: false
    }
    
    setImageFile(file)
    setImagePreview(newImagePreview) // 🎯 SET STATE
    setImageErrors([])
    
 
    
  } catch (error) {
    console.error('❌ Error creating object URL:', error)
    setImageErrors(['Lỗi khi xử lý ảnh'])
  }
}

  const handleRemoveImage = () => {

    // Cleanup memory
    if (imagePreview?.url && !imagePreview.isExisting) {
      URL.revokeObjectURL(imagePreview.url)
    }
    setImageFile(null)
    setImagePreview(null)
    setImageErrors([])
  }

  const hasImages = !!imagePreview

  return {
    imageFile,        // File thực để upload
    imagePreview,     // URL preview để hiển thị
    imageErrors,
    handleImageUpload,
    handleRemoveImage,
    hasImages 
  }
}