import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'

const initialState = {
    categories: [],
    currentCategory: null,
    loading: false,
    error: null
}

// Fetch all categories
export const fetchAllCategoriesAPI = createAsyncThunk(
    'category/fetchAllCategoriesAPI',
    async () => {
        const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/categories`)
        return response.data
    }
)

// Create new category
export const createNewCategoryAPI = createAsyncThunk(
    'category/createNewCategoryAPI',
    async (formData) => {
        const response = await authorizeAxiosInstance.post(
            `${API_ROOT}/v1/categories`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
        toast.success('Thêm danh mục thành công')
        return response.data
    }
)

// Update category
export const updateCategoryAPI = createAsyncThunk(
    'category/updateCategoryAPI',
    async ({ id, formData }) => {
        const response = await authorizeAxiosInstance.put(
            `${API_ROOT}/v1/categories/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
        toast.success('Cập nhật danh mục thành công')
        return response.data
    }
)

// Delete category
export const deleteCategoryApi = createAsyncThunk(
    'category/deleteCategoryApi',
    async (categoryId) => {
        const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/categories/${categoryId}`)
        toast.success('Xóa danh mục thành công')
        return response.data
    }
)

// Fetch category by ID
export const fetchCategoryByIdAPI = createAsyncThunk(
    'category/fetchCategoryByIdAPI',
    async (categoryId) => {
        const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/categories/${categoryId}`)
        return response.data
    }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        updateCurrentCategory: (state, action) => {
            state.currentCategory = action.payload
        },
        clearCurrentCategory: (state) => {
            state.currentCategory = null
        },
    },
    extraReducers: (builder) => {
        // Fetch All Categories
        builder
            .addCase(fetchAllCategoriesAPI.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAllCategoriesAPI.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
                state.error = null
            })
            .addCase(fetchAllCategoriesAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Create New Category
            .addCase(createNewCategoryAPI.pending, (state) => {
                state.loading = true
            })
            .addCase(createNewCategoryAPI.fulfilled, (state, action) => {
                state.loading = false
                state.categories.push(action.payload)
                state.error = null
            })
            .addCase(createNewCategoryAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Update Category
            .addCase(updateCategoryAPI.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateCategoryAPI.fulfilled, (state, action) => {
                state.loading = false
                const updatedCategory = action.payload
                const index = state.categories.findIndex(category => category._id === updatedCategory._id)
                if (index !== -1) {
                    state.categories[index] = updatedCategory
                }
            })
            .addCase(updateCategoryAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Delete Category
            .addCase(deleteCategoryApi.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCategoryApi.fulfilled, (state, action) => {
                state.loading = false
                state.categories = state.categories.filter(category =>
                    category._id !== action.payload._id
                )
                state.error = null
            })
            .addCase(deleteCategoryApi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Fetch Category By ID
            .addCase(fetchCategoryByIdAPI.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategoryByIdAPI.fulfilled, (state, action) => {
                state.loading = false
                state.currentCategory = action.payload
                state.error = null
            })
            .addCase(fetchCategoryByIdAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { updateCurrentCategory, clearCurrentCategory } = categorySlice.actions

// Selectors
export const selectAllCategories = (state) => state.category.categories
export const selectCurrentCategory = (state) => state.category.currentCategory
export const selectCategoryLoading = (state) => state.category.loading
export const selectCategoryError = (state) => state.category.error

export const categoryReducer = categorySlice.reducer