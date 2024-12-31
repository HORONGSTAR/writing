import { List, ListItem, Avatar, Typography } from '@mui/material'

function FollowList({ users }) {
   return (
      <>
         {users &&
            users.map((user) => (
               <List key={'follow' + user.id}>
                  <ListItem>
                     <Avatar sx={{ width: 24, height: 24, marginRight: 0.5 }} />
                     <Typography>{user.nick}</Typography>
                  </ListItem>
                  <ListItem>
                     <Typography variant="body2">{user.info || '자기소개가 없습니다.'}</Typography>
                  </ListItem>
               </List>
            ))}
      </>
   )
}

export default FollowList
