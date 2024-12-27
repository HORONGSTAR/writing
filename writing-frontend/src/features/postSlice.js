import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, getPosts, getPostById, getPostByFollow } from '../api/writingApi'

export const createPostThunk = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
   try {
      const response = await createPost(postData)
      return response.data.post
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 작성 실패')
   }
})

export const getPostsThunk = createAsyncThunk('posts/getPosts', async (postData, { rejectWithValue }) => {
   try {
      const response = await getPosts(postData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '전체 게시물 가져오기 실패')
   }
})
export const getPostByIdThunk = createAsyncThunk('posts/getPostById', async (id, { rejectWithValue }) => {
   try {
      const response = await getPostById(id)
      return response.data.post
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '특정 게시물 가져오기 실패')
   }
})
export const getPostsByFollowThunk = createAsyncThunk('posts/getPostByFollow', async (_, { rejectWithValue }) => {
   try {
      const response = await getPostByFollow(_)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '구독 게시물 가져오기 실패')
   }
})
const postSlice = createSlice({
   name: 'posts',
   initialState: {
      user: null,
      isAuthenticated: false,
      post: null,
      posts: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(getPostByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getPostByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload
         })
         .addCase(getPostByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(getPostsByFollowThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getPostsByFollowThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload
         })
         .addCase(getPostsByFollowThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(getPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
         })
         .addCase(getPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
