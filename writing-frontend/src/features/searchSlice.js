import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchResult } from '../api/searchApi'

export const searchResultThunk = createAsyncThunk('auth/searchResult', async (search, { rejectWithValue }) => {
   try {
      const response = await searchResult(search)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '검색 실패')
   }
})

const alarmSlice = createSlice({
   name: 'search',
   initialState: {
      users: [],
      posts: [],
      themes: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(searchResultThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(searchResultThunk.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload.users
            state.posts = action.payload.posts
            state.themes = action.payload.themes
         })
         .addCase(searchResultThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default alarmSlice.reducer
