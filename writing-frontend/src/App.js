import './styles/common.css'
import MainPage from './pages/MainPage'
import ThemePage from './pages/ThemePage'
import DetailPage from './pages/DetailPage'
import PostCreatePage from './pages/PostCreatePage'
import PostEditPage from './pages/PostEditPage'
import AuthPage from './pages/AuthPage'
import UserPage from './pages/UserPage'
import FollowPage from './pages/FollowPage'

import Navber from './components/shared/Navber'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authStatusThunk } from './features/authSlice'
import { getThemesThunk } from './features/themeSlice'
import { useEffect } from 'react'

function App() {
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getThemesThunk(1))
      dispatch(authStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navber isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/all" element={<MainPage />} />
            <Route path="/follow" element={<MainPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/profile" element={<UserPage auth={user} />} />
            <Route path="/profile/:id" element={<UserPage auth={user} />} />
            <Route path="/profile/:id/:type" element={<FollowPage auth={user} />} />
            <Route path="/detail/:id" element={<DetailPage auth={user} />} />
            <Route path="/post/create" element={<PostCreatePage />} />
            <Route path="/post/edit/:id" element={<PostEditPage />} />
            <Route path="/theme" element={<ThemePage />} />
         </Routes>
      </>
   )
}

export default App
