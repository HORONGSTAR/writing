import { useParams } from 'react-router-dom'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileThunk, getProfileIdThunk } from '../features/pageSlice'
import { followUserThunk, unFollowUserThunk } from '../features/userSlice'
import { Box, Button, Typography, Stack, Container, Snackbar } from '@mui/material'
import { ModalBox, LoadingBox, NoticeBox } from '../styles/StyledComponent'
import FollowList from '../components/page/FollowList'
import EditProfile from '../components/page/EditProfile'
import MyProfile from '../components/page/MyProfile'
import ProfileTab from '../components/page/ProfileTab'

function UserPage({ auth }) {
   const { id } = useParams()
   const [followers, setFollowers] = useState(0)
   const [followings, setFollowings] = useState(0)
   const [follow, setFollow] = useState(false)
   const { user, loading, error } = useSelector((state) => state.page)
   const [open, setOpen] = useState(false)
   const [message, setMessage] = useState('')

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
               console.error('사용자 정보 가져오는 중 오류 발생:', error)
               setOpen(true)
               alert('사용자 정보 가져오기를 실패했습니다.', error)
            })
      } else {
         dispatch(getProfileThunk())
            .unwrap()
            .then((result) => {
               setFollowers(result.Followers.length)
               setFollowings(result.Followings.length)
            })
            .catch((error) => {
               console.error('사용자 정보 가져오는 중 오류 발생:', error)
               alert('사용자 정보 가져오기를 실패했습니다.', error)
            })
      }
   }, [dispatch, id])

   const buttonName = useMemo(() => {
      return <>{user?.Followers.filter((f) => f.id === auth?.id).length > 0 ? '언팔로우' : '팔로우'}</>
   }, [user?.Followers, auth?.id])

   useEffect(() => {
      fetchProfileData()
   }, [fetchProfileData, follow])

   const onClickFollow = useCallback(
      (userId) => {
         if (user.Followers.filter((f) => f.id === auth?.id).length > 0) {
            dispatch(unFollowUserThunk(userId))
               .unwrap()
               .then(() => {
                  setOpen(true)
                  setMessage('언팔로우 되었습니다!')
                  setFollow((prev) => !prev)
               })
               .catch((error) => {
                  console.error('팔로우 중 :', error)
                  setOpen(true)
                  setMessage('팔로우 중 문제가 발생했습니다.')
               })
         } else {
            dispatch(followUserThunk(userId))
               .unwrap()
               .then(() => {
                  setOpen(true)
                  setMessage('팔로우 되었습니다!')
                  setFollow((prev) => !prev)
               })
               .catch((error) => {
                  console.error('팔로우 중 :', error)
                  setOpen(true)
                  setMessage('팔로우 중 문제가 발생했습니다.')
               })
         }
      },
      [dispatch, user]
   )

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
                     <EditProfile />
                  </ModalBox>
               ) : (
                  <Button variant="outlined" onClick={() => onClickFollow(user.id)}>
                     {buttonName}
                  </Button>
               )}
            </Box>
         </Stack>
         <ProfileTab user={user} />
         <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} message={message} />
      </Container>
   )
}

export default UserPage
