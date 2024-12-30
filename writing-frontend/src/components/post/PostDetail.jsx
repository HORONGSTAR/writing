import { Avatar, Typography, List, ListItem, Divider, Box, Button } from '@mui/material'
import { getPostByIdThunk, deletePostThunk } from '../../features/postSlice'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

function PostDetail() {
   const { loading, error, post } = useSelector((state) => state.posts)
   const dispatch = useDispatch()
   const { id } = useParams()

   useEffect(() => {
      dispatch(getPostByIdThunk(id))
   }, [dispatch])

   const onClickDelete = useCallback(() => {
      const check = window.confirm('게시물을 삭제하시겠습니까?')
      if (!check) return
      dispatch(deletePostThunk(id))
         .unwrap()
         .then(() => {
            window.location.href = '/'
         })
         .catch((error) => {
            console.error('게시물 삭제중 오류 발생', error)
            alert('게시물 삭제 중 오류가 발생했습니다.')
         })
   }, [dispatch])

   return (
      <>
         {post && (
            <List>
               <ListItem>
                  <Typography variant="h6">{post.title}</Typography>
                  <Box sx={{ marginLeft: 'auto' }}>
                     <Button onClick={onClickDelete}>삭제</Button>
                     <Button component={RouterLink} to={`/post/edit/${id}`}>
                        수정
                     </Button>
                  </Box>
               </ListItem>
               <Divider />
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
            </List>
         )}
      </>
   )
}

export default PostDetail
