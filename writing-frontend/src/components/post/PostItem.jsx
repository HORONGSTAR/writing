import { Avatar, Typography, List, ListItem, Divider, Button } from '@mui/material'
import { Ellipsis } from '../../styles/StyledComponent'
import { Link as RouterLink } from 'react-router-dom'
import dayjs from 'dayjs'

function PostItem({ posts, line, profile }) {
   return (
      <>
         {posts?.length > 0 &&
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
                     <Button component={RouterLink} to={`/profile/${post.User.id}`} sx={{ color: 'inherit' }}>
                        <Avatar sx={{ width: 24, height: 24, marginRight: 0.5 }} />
                        {post.User.nick}
                     </Button>

                     <Typography variant="caption" sx={{ display: 'block', marginLeft: 'auto' }}>
                        {dayjs(post.createdAt).format('YYYY-MM-DD')}
                     </Typography>
                  </ListItem>
                  {index === posts?.length - 1 || <Divider />}
               </List>
            ))}
      </>
   )
}

export default PostItem
