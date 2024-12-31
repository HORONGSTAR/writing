import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileThunk, getProfileIdThunk } from '../../features/pageSlice'
import { followUserThunk, unFollowUserThunk } from '../../features/userSlice'
import { Box, List, ListItem, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

function MyProfile({ auth }) {
   const { id } = useParams()
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
   }, [dispatch, id])

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
               <List>
                  <ListItem>{user.email}</ListItem>
                  <ListItem>{user.nick}</ListItem>
                  <ListItem>자기소개</ListItem>
                  <ListItem>
                     <Button component={RouterLink} to={`/profile/${user.id}/followings`}>
                        {followings} 팔로잉
                     </Button>
                     <Button component={RouterLink} to={`/profile/${user.id}/followers`}>
                        {followers} 팔로워
                     </Button>
                  </ListItem>
                  <ListItem>
                     {!id || String(auth?.id) === String(id) ? (
                        <Button component={RouterLink} to={`/setting`}>
                           계정설정
                        </Button>
                     ) : (
                        <Button onClick={() => onClickFollow(`${user.id}`)}>{buttonName}</Button>
                     )}
                  </ListItem>
               </List>
            </Box>
         )}
      </>
   )
}

export default MyProfile
