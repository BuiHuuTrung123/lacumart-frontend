import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'
//Khởi tạo giá trị state của 1 cái slice trong redux
const initialState = {
  currentCart: null,
}
//Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers

export const addItemToCartApi = createAsyncThunk(
  'cart/addItemToCartApi',
  async (data) => {
    const respone = await authorizeAxiosInstance.post(`${API_ROOT}/v1/carts`, data)
    return respone.data
  }
)

export const deleItemToCartApi = createAsyncThunk(
  'cart/deleItemToCartApi',
  async ({ productId, cartActiveId }) => {
    const respone = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/carts/${productId}`, { data: { cartActiveId } })
    return respone.data
  }
)
export const getCartDetailApi = createAsyncThunk(
  'cart/getCartDetailApi',
  async (userId) => {
    const respone = await authorizeAxiosInstance.get(`${API_ROOT}/v1/carts/${userId}`)
    return respone.data
  }
)
//Khởi tạo một slice trong kho lưu trữ redux store
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  //reducers : nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentCart: (state, action) => {
      state.currentCart = null
    },
  },
  //extraReducers nơi xử lý dữ liệu bất đồng bộ 

  extraReducers: (builder) => {
    builder
      // Xử lý khi đang gọi API thêm vào giỏ hàng
      .addCase(getCartDetailApi.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCartDetailApi.fulfilled, (state, action) => {
        if (!action.payload) {
          state.currentCart = null
        }
        state.loading = false
        state.currentCart = action.payload
      })
      .addCase(getCartDetailApi.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        toast.error('Lỗi khi thêm vào giỏ hàng')
      })

      //GET CART DETAIL
      .addCase(addItemToCartApi.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addItemToCartApi.fulfilled, (state, action) => {
        state.loading = false
        state.currentCart = action.payload
        toast.success('Đã thêm vào giỏ hàng!')
      })
      .addCase(addItemToCartApi.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        toast.error('Lỗi khi thêm vào giỏ hàng')
      })
      // DELETE PRODUCT IN CART 
      .addCase(deleItemToCartApi.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleItemToCartApi.fulfilled, (state, action) => {
        state.loading = false
        console.log('action', action.payload)
        state.currentCart.items = state.currentCart.items.filter(
          product => product.productId !== action.payload.productId
        )
          toast.success('Xóa sản phẩm thành công')
      })
      .addCase(deleItemToCartApi.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        toast.error('Lỗi khi thêm vào giỏ hàng')
      })

  }
}

)
export const { updateCurrentCart } = cartSlice.actions

export const selectCurrentCart = (state) => state.cart.currentCart
export const selectCartLoading = (state) => state.cart.loading
export const selectCartError = (state) => state.cart.error
export const cartReducer = cartSlice.reducer