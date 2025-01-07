import { Avatar, Typography, List, ListItem, Divider, Box, Button, Stack, Chip } from '@mui/material'
import { deletePostThunk } from '../../features/postSlice'
import { Link as RouterLink } from 'react-router-dom'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

function PostDetail({ post, id, auth }) {
   const dispatch = useDispatch()

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
   }, [dispatch, id])

   return (
      <>
         {post && (
            <List>
               <ListItem>
                  <Typography variant="h4">{post.title}</Typography>
               </ListItem>
               <ListItem>
                  <Stack direction="row" component={RouterLink} to={`/profile/${post.User.id}`} sx={{ color: 'inherit' }}>
                     <Avatar src={`${process.env.REACT_APP_API_URL}${post.User.avatar}`} sx={{ width: 32, height: 32, marginRight: 0.5 }} />
                     <Stack>
                        {post.User.nick}
                        <Typography variant="caption" sx={{ display: 'block', marginLeft: 'auto' }}>
                           {dayjs(post.createdAt).format('YYYY-MM-DD')}
                        </Typography>
                     </Stack>
                  </Stack>
                  {auth?.id === post.UserId && (
                     <Box sx={{ marginLeft: 'auto' }}>
                        <Button onClick={onClickDelete}>삭제</Button>
                        <Button component={RouterLink} to={`/post/edit/${id}`}>
                           수정
                        </Button>
                     </Box>
                  )}
               </ListItem>
               <Divider />
               <ListItem>
                  <Typography sx={{ whiteSpace: 'pre-wrap' }}>{post.content}</Typography>
               </ListItem>
               <ListItem>
                  <Chip component={RouterLink} to={`/theme/${post.Theme.id}`} label={post.Theme.keyword} sx={{ cursor: 'pointer' }} />
               </ListItem>
            </List>
         )}
      </>
   )
}

export default PostDetail
