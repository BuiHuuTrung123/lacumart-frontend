// ~/hooks/order/useOrderForm.js
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createNewOrderAPI, updateCartToCompleteAPI } from '~/redux/order/orderSlice'
import { selectCurrentCart } from '~/redux/cart/cartSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { toast } from 'react-toastify'

export const useOrderForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentCart = useSelector(selectCurrentCart)
    const currentUser = useSelector(selectCurrentUser)
    const loading = useSelector((state) => state.order.loading)

    const [activeStep, setActiveStep] = useState(0)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        control,
        trigger
    } = useForm({
        defaultValues: {
            // Thông tin giao hàng
            fullName: currentUser?.displayName || '',
            phone: currentUser?.phoneNumber || '',
            address:currentUser?.address|| '',
            ward: '',
            district: '',
            city: '',
            note: '',

            // Phương thức thanh toán
            paymentMethod: 'cod',

            // Điều khoản
            saveShippingInfo: true,
            agreeTerms: false
        },
        mode: 'onChange'
    })

    const paymentMethod = watch('paymentMethod')
    const agreeTerms = watch('agreeTerms')
    const selectedCity = watch('city')
    const selectedDistrict = watch('district')

    // Tính toán tổng tiền - memoized
    const cartItems = currentCart?.items || []
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    const shippingFee = subtotal > 500000 ? 0 : 30000
    const total = subtotal + shippingFee

    // Navigation handlers với validation
    const handleNext = useCallback(async () => {
        let isValid = false

        switch (activeStep) {
            case 0: // Shipping info step
                isValid = await trigger(['fullName', 'phone', 'address', 'city', 'district', 'ward'])
                break
            case 1: // Payment step
                isValid = await trigger(['paymentMethod'])
                break
            default:
                isValid = true
        }

        if (isValid) {
            setActiveStep((prev) => prev + 1)
        } else {
            toast.error('Vui lòng kiểm tra lại thông tin')
        }
    }, [activeStep, trigger])

    const handleBack = useCallback(() => {
        setActiveStep((prev) => prev - 1)
    }, [])

    // Reset address fields khi city/district thay đổi
    const handleCityChange = useCallback((cityCode) => {
        setValue('city', cityCode)
        setValue('district', '')
        setValue('ward', '')
    }, [setValue])

    const handleDistrictChange = useCallback((districtCode) => {
        setValue('district', districtCode)
        setValue('ward', '')
    }, [setValue])

    const onSubmit = async (data) => {
       
        if (!agreeTerms) {
            toast.error('Vui lòng đồng ý với điều khoản và điều kiện')
            return
        }

        // Validate final step
        const isValid = await trigger()
        if (!isValid) {
            toast.error('Vui lòng kiểm tra lại thông tin đơn hàng')
            return
        }

        const orderData = {
            customerInfo: {
                fullName: data.fullName.trim(),
                phone: data.phone.trim(),
                email: currentUser.email.trim() || '',
                paymentMethod: data.paymentMethod,
                address: {
                    street: data.address.trim(),
                    ward: data.ward,
                    district: data.district,
                    city: data.city,
                    note: data.note.trim()
                }
            }  
        }

        try {
            // Tạo đơn hàng mới
            const result = await dispatch(createNewOrderAPI(orderData)).unwrap()

            // Cập nhật trạng thái cart thành complete
            if (currentCart?._id) {
                await dispatch(updateCartToCompleteAPI(currentCart._id)).unwrap()
            }

            // Chuyển hướng dựa trên phương thức thanh toán
            if (data.paymentMethod === 'banking') {
                navigate(`/order-confirmation`, { 
                    state: { 
                        showBankInfo: true,
                        orderCode: result.orderCode,
                        totalAmount: total,
                    }
                })
            } else {
                navigate(`/order-confirmation`, {
                    state: {
                        orderCode: result.orderCode,
                        totalAmount: total
                    }
                })
            }

          
        } catch (error) {
            console.error('Order creation failed:', error)
           
        }
    }

    return {
        // Form methods
        register,
        handleSubmit: handleSubmit(onSubmit),
        watch,
        setValue,
        control,
        errors,
        trigger,

        // State
        activeStep,
        setActiveStep,
        loading,
        paymentMethod,
        agreeTerms,
        selectedCity,
        selectedDistrict,

        // Data
        cartItems,
        subtotal,
        shippingFee,
        total,
        currentUser,

        // Handlers
        handleNext,
        handleBack,
        handleCityChange,
        handleDistrictChange
    }
}