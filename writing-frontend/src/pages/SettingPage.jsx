import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileThunk, getProfileIdThunk } from '../features/pageSlice'
import { followUserThunk, unFollowUserThunk } from '../features/userSlice'
import { Box, Button, Typography, Stack, Container, Snackbar } from '@mui/material'
import { ModalBox, LoadingBox, NoticeBox } from '../styles/StyledComponent'

function SettingPage({ auth }) {
   const { user, loading, error } = useSelector((state) => state.page)
   const [open, setOpen] = useState(false)
   const [message, setMessage] = useState('')
   const [confirm, setConfirm] = useState('')
   const firstConfirm = useRef()

   const dispatch = useDispatch()

   if (loading) return <LoadingBox />
   if (error) return <NoticeBox>{error}</NoticeBox>

   return (
      <Container>
         <>회원 탈퇴</>
      </Container>
   )
}

export default SettingPage
