import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { followUser, unFollowUser, addLikemark, removeLikemark, addBookmark, removeBookmark } from '../api/userApi'

export const followUserThunk = createAsyncThunk('user/followUser', async (id, { rejectWithValue }) => {
   try {
      const response = await followUser(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '팔로우 실패')
   }
})

export const unFollowUserThunk = createAsyncThunk('user/unFollowUser', async (id, { rejectWithValue }) => {
   try {
      const response = await unFollowUser(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '언팔로우 실패')
   }
})

export const addLikemarkThunk = createAsyncThunk('user/addLikemark', async (id, { rejectWithValue }) => {
   try {
      const response = await addLikemark(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '좋아요 추가 실패')
   }
})

export const removeLikemarkThunk = createAsyncThunk('user/removeLikemark', async (id, { rejectWithValue }) => {
   try {
      const response = await removeLikemark(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '좋아요 삭제 실패')
   }
})

export const addBookmarkThunk = createAsyncThunk('user/addBookmark', async (id, { rejectWithValue }) => {
   try {
      const response = await addBookmark(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '북마크 추가 실패')
   }
})

export const removeBookmarkThunk = createAsyncThunk('user/removeBookmark', async (id, { rejectWithValue }) => {
   try {
      const response = await removeBookmark(id)
      return response.data.message
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '북마크 삭제 실패')
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
         .addCase(addLikemarkThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(addLikemarkThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(addLikemarkThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(removeLikemarkThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(removeLikemarkThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(removeLikemarkThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(addBookmarkThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(addBookmarkThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(addBookmarkThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(removeBookmarkThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(removeBookmarkThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(removeBookmarkThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default userSlice.reducer
