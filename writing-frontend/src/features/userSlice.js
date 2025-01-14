import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { followUser, unFollowUser, addLikemark, removeLikemark, addBookmark, removeBookmark } from '../api/userApi'

export const followUserThunk = createAsyncThunk('user/followUser', async (id, { rejectWithValue }) => {
   try {
      const response = await followUser(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '팔로우 중 문제가 발생했습니다.')
   }
})

export const unFollowUserThunk = createAsyncThunk('user/unFollowUser', async (id, { rejectWithValue }) => {
   try {
      const response = await unFollowUser(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '언팔로우 중 문제가 발생했습니다.')
   }
})

export const addLmkThunk = createAsyncThunk('user/addLikemark', async (id, { rejectWithValue }) => {
   try {
      const response = await addLikemark(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '좋아요 추가 중 문제가 발생했습니다.')
   }
})

export const removeLmkThunk = createAsyncThunk('user/removeLikemark', async (id, { rejectWithValue }) => {
   try {
      const response = await removeLikemark(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '좋아요 삭제 중 문제가 발생했습니다.')
   }
})

export const addBmkThunk = createAsyncThunk('user/addBookmark', async (id, { rejectWithValue }) => {
   try {
      const response = await addBookmark(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '북마크 추가 중 문제가 발생했습니다.')
   }
})

export const removeBmkThunk = createAsyncThunk('user/removeBookmark', async (id, { rejectWithValue }) => {
   try {
      const response = await removeBookmark(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '북마크 삭제 중 문제가 발생했습니다.')
   }
})

const userSlice = createSlice({
   name: 'user',
   initialState: {
      user: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(followUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(followUserThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(followUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(unFollowUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(unFollowUserThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(unFollowUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(addLmkThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(addLmkThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(addLmkThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(removeLmkThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(removeLmkThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(removeLmkThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(addBmkThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(addBmkThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(addBmkThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(removeBmkThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(removeBmkThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(removeBmkThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default userSlice.reducer
