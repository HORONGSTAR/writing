import { Box, Avatar, Typography, List, ListItem, Divider } from '@mui/material'

function Postitem() {
   return (
      <List>
         <ListItem>
            <Typography variant="h4">Lorem ipsum</Typography>
         </ListItem>
         <ListItem>
            <Typography>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut alias perferendis
               aliquid, facilis nostrum nobis dolor, est delectus voluptate quidem blanditiis non
               nihil quo nulla cum quaerat, ea ab doloremque.
            </Typography>
         </ListItem>
         <ListItem>
            <Avatar />
            <Typography>이름</Typography>
            <Typography variant="caption" sx={{ display: 'block', marginLeft: 'auto' }}>
               2024-12-23
            </Typography>
         </ListItem>
         <Divider />
      </List>
   )
}

export default Postitem
