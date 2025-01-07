import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAlarmList, deleteAlarmById, deleteAlarmList } from '../api/alarmApi'

export const getAlarmListThunk = createAsyncThunk('auth/getAlarmList', async (_, { rejectWithValue }) => {
   try {
      const response = await getAlarmList(_)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '알림 불러오기 실패')
   }
})

export const deleteAlarmByIdThunk = createAsyncThunk('auth/deleteAlarmById', async (id, { rejectWithValue }) => {
   try {
      const response = await deleteAlarmById(id)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '알림 삭제 실패')
   }
})

export const deleteAlarmListThunk = createAsyncThunk('auth/deleteAlarmList', async (_, { rejectWithValue }) => {
   try {
      const response = await deleteAlarmList()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '알림 리스트 삭제 실패')
   }
})

const alarmSlice = createSlice({
   name: 'alarm',
   initialState: {
      alarmList: [],
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAlarmListThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getAlarmListThunk.fulfilled, (state, action) => {
            state.loading = false
            state.alarmList = action.payload.alarmList
         })
         .addCase(getAlarmListThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deleteAlarmByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteAlarmByIdThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(deleteAlarmByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         .addCase(deleteAlarmListThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteAlarmListThunk.fulfilled, (state, action) => {
            state.loading = false
            state.alarmList = []
         })
         .addCase(deleteAlarmListThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default alarmSlice.reducer
