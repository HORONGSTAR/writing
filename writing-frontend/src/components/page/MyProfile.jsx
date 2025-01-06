import { Avatar, Typography, Stack } from '@mui/material'

function MyProfile({ user }) {
   return (
      <>
         {user && (
            <Stack>
               <Avatar src={`${process.env.REACT_APP_API_URL}${user.avatar}`} sx={{ width: 150, height: 150 }} />
               <Typography variant="h6">{user.nick}</Typography>
               <Typography variant="caption">{user.email}</Typography>
               <Typography sx={{ whiteSpace: 'pre-wrap' }}>{user.info}</Typography>
            </Stack>
         )}
      </>
   )
}

export default MyProfile
