import { Container, Stack, TextField, Button, Box, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { loginUserThunk } from '../../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useCallback, useEffect } from 'react'
import { AlertBox } from '../../styles/StyledComponent'

function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [alert, setAlert] = useState({ isEmpty: false, message: '' })
   const { loading, error } = useSelector((state) => state.auth)
   const dispatch = useDispatch()

   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         if (!email.trim() || !password.trim()) {
            return setAlert({ isEmpty: true, message: '모든 항목을 입력해주세요.' })
         }

         dispatch(loginUserThunk({ email, password }))
            .unwrap()
            .then(() => (window.location.href = '/'))
            .catch((err) => console.error(err))
      },
      [email, password, dispatch]
   )

   return (
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
         <Stack sx={{ width: 400 }} spacing={2} noValidate autoComplete="off">
            <h4>로그인</h4>
            <TextField
               id="standard-basic"
               label="이메일"
               variant="standard"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
               id="standard-basic"
               label="비밀번호"
               variant="standard"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />

            <Button to="/login" onClick={handleLogin} disabled={loading} variant="contained">
               로그인
            </Button>
            <AlertBox display={alert.isEmpty}>{alert.message}</AlertBox>
            <AlertBox display={error && true}>{error}</AlertBox>
            <Box>
               계정이 없으신가요? &nbsp;
               <Link component={RouterLink} to="/signup">
                  회원가입
               </Link>
            </Box>
         </Stack>
      </Container>
   )
}

export default Login
