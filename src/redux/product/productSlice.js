import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'
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

export const createNewProductdAPI = createAsyncThunk(
    'product/createNewProductdAPI',
    async (formData) => { // ← Nhận FormData chứa image
        const response = await authorizeAxiosInstance.post(
            `${API_ROOT}/v1/products`, 
            formData, // ← Truyền FormData trực tiếp
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // ← Quan trọng!
                }
            }
        )
        toast.success('Thêm mới thành công')
        return response.data
    }
)

// Trong productSlice.js - thêm async thunk cho update
export const updateProductAPI = createAsyncThunk(
    'product/updateProductAPI',
    async ({ id, formData }) => {
        const response = await authorizeAxiosInstance.put(
            `${API_ROOT}/v1/products/${id}`, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
        toast.success('Cập nhật sản phẩm thành công')
        return response.data
    }
)
export const deleteProductApi = createAsyncThunk(
    'activeBoard/deleteProductApi',
    async (productId) => {
        const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/products/${productId}`)
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

        //Get All Product

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
            // Thêm mới product

            .addCase(createNewProductdAPI.pending, (state) => {
                state.loading = true
            })

            .addCase(createNewProductdAPI.fulfilled, (state, action) => {
                state.loading = false
                state.products.push(action.payload)
                state.error = null
            })
            .addCase(createNewProductdAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            //delete
            .addCase(deleteProductApi.pending, (state) => {
                state.loading = true
            })

            .addCase(deleteProductApi.fulfilled, (state, action) => {
                state.loading = false
                console.log( action.payload._id)
                state.products = state.products.filter(product => 
                    product._id !== action.payload._id
                )
                
                state.error = null
            })
            .addCase(deleteProductApi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // update 
              .addCase(updateProductAPI.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateProductAPI.fulfilled, (state, action) => {
                state.loading = false
                // Cập nhật product trong array
                const updatedProduct = action.payload
                const index = state.products.findIndex(product => product._id === updatedProduct._id)
                if (index !== -1) {
                    state.products[index] = updatedProduct
                }
            })
            .addCase(updateProductAPI.rejected, (state, action) => {
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