import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createNewProductdAPI, updateProductAPI } from '~/redux/product/productSlice'
import { defaultValues, VALIDATION_MESSAGES } from '~/constants/productForm'
import { validateForm } from '~/utils/validators/productValidator'

export const useProductForm = (product, onClose, onSave, imageFile) => {
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
    watch,
    setValue,
    reset,
    trigger
  } = methods

  const watchPriceOriginal = watch('price.original')
  const watchPriceCurrent = watch('price.current')
  const watchMainCategory = watch('mainCategory')
  const watchStockQuantity = watch('stock.quantity')

  // Auto calculate discount
  useEffect(() => {
    const original = parseFloat(watchPriceOriginal) || 0
    const current = parseFloat(watchPriceCurrent) || 0

    if (original > 0 && current > 0) {
      const discount = Math.round(((original - current) / original) * 100)
      setValue('price.discount', Math.max(0, discount))
    } else {
      setValue('price.discount', 0)
    }
  }, [watchPriceOriginal, watchPriceCurrent, setValue])

  // Reset form when opening
  useEffect(() => {
    if (product) {
      const productData = {
        ...defaultValues,
        ...product,
        price: {
          current: product.price?.current?.toString() || '',
          original: product.price?.original?.toString() || '',
          discount: product.price?.discount || 0
        },
        stock: {
          quantity: product.stock?.quantity?.toString() || '0'
        },
        subCategory: product.subCategory || '',
      }
      reset(productData)
    } else {
      reset(defaultValues)
    }
  }, [product, reset])


  const onSubmit = async (data) => {
    // Validate form data
    const newProductData = {
      ...data,
      images: imageFile ? [imageFile.name] : []
    }

    const formErrors = validateForm(newProductData, watchMainCategory)
    if (formErrors) {
      const firstError = Object.values(formErrors).find(error => error)
      if (firstError) toast.error(firstError)
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      const productData = {
        ...data,
        name: data.name.trim(),
        description: data.description.trim(),
        quantification: data.quantification.trim(),
        price: {
          current: parseFloat(data.price.current),
          original: parseFloat(data.price.original),
          discount: data.price.discount || 0
        },
        stock: {
          quantity: parseInt(data.stock.quantity)
        }
      }

      // Clean up data
      delete productData._id
      delete productData._destroy
      delete productData.createdAt
      delete productData.updatedAt

      if (imageFile) {

        formData.append('image', imageFile) // 🎯 Append file

      } else if (product?.images) {

        // 🎯 Nếu không có ảnh mới nhưng có ảnh cũ, giữ nguyên
        productData.images = product.images

      }

      formData.append('data', JSON.stringify(productData))

      // Call API
      if (product && product._id) {
        await dispatch(updateProductAPI({
          id: product._id,
          formData: formData
        }))
     

      } else {
        await dispatch(createNewProductdAPI(formData))

      }

      await onSave(data)
      onClose()
    } catch (error) {
      toast.error(`Lỗi khi ${product ? 'cập nhật' : 'thêm'} sản phẩm. Vui lòng thử lại.`)
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
    watch,
    setValue,
    isSubmitting,
    watchPriceOriginal,
    watchPriceCurrent,
    watchMainCategory,
    watchStockQuantity,
    onSubmit,
    onError,
    methods
  }
}