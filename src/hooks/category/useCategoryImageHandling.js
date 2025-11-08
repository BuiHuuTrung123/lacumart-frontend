// src/components/Admin/CategoryManagement/hooks/useCategoryImageHandling.js
import { useState, useEffect } from 'react'
import { singleFileValidator } from '~/utils/validators/productValidator'

export const useCategoryImageHandling = (category) => {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageErrors, setImageErrors] = useState([])

  // Initialize image when category changes
  useEffect(() => {
    if (category?.image) {
      setImagePreview({
        url: category.image,
        alt: category.name || 'Category Image',
        isExisting: true
      })
    } else {
      setImagePreview(null)
    }
    setImageFile(null)
    setImageErrors([])
  }, [category])

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    if (files.length === 0) return

    const file = files[0]
    const fileError = singleFileValidator(file)
    
    if (fileError) {
      setImageErrors([fileError])
      return
    }

    try {
      // Cleanup old image if exists
      if (imagePreview?.url && !imagePreview.isExisting) {
        URL.revokeObjectURL(imagePreview.url)
      }

      const imageUrl = URL.createObjectURL(file)
      
      const newImagePreview = {
        url: imageUrl,
        alt: file.name,
        file: file,
        isExisting: false
      }
      
      setImageFile(file)
      setImagePreview(newImagePreview)
      setImageErrors([])
      
    } catch (error) {
      console.error('Error creating object URL:', error)
      setImageErrors(['Lỗi khi xử lý ảnh'])
    }

    event.target.value = ''
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

  const hasImage = !!imagePreview

  return {
    imageFile,
    imagePreview,
    imageErrors,
    handleImageUpload,
    handleRemoveImage,
    hasImage
  }
}