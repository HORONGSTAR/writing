import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createTheme, getThemes } from '../api/writingApi'

export const createThemeThunk = createAsyncThunk('theme/createTheme', async (themeData, { rejectWithValue }) => {
   try {
      const response = await createTheme(themeData)
      return response.data.theme
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입 실패')
   }
})
export const getThemesThunk = createAsyncThunk('theme/getThemes', async (page, { rejectWithValue }) => {
   try {
      const response = await getThemes(page)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입 실패')
   }
})
const themeSlice = createSlice({
   name: 'themes',
   initialState: {
      theme: null,
      themes: [],
      isAuthenticated: false,
      loading: false,
      error: null,
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
         })
         .addCase(getThemesThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default themeSlice.reducer
