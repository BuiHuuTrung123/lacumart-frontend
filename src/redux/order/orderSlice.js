// ~/redux/order/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'

const initialState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
}

// Tạo đơn hàng mới
export const createNewOrderAPI = createAsyncThunk(
    'order/createNewOrderAPI',
    async (orderData) => {
        const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/orders`, orderData)
        return response.data
    }
)

// Lấy đơn hàng theo user ID
export const fetchOrdersByUserAPI = createAsyncThunk(
    'order/fetchOrdersByUserAPI',
    async () => {
        const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/orders`)
        return response.data
    }
)

// Lấy chi tiết đơn hàng theo ID
export const fetchOrderByIdAPI = createAsyncThunk(
    'order/fetchOrderByIdAPI',
    async (orderId) => {
        const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/orders/${orderId}`)
        return response.data
    }
)

// Cập nhật trạng thái cart thành complete
export const updateCartToCompleteAPI = createAsyncThunk(
    'order/updateCartToCompleteAPI',
    async (cartId) => {
     
        const response = await authorizeAxiosInstance.patch(`${API_ROOT}/v1/carts/${cartId}`)
        return response.data
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null
        },
        clearError: (state) => {
            state.error = null
        },
        resetOrderState: (state) => {
            state.currentOrder = null
            state.loading = false
            state.error = null
        }
    },
    extraReducers: (builder) => {
        // Tạo đơn hàng mới
        builder
            .addCase(createNewOrderAPI.pending, (state) => {
                state.loading = true
            })
            .addCase(createNewOrderAPI.fulfilled, (state, action) => {
                state.loading = false
                state.currentOrder = action.payload
                state.orders.unshift(action.payload)
                state.error = null
                toast.success('Đặt hàng thành công!')
            })
            .addCase(createNewOrderAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                toast.error('Đặt hàng thất bại! Vui lòng thử lại.')
            })
            // Get order by userid
            .addCase(fetchOrdersByUserAPI.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchOrdersByUserAPI.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload
                state.error = null
            })
            .addCase(fetchOrdersByUserAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                toast.error('Tải dữ liệu thất bại')
            })
        // Các cases khác giữ nguyên...
    }
})
export const selectCurrentOrder = (state) => state.order.currentOrder
export const selectAllOrder = (state) => state.order.orders
export const { clearCurrentOrder, clearError, resetOrderState } = orderSlice.actions
export const orderReducer = orderSlice.reducer