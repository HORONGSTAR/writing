import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile, getProfileId } from '../api/pageApi'

export const getProfileThunk = createAsyncThunk('page/getProfile', async (_, { rejectWithValue }) => {
   try {
      const response = await getProfile()
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로필 정보를 가져오는 중 문제가 발생했습니다.')
   }
})

export const getProfileIdThunk = createAsyncThunk('page/getProfileId', async (id, { rejectWithValue }) => {
   try {
      const response = await getProfileId(id)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '프로필 정보를 가져오는 중 문제가 발생했습니다.')
   }
})

const pageSlice = createSlice({
   name: 'page',
   initialState: {
      user: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getProfileThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getProfileThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(getProfileThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

      builder
         .addCase(getProfileIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getProfileIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(getProfileIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default pageSlice.reducer
