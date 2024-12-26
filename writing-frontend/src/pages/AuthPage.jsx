import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk, createUserThunk } from './../features/authSlice'
import { Container } from '@mui/material'

function AuthPage() {
   const { loading, error } = useSelector((state) => state.auth)
   const location = useLocation()
   const dispatch = useDispatch()

   const handleLogin = useCallback(
      (authDate) => {
         dispatch(loginUserThunk(authDate))
            .unwrap()
            .then(() => (window.location.href = '/'))
            .catch((err) => console.error(err))
         return
      },
      [dispatch]
   )
   const handleSignup = useCallback(
      (authDate) => {
         dispatch(createUserThunk(authDate))
            .unwrap()
            .then()
            .catch((err) => console.error(err))
         return
      },
      [dispatch]
   )

   return (
      <Container>
         {location.pathname === '/login' && <Login onSubmit={handleLogin} error={error} loading={loading} />}
         {location.pathname === '/signup' && <Signup onSubmit={handleSignup} error={error} loading={loading} />}
      </Container>
   )
}

export default AuthPage
