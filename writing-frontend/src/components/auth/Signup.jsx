import { Container, Stack, TextField, Button } from '@mui/material'
import { createUserThunk } from '../../features/authSlice'
import { useDispatch } from 'react-redux'
import React, { useState, useCallback } from 'react'
import { AlertBox } from '../../styles/StyledComponent'

function Signup() {
   const [email, setEmail] = useState('')
   const [nick, setNick] = useState('')
   const [password, setPassword] = useState('')
   const [confirm, setConfirm] = useState('')
   const [alert, setAlert] = useState({ isEmpty: false, message: '' })
   const [isComplete, setComplete] = useState(false)

   const dispatch = useDispatch()
   const handleSignUp = useCallback(() => {
      if (!email.trim() || !nick.trim() || !password.trim()) {
         return setAlert({ isEmpty: true, message: '모든 항목을 입력해주세요.' })
      }

      if (password !== confirm) {
         return setAlert({ isEmpty: true, message: '비밀번호가 다릅니다.' })
      }

      dispatch(createUserThunk({ email, nick, password }))
         .unwrap()
         .then(() => setComplete(true))
         .catch((err) => console.error(err))
   }, [email, nick, password, confirm, dispatch])

   return (
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
         {isComplete ? (
            <Stack spacing={2}>
               <h4>회원가입 완료</h4>
               <p>로그인이 필요한 서비스를 이용하실 수 있습니다.</p>
               <Button variant="contained" onClick={() => (window.location.href = '/login')}>
                  로그인 하러 가기
               </Button>
            </Stack>
         ) : (
            <Stack sx={{ width: 400 }} spacing={2} noValidate autoComplete="off">
               <h4>회원가입</h4>
               <TextField
                  id="email"
                  label="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <TextField
                  id="nick"
                  label="닉네임"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
               />

               <TextField
                  id="password"
                  label="비밀번호"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <TextField
                  id="confirm"
                  label="비밀번호 확인"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
               />
               <AlertBox display={alert.isEmpty}>{alert.message}</AlertBox>
               <Button sx={{ marginLeft: 'auto' }} onClick={handleSignUp} variant="contained">
                  회원가입
               </Button>
            </Stack>
         )}
      </Container>
   )
}

export default Signup
