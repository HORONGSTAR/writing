import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createComment, deleteComment } from '../api/writingApi'

export const createCommentThunk = createAsyncThunk('auth/createComment', async (commentData, { rejectWithValue }) => {
   try {
      const response = await createComment(commentData)
      return response.data.comment
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입 실패')
   }
})

const authSlice = createSlice({
   name: 'comments',
   initialState: {
      comment: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createCommentThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createCommentThunk.fulfilled, (state, action) => {
            state.loading = false
            state.comment = action.payload
         })
         .addCase(createCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default authSlice.reducer
