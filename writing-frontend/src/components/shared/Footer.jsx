import { Typography, Stack, Divider } from '@mui/material'

function Footer() {
   return (
      <Stack spacing={4} sx={{ mt: 10 }}>
         <Divider />
         <Typography align="center" variant="body2" color="#aaa">
            Copyright 2025. 글조각 All rights reserved
         </Typography>
      </Stack>
   )
}

export default Footer
