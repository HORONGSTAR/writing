import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createTheme, getThemes, deleteTheme, getThemeList } from '../api/themeApi'

export const createThemeThunk = createAsyncThunk('theme/createTheme', async (themeData, { rejectWithValue }) => {
   try {
      const response = await createTheme(themeData)
      return response.data.theme
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주제 생성 실패')
   }
})

export const getThemesThunk = createAsyncThunk('theme/getThemes', async (data, { rejectWithValue }) => {
   const { page, limit } = data
   try {
      const response = await getThemes(page, limit)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주제 불러오기 실패')
   }
})

export const getThemeListThunk = createAsyncThunk('theme/getThemeList', async (_, { rejectWithValue }) => {
   try {
      const response = await getThemeList(_)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주제 불러오기 실패')
   }
})

export const deleteThemeThunk = createAsyncThunk('theme/deleteTheme', async (id, { rejectWithValue }) => {
   try {
      const response = await deleteTheme(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주제 불러오기 실패')
   }
})
const themeSlice = createSlice({
   name: 'themes',
   initialState: {
      theme: null,
      themes: [],
      themeList: [],
      isAuthenticated: false,
      loading: false,
      error: null,
      pagination: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createThemeThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createThemeThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(createThemeThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(getThemesThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getThemesThunk.fulfilled, (state, action) => {
            state.loading = false
            state.themes = action.payload.themes
            state.pagination = action.payload.pagination
         })
         .addCase(getThemesThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deleteThemeThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteThemeThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deleteThemeThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(getThemeListThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getThemeListThunk.fulfilled, (state, action) => {
            state.loading = false
            state.themeList = action.payload.themeList
         })
         .addCase(getThemeListThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default themeSlice.reducer
