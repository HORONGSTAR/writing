import FollowList from '../components/page/FollowList'
import { useLocation, useParams } from 'react-router-dom'
import { Container, Typography, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function FollowPage() {
   const { id, type } = useParams()
   const { user } = useSelector((state) => state.page)
   const [follow, setFollow] = useState([])

   useEffect(() => {
      setFollow()
   }, [follow])

   return (
      <Container>
         {type === 'followings' && (
            <>
               <Typography variant="h6">{user.nick}님의 팔로잉</Typography>
               <FollowList users={user?.Followings} />
            </>
         )}
         {type === 'followers' && (
            <>
               <Typography variant="h6">{user.nick}님의 팔로워</Typography>
               <FollowList users={user?.Followers} />
            </>
         )}
      </Container>
   )
}

export default FollowPage
