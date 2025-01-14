import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileThunk, getProfileIdThunk } from '../features/pageSlice'
import { followUserThunk, unFollowUserThunk } from '../features/userSlice'
import { editUserThunk } from '../features/authSlice'
import { Box, Button, Typography, Stack, Container } from '@mui/material'
import { ModalBox, LoadingBox, ErrorBox, NoticeBox } from '../styles/StyledComponent'
import FollowList from '../components/page/FollowList'
import EditProfile from '../components/page/EditProfile'
import MyProfile from '../components/page/MyProfile'
import ProfileTab from '../components/page/ProfileTab'

function UserPage({ auth }) {
   const { id } = useParams()
   const [followers, setFollowers] = useState(0)
   const [followings, setFollowings] = useState(0)
   const [follow, setFollow] = useState(false)
   const [open, setOpen] = useState(false)
   const [errMsg, setErrMsg] = useState('')
   const { user, loading, error } = useSelector((state) => state.page)

   const dispatch = useDispatch()
   const fetchProfileData = useCallback(() => {
      if (id) {
         dispatch(getProfileIdThunk(id))
            .unwrap()
            .then((result) => {
               setFollowers(result.Followers.length)
               setFollowings(result.Followings.length)
            })
            .catch((error) => {
               setOpen(true)
               setErrMsg(error)
               console.error(error)
            })
         return
      } else {
         dispatch(getProfileThunk())
            .unwrap()
            .then((result) => {
               setFollowers(result.Followers.length)
               setFollowings(result.Followings.length)
            })
            .catch((error) => {
               setOpen(true)
               setErrMsg(error)
               console.error(error)
            })
         return
      }
   }, [dispatch, id])

   const handleEditProfile = useCallback(
      (formData) => {
         dispatch(editUserThunk(formData))
            .unwrap()
            .then(() => (window.location.href = '/profile'))
            .catch((error) => {
               setOpen(true)
               setErrMsg(error)
               console.error(error)
            })
         return
      },
      [dispatch]
   )

   const onClickFollow = useCallback(
      (userId) => {
         if (user.Followers.filter((f) => f.id === auth?.id).length > 0) {
            dispatch(unFollowUserThunk(userId))
               .unwrap()
               .then(() => {
                  setFollow((prev) => !prev)
               })
               .catch((error) => {
                  setOpen(true)
                  setErrMsg(error)
                  console.error(error)
               })
            return
         } else {
            dispatch(followUserThunk(userId))
               .unwrap()
               .then(() => {
                  setFollow((prev) => !prev)
               })
               .catch((error) => {
                  setOpen(true)
                  setErrMsg(error)
                  console.error(error)
               })
            return
         }
      },
      [dispatch, user, auth]
   )

   useEffect(() => {
      fetchProfileData()
   }, [fetchProfileData, follow])

   const buttonName = useMemo(() => {
      return user?.Followers.filter((f) => f.id === auth?.id).length > 0 ? '언팔로우' : '팔로우'
   }, [user?.Followers, auth?.id])

   if (loading) return <LoadingBox />
   if (error) return <NoticeBox>{error}</NoticeBox>

   return (
      <Container>
         <Stack>
            <MyProfile user={user} />
            <Box>
               <ModalBox variant="text" btnName={`${followings} 팔로잉`}>
                  <Typography variant="h6">{user?.nick}님의 팔로잉</Typography>
                  <FollowList users={user?.Followings} />
               </ModalBox>
               <ModalBox variant="text" btnName={`${followers} 팔로워`}>
                  <Typography variant="h6">{user?.nick}님의 팔로워</Typography>
                  <FollowList users={user?.Followers} />
               </ModalBox>
            </Box>
            <Box>
               {!id || String(auth?.id) === String(id) ? (
                  <ModalBox btnName={'프로필 편집'}>
                     <EditProfile onSudmit={handleEditProfile} />
                  </ModalBox>
               ) : (
                  <Button variant="outlined" onClick={() => onClickFollow(user.id)}>
                     {buttonName}
                  </Button>
               )}
            </Box>
         </Stack>
         <ProfileTab user={user} />
         <ErrorBox open={open} setOpen={setOpen}>
            {errMsg}
         </ErrorBox>
      </Container>
   )
}

export default UserPage
