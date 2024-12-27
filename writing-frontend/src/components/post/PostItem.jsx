import { Avatar, Typography, List, ListItem, Divider, Link } from '@mui/material'
import { Ellipsis } from '../../styles/StyledComponent'
import { Link as RouterLink } from 'react-router-dom'

import dayjs from 'dayjs'

function Postitem({ post }) {
   return (
      <List>
         <ListItem>
            <Link component={RouterLink} to={`post/${post.id}`} underline="none">
               <Typography variant="h6">{post.title}</Typography>
            </Link>
         </ListItem>
         <ListItem>
            <Ellipsis>{post.content}</Ellipsis>
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
   )
}

export default Postitem
