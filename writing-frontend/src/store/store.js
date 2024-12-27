import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import postSlice from '../features/postSlice'
import themeSlice from '../features/themeSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      posts: postSlice,
      themes: themeSlice,
   },
})

export default store
