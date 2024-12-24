import './styles/common.css'
import Home from './pages/Home'
import ThemePage from './pages/ThemePage'
import PostPage from './pages/PostPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Navber from './components/shared/Navber'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function App() {
   const { isAuthenticated, user } = useSelector((state) => state.auth)
   console.log(isAuthenticated)
   return (
      <>
         <Navber isAuthenticated={isAuthenticated} />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/post/:type" element={<PostPage />} />
            <Route path="/theme" element={<ThemePage />} />
         </Routes>
      </>
   )
}

export default App
