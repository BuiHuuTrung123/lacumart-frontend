import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
const initialState = {
    products: [], // ← ĐỔI THÀNH SỐ NHIỀU (mảng)
    currentProduct: null, // Giữ lại nếu cần cho chi tiết sản phẩm
    loading: false,
    error: null
}

// ĐỔI TÊN ACTION cho đúng nghĩa
export const fetchAllProductsAPI = createAsyncThunk(
    'product/fetchAllProductsAPI', // ← Đổi tên
    async () => {
        const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/products`)
        return response.data
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateCurrentProduct: (state, action) => {
            const product = action.payload
            state.currentProduct = product
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAPI.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllProductsAPI.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload // ← LƯU VÀO MẢNG PRODUCTS
                state.error = null
            })
            .addCase(fetchAllProductsAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { updateCurrentProduct } = productSlice.actions

// THÊM SELECTOR MỚI
export const selectAllProducts = (state) => state.product.products
export const selectCurrentProduct = (state) => state.product.currentProduct
export const selectProductLoading = (state) => state.product.loading
export const selectProductError = (state) => state.product.error

export const productReducer = productSlice.reducer