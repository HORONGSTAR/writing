import { useCallback } from 'react'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk, createUserThunk } from './../features/authSlice'
import { Container, Stack, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function AuthPage() {
   const { loading, error } = useSelector((state) => state.auth)
   const [isComplete, setComplete] = useState(false)
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
            .then(() => setComplete(true))
            .catch((err) => console.error(err))
         return
      },
      [dispatch]
   )

   return (
      <Container>
         {location.pathname === '/login' && <Login onSubmit={handleLogin} error={error} loading={loading} />}
         {location.pathname === '/signup' &&
            (isComplete ? (
               <Stack spacing={2}>
                  <h4>회원가입 완료</h4>
                  <p>로그인이 필요한 서비스를 이용하실 수 있습니다.</p>
                  <Button variant="contained" component={RouterLink} to="/login">
                     로그인 하러 가기
                  </Button>
               </Stack>
            ) : (
               <Signup onSubmit={handleSignup} error={error} loading={loading} />
            ))}
      </Container>
   )
}

export default AuthPage
