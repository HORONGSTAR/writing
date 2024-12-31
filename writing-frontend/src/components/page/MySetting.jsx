import { Container, Stack, TextField, Button, CircularProgress } from '@mui/material'
import React, { useState, useCallback } from 'react'

import { AlertBox } from '../../styles/StyledComponent'

function MySetting({ auth, onSubmit, error, loading }) {
   const [nick, setNick] = useState(auth?.nick || '')
   const [info, setInfo] = useState(auth?.info || '')
   const [avatar, setAvatar] = useState(auth?.avatar || '')

   const [alert, setAlert] = useState({
      display: false,
      info: false,
      nick: false,
   })

   const handleSignUp = useCallback(() => {
      const value = {
         nk: nick.trim(),
         if: info.trim(),
      }
      setAlert({
         display: true,
         nick: !value.nk,
         info: !value.if,
      })
      if (!value.nk || !value.if) return

      onSubmit({ nick, info })
   }, [nick, info, onSubmit, alert])

   return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <Stack sx={{ width: 400 }} spacing={2} noValidate autoComplete="off">
            <TextField
               id="nick"
               label="닉네임"
               value={nick}
               onChange={(e) => setNick(e.target.value)}
               error={alert.nick}
               helperText={alert.nick && '닉네임을 입력하세요.'}
            />
            <AlertBox display={alert.display}>{error}</AlertBox>
            {loading ? (
               <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
               </Container>
            ) : (
               <Button onClick={handleSignUp} variant="contained">
                  설정변경
               </Button>
            )}
         </Stack>
      </Container>
   )
}

export default MySetting
