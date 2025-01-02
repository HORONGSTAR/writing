import { List, ListItem, Divider, Box } from '@mui/material'

function CommentItem({ comments }) {
   return (
      <List>
         {comments.map((comment) => (
            <Box key={comment.id}>
               <ListItem>{comment.comment}</ListItem>
               <Divider />
            </Box>
         ))}
      </List>
   )
}

export default CommentItem
