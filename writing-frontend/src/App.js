import './styles/common.css'
import MainPage from './pages/MainPage'
import ThemePage from './pages/ThemePage'
import DetailPage from './pages/DetailPage'
import WritePage from './pages/WritePage'
import AuthPage from './pages/AuthPage'
import Navber from './components/shared/Navber'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authStatusThunk } from './features/authSlice'
import { getThemesThunk } from './features/themeSlice'
import { getPostsThunk, getPostsByFollowThunk } from './features/postSlice'
import { useEffect } from 'react'

function App() {
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getThemesThunk(1))
      dispatch(authStatusThunk())
      dispatch(getPostsThunk(1))
      dispatch(getPostsByFollowThunk())
   }, [dispatch])

   return (
      <>
         <Navber isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/main/:type" element={<MainPage />} />
            <Route path="/post/:id" element={<DetailPage />} />
            <Route path="/write" element={<WritePage />} />
            <Route path="/theme" element={<ThemePage />} />
         </Routes>
      </>
   )
}

export default App
