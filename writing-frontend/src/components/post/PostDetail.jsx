import { Avatar, Typography, List, ListItem, Divider } from '@mui/material'
import { getPostByIdThunk } from '../../features/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

function PostDetail() {
   const { loading, error, post } = useSelector((state) => state.posts)
   const dispatch = useDispatch()
   const { id } = useParams()

   useEffect(() => {
      dispatch(getPostByIdThunk(id))
   }, [dispatch])

   return (
      <>
         {post && (
            <List>
               <ListItem>
                  <Typography variant="h6">{post.title}</Typography>
               </ListItem>
               <ListItem>
                  <Typography>{post.content}</Typography>
               </ListItem>

               <ListItem>
                  <Avatar sx={{ width: 24, height: 24, marginRight: 0.5 }} />
                  {post.User.nick}
                  <Typography variant="caption" sx={{ display: 'block', marginLeft: 'auto' }}>
                     {dayjs(post.createdAt).format('YYYY-MM-DD')}
                  </Typography>
               </ListItem>
               <Divider />
            </List>
         )}
      </>
   )
}

export default PostDetail
