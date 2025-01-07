import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createUser, loginUser, logoutUser, authStatus, editUser } from '../api/authApi'

export const createUserThunk = createAsyncThunk('auth/createUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await createUser(userData)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입 실패')
   }
})

export const loginUserThunk = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginUser(credentials)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그인 실패')
   }
})

export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutUser()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '로그아웃 실패')
   }
})

export const authStatusThunk = createAsyncThunk('auth/authStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await authStatus()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '상태 확인 실패')
   }
})

export const editUserThunk = createAsyncThunk('auth/editUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await editUser(userData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '사용자 정보 수정 실패')
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
         })
         .addCase(createUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(loginUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.isAuthenticated = true
         })
         .addCase(loginUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(logoutUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = null
            state.isAuthenticated = false
         })
         .addCase(logoutUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(authStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(authStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user || null
            state.isAuthenticated = action.payload.isAuthenticated
         })
         .addCase(authStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
            state.isAuthenticated = false
         })
         .addCase(editUserThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(editUserThunk.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
         })
         .addCase(editUserThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default authSlice.reducer
