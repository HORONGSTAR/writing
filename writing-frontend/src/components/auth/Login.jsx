import { Container, Stack, TextField, Button, Box, Link, CircularProgress } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import React, { useState, useCallback } from 'react'
import { AlertBox } from '../../styles/StyledComponent'

function Login({ onSubmit, loading, error }) {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [alert, setAlert] = useState({
      display: false,
      email: false,
      password: false,
   })

   const handleLogin = useCallback(
      (e) => {
         e.preventDefault()
         const value = {
            em: email.trim(),
            pw: password.trim(),
         }
         setAlert({
            email: !value.em,
            password: !value.pw,
            display: true,
         })
         if (!value.em || !value.pw) return

         onSubmit({ email, password })
      },
      [email, password, alert]
   )

   return (
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
         <Stack sx={{ width: 400 }} spacing={2} noValidate autoComplete="off">
            <h4>로그인</h4>
            <TextField
               id="email"
               label="이메일"
               variant="standard"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               error={alert.email}
               helperText={alert.email && '이메일을 입력하세요.'}
            />

            <TextField
               id="password"
               label="비밀번호"
               variant="standard"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               error={alert.password}
               helperText={alert.password && '비밀번호를 입력하세요.'}
            />

            {loading ? (
               <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
               </Container>
            ) : (
               <>
                  <Button to="/login" onClick={handleLogin} variant="contained">
                     로그인
                  </Button>
                  <AlertBox display={alert.display}>{error}</AlertBox>
                  <Box>
                     계정이 없으신가요? &nbsp;
                     <Link component={RouterLink} to="/signup">
                        회원가입
                     </Link>
                  </Box>
               </>
            )}
         </Stack>
      </Container>
   )
}

export default Login
