import { Container, Stack, TextField, Button, CircularProgress } from '@mui/material'
import React, { useState, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { AlertBox } from '../../styles/StyledComponent'

function Signup({ onSubmit, loading, error }) {
   const [email, setEmail] = useState('')
   const [nick, setNick] = useState('')
   const [password, setPassword] = useState('')
   const [confirm, setConfirm] = useState('')
   const [isComplete, setComplete] = useState(false)
   const [alert, setAlert] = useState({ display: false, email: false, nick: false, password: false, confirm: false })

   const handleSignUp = useCallback(() => {
      const value = { em: email.trim(), nk: nick.trim(), pw: password.trim(), cf: confirm.trim() }
      setAlert({ email: !value.em, nick: !value.nk, password: !value.pw, confirm: !value.cf, display: true })
      if (!value.em || !value.nk || !value.pw || !value.cf) return
      if (password !== confirm) return

      onSubmit({ email, nick, password })
      setComplete(true)
   }, [email, nick, password, confirm, alert])

   return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         {isComplete ? (
            <Stack spacing={2}>
               <h4>회원가입 완료</h4>
               <p>로그인이 필요한 서비스를 이용하실 수 있습니다.</p>
               <Button variant="contained" component={RouterLink} to="/login">
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
                  error={alert.email}
                  helperText={alert.email && '이메일을 입력하세요.'}
               />
               <TextField
                  id="nick"
                  label="닉네임"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                  error={alert.nick}
                  helperText={alert.nick && '닉네임을 입력하세요.'}
               />

               <TextField
                  id="password"
                  label="비밀번호"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={alert.password}
                  helperText={alert.password && '비밀번호를 입력하세요.'}
               />
               <TextField
                  id="confirm"
                  label="비밀번호 확인"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  error={alert.confirm || password !== confirm}
                  helperText={(alert.confirm && '비밀번호를 한번 더 입력하세요') || (password !== confirm && '비밀번호가 다릅니다.')}
               />
               <AlertBox display={alert.display}>{error}</AlertBox>
               {loading ? (
                  <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                     <CircularProgress />
                  </Container>
               ) : (
                  <Button onClick={handleSignUp} variant="contained">
                     회원가입
                  </Button>
               )}
            </Stack>
         )}
      </Container>
   )
}

export default Signup
