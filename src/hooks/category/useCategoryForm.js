// src/components/Admin/CategoryManagement/hooks/useCategoryForm.js
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createNewCategoryAPI, updateCategoryAPI } from '~/redux/category/categorySlice'
import { defaultValues } from '~/constants/categoryForm'
import { validateCategoryForm } from '~/utils/validators/categoryValidator'

export const useCategoryForm = (category, onClose, onSave, imageFile) => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const methods = useForm({
    defaultValues: defaultValues,
    mode: 'onChange'
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = methods

  // Reset form when opening
  useEffect(() => {
    if (category) {
      const categoryData = {
        ...defaultValues,
        ...category,
        displayOrder: category.displayOrder || 0,
        isActive: category.isActive !== undefined ? category.isActive : true,
      }
      reset(categoryData)
    } else {
      reset(defaultValues)
    }
  }, [category, reset])

  const onSubmit = async (data) => {
    // Validate form data using centralized validator
    const formErrors = validateCategoryForm(data)
    if (formErrors) {
      const firstError = Object.values(formErrors).find(error => error)
      if (firstError) toast.error(firstError)
      return
    }

    // Validate image for new category
    if (!category && !imageFile) {
      toast.error('Vui lòng chọn ảnh cho danh mục mới')
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      const categoryData = {
        name: data.name.trim(),
        description: data.description?.trim() || '',
        displayOrder: parseInt(data.displayOrder) || 0,
        isActive: Boolean(data.isActive)
      }



      // Append image file if exists
      if (imageFile) {
        formData.append('image', imageFile)
      }

      formData.append('data', JSON.stringify(categoryData))

      // Call API
      if (category && category._id) {
        await dispatch(updateCategoryAPI({
          id: category._id,
          formData: formData
        })).unwrap()
        toast.success('Cập nhật danh mục thành công! ✅')
      } else {
        await dispatch(createNewCategoryAPI(formData)).unwrap()
        toast.success('Thêm danh mục mới thành công! 🎉')
      }

      onClose()
    } catch (error) {
      toast.error(`Lỗi khi ${category ? 'cập nhật' : 'thêm'} danh mục. Vui lòng thử lại.`)
      console.error('Submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onError = (errors) => {
    toast.error('Vui lòng kiểm tra lại thông tin form')
  }

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    onError,
    methods
  }
}