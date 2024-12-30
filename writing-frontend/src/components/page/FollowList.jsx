import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem } from '@mui/material'
import { useEffect, useState } from 'react'

const FollowList = () => {
   const [follow, setFollow] = useState([])
   const { user } = useSelector((state) => state.page)
   useEffect(() => {
      setFollow()
   }, [follow])

   return (
      <List>
         {user?.Followings.map((following) => (
            <ListItem key={'following' + following.id}>{following.nick}</ListItem>
         ))}
         {user?.Followers.map((follower) => (
            <ListItem key={'follower' + follower.id}>{follower.nick}</ListItem>
         ))}
      </List>
   )
}

export default FollowList
