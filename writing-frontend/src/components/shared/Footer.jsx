import { Typography, Box, Divider, Container } from '@mui/material'

function Footer() {
   const BoxSx = {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      borderRadius: 2,
      '& p': {
         m: 1,
      },
   }

   return (
      <Container sx={{ color: 'text.secondary', mt: 10 }}>
         <Divider />
         <Box sx={BoxSx}>
            <Typography variant="body2">대표자명 : 박별</Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="body2">주소 : 인천 남동구 인주대로 593 엔타스빌딩 12층</Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="body2">연락처 : 032)123-4567</Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="body2">이메일 : admin@naver.com</Typography>
         </Box>
         <Box sx={BoxSx}>
            <Typography variant="body2">Copyright 2025. 글조각 All rights reserved.</Typography>
         </Box>
      </Container>
   )
}

export default Footer
