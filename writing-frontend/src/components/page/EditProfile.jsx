import { Container, Stack, TextField, Button, Avatar, Box } from '@mui/material'
import React, { useState, useCallback } from 'react'
import { Upload } from '@mui/icons-material'
import { editUserThunk } from '../../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

function MySetting() {
   const { user } = useSelector((state) => state.page)
   const [info, setInfo] = useState(user.info || '')
   const [imgUrl, setImgUrl] = useState(user.avatar ? process.env.REACT_APP_API_URL + user.avatar : '')
   const [imgFile, setImgFile] = useState(null)
   const [alert, setAlert] = useState({ info: false, nick: false })

   const dispatch = useDispatch()
   const handleImageChange = useCallback((e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return

      setImgFile(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
   }, [])

   const handleProfileChange = useCallback(() => {
      const value = { if: info.trim() }
      setAlert({ info: !value.if })
      if (!value.if) return

      const formData = new FormData()
      if (imgFile) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), {
            type: imgFile.type,
         })
         formData.append('avatar', encodedFile)
      }
      formData.append('info', info)

      dispatch(editUserThunk(formData))
         .unwrap()
         .then(() => (window.location.href = '/profile'))
         .catch((error) => {
            console.error('프로필 수정 중 에러 :', error)
         })
   }, [info, alert, imgFile, dispatch])

   return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <Stack sx={{ width: 400 }} spacing={2} noValidate autoComplete="off">
            <Avatar src={imgUrl} sx={{ width: 130, height: 130 }} />
            <Box>
               <Button component="label" variant="outlined">
                  <Upload />
                  이미지 업로드
                  <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
               </Button>
            </Box>

            <TextField
               id="info"
               label="자기소개"
               value={info}
               onChange={(e) => setInfo(e.target.value)}
               error={alert.info}
               multiline
               rows={4}
               helperText={alert.info && '자기소개를 입력하세요.'}
            />

            <Button onClick={handleProfileChange} variant="contained">
               완료
            </Button>
         </Stack>
      </Container>
   )
}

export default MySetting
