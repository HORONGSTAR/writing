import { Avatar, Typography, List, ListItem, Divider, Stack } from '@mui/material'
import { Ellipsis } from '../../styles/StyledComponent'
import { Link as RouterLink } from 'react-router-dom'
import { NoticeBox } from '../../styles/StyledComponent'
import { useMemo } from 'react'
import dayjs from 'dayjs'

function PostItem({ posts, line }) {
   const items = useMemo(() => {
      return (
         <>
            {posts?.length > 0 ? (
               posts.map((post, index) => (
                  <List key={post.id}>
                     <ListItem>
                        <RouterLink to={`/detail/${post.id}`} underline="none">
                           <Typography variant="h6">{post.title}</Typography>
                        </RouterLink>
                     </ListItem>
                     <ListItem>
                        <Ellipsis $line={line}>{post.content}</Ellipsis>
                     </ListItem>
                     <ListItem>
                        <Stack direction="row" component={RouterLink} to={`/profile/${post.User.id}`} sx={{ color: 'inherit' }}>
                           <Avatar src={`${process.env.REACT_APP_API_URL}${post.User.avatar}`} sx={{ width: 24, height: 24, marginRight: 0.5 }} />
                           {post.User.nick}
                        </Stack>
                        <Typography variant="caption" sx={{ display: 'block', marginLeft: 'auto' }}>
                           {dayjs(post.createdAt).format('YYYY-MM-DD')}
                        </Typography>
                     </ListItem>

                     {index === posts?.length - 1 || <Divider />}
                  </List>
               ))
            ) : (
               <NoticeBox>등록된 글이 없습니다.</NoticeBox>
            )}
         </>
      )
   }, [posts])

   return items
}

export default PostItem
