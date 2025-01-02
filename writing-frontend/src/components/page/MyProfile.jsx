import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileThunk, getProfileIdThunk } from '../../features/pageSlice'
import { followUserThunk, unFollowUserThunk } from '../../features/userSlice'
import { Box, Button, Avatar, Typography, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ModalBox } from '../../styles/StyledComponent'
import MySetting from './MySetting'

function MyProfile({ auth, id }) {
   const [followers, setFollowers] = useState(0)
   const [followings, setFollowings] = useState(0)
   const [follow, setFollow] = useState(false)
   const [buttonName, setButtonName] = useState('')

   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.page)

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
   }, [dispatch, id, followers, followings])

   useEffect(() => {
      fetchProfileData()
      if (user?.Followers.filter((f) => f.id === auth?.id).length > 0) {
         setButtonName('언팔로우')
      } else {
         setButtonName('팔로우')
      }
   }, [fetchProfileData, follow])

   const onClickFollow = useCallback(
      (userId) => {
         if (user.Followers.filter((f) => f.id === auth?.id).length > 0) {
            dispatch(unFollowUserThunk(userId))
               .unwrap()
               .then(() => {
                  alert('언팔로우 되었습니다!')
                  setFollow((prev) => !prev)
               })
               .catch((error) => {
                  console.error('팔로우 중 :', error)
                  alert('언팔로우를 실패했습니다.', error)
               })
         } else {
            dispatch(followUserThunk(userId))
               .unwrap()
               .then(() => {
                  alert('팔로우 되었습니다!')
                  setFollow((prev) => !prev)
               })
               .catch((error) => {
                  console.error('팔로우 중 :', error)
                  alert('팔로우를 실패했습니다.', error)
               })
         }
      },
      [dispatch, user]
   )

   return (
      <>
         {user && (
            <Box>
               <Stack>
                  <Avatar src={`${process.env.REACT_APP_API_URL}${user.avatar}`} sx={{ width: 150, height: 150 }} />
                  <Typography variant="h6">{user.nick}</Typography>
                  <Typography variant="caption">{user.email}</Typography>
                  <Typography sx={{ whiteSpace: 'pre-wrap' }}>{user.info}</Typography>
                  <Box>
                     <Button component={RouterLink} to={`/profile/${user.id}/followings`}>
                        {followings} 팔로잉
                     </Button>
                     <Button component={RouterLink} to={`/profile/${user.id}/followers`}>
                        {followers} 팔로워
                     </Button>
                  </Box>
                  <Box>
                     {!id || String(auth?.id) === String(id) ? (
                        <ModalBox btnName={'계정 설정'}>
                           <MySetting />
                        </ModalBox>
                     ) : (
                        <Button variant="outlined" onClick={() => onClickFollow(user.id)}>
                           {buttonName}
                        </Button>
                     )}
                  </Box>
               </Stack>
            </Box>
         )}
      </>
   )
}

export default MyProfile
