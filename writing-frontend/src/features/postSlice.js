import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, getPosts, getPostById, getFolloingPosts, getUserPosts, updatePost, deletePost } from '../api/writingApi'
import { Bookmark } from '@mui/icons-material'

export const createPostThunk = createAsyncThunk('posts/createPost', async (postData, { rejectWithValue }) => {
   try {
      const response = await createPost(postData)
      return response.data.post
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 작성 실패')
   }
})

export const updatePostThunk = createAsyncThunk('posts/updatePost', async (data, { rejectWithValue }) => {
   const { id, postData } = data
   try {
      const response = await updatePost(postData, id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 수정 실패')
   }
})

export const deletePostThunk = createAsyncThunk('posts/deletePost', async (id, { rejectWithValue }) => {
   try {
      const response = await deletePost(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '게시물 삭제 실패')
   }
})

export const getPostsThunk = createAsyncThunk('posts/getPosts', async (data, { rejectWithValue }) => {
   const { page, limit } = data
   try {
      const response = await getPosts(page, limit)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '전체 게시물 가져오기 실패')
   }
})

export const getFolloingPostsThunk = createAsyncThunk('posts/getFolloingPosts', async (data, { rejectWithValue }) => {
   const { page, limit } = data
   try {
      const response = await getFolloingPosts(page, limit)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '전체 게시물 가져오기 실패')
   }
})

export const getPostByIdThunk = createAsyncThunk('posts/getPostById', async (id, { rejectWithValue }) => {
   try {
      const response = await getPostById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '특정 게시물 가져오기 실패')
   }
})

const postSlice = createSlice({
   name: 'posts',
   initialState: {
      user: null,
      isAuthenticated: false,
      post: null,
      posts: [],
      followingPosts: [],
      bookmarks: [],
      likemarks: [],
      loading: false,
      error: null,
      pagination: null,
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
         .addCase(getPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.pagination = action.payload.pagination
         })
         .addCase(getPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(getFolloingPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getFolloingPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.followingPosts = action.payload.followingPosts
            state.pagination = action.payload.pagination
         })
         .addCase(getFolloingPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(getPostByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getPostByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload.post
            state.bookmarks = action.payload.bookmarks
            state.likemarks = action.payload.likemarks
         })
         .addCase(getPostByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deletePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deletePostThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deletePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
