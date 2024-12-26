import './styles/common.css'
import Home from './pages/Home'
import ThemePage from './pages/ThemePage'
import PostPage from './pages/PostPage'
import WritePage from './pages/WritePage'
import AuthPage from './pages/AuthPage'
import Navber from './components/shared/Navber'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authStatusThunk } from './features/authSlice'
import { useEffect } from 'react'

function App() {
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(authStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navber isAuthenticated={isAuthenticated} user={user} />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/post/:type" element={<PostPage />} />
            <Route path="/write" element={<WritePage />} />
            <Route path="/theme" element={<ThemePage />} />
         </Routes>
      </>
   )
}

export default App
