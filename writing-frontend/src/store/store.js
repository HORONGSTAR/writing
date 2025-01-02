import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import postSlice from '../features/postSlice'
import themeSlice from '../features/themeSlice'
import pageSlice from '../features/pageSlice'
import userSlice from '../features/userSlice'
import commentSlice from '../features/commentSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      posts: postSlice,
      page: pageSlice,
      user: userSlice,
      themes: themeSlice,
      comments: commentSlice,
   },
})

export default store
