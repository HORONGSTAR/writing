import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createComment, deleteComment, updateComment, getComments } from '../api/commentApi'

export const createCommentThunk = createAsyncThunk('auth/createComment', async (commentData, { rejectWithValue }) => {
   try {
      const response = await createComment(commentData)
      return response.data.comments
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 작성 실패')
   }
})
export const deleteCommentThunk = createAsyncThunk('auth/deleteComment', async (id, { rejectWithValue }) => {
   try {
      const response = await deleteComment(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 삭제 실패')
   }
})
export const updateCommentThunk = createAsyncThunk('auth/updateComment', async (data, { rejectWithValue }) => {
   const { commentData, id } = data
   try {
      const response = await updateComment(commentData, id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 수정 실패')
   }
})
export const getCommentsThunk = createAsyncThunk('auth/getComments', async (id, { rejectWithValue }) => {
   try {
      const response = await getComments(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '댓글 불러오기 실패')
   }
})

const authSlice = createSlice({
   name: 'comments',
   initialState: {
      items: [],
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
            state.items = action.payload
         })
         .addCase(createCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(updateCommentThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateCommentThunk.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload.comments
         })
         .addCase(updateCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deleteCommentThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteCommentThunk.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload.comments
         })
         .addCase(deleteCommentThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(getCommentsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getCommentsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload.comments
         })
         .addCase(getCommentsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default authSlice.reducer
