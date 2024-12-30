import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { followUser, unFollowUser, getFollowings } from '../api/writingApi'

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
   },
})

export default userSlice.reducer
