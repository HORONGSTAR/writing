import { Box, Stack, Typography, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'

function ThemeItem({ theme, fontsize }) {
   const location = useLocation()
   return (
      <Box
         sx={{
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '180px',
            textShadow: '0 0 8px #000',
            color: '#fff',
            position: 'relative',
         }}
      >
         {theme?.background?.length > 10 ? (
            <Box
               component="img"
               src={`${theme.id !== 'preview' ? process.env.REACT_APP_API_URL : ''}${theme.background}`}
               alt={theme.alt}
               sx={{ width: '100%', display: 'block' }}
            />
         ) : (
            <Box sx={{ width: '100%', height: '100%', display: 'block', background: theme.background || '#EEEEEE' }} />
         )}
         <Stack
            sx={{
               justifyContent: 'center',
               alignItems: 'center',
               position: 'absolute',
            }}
         >
            <Typography variant={fontsize || 'h4'}>{theme.keyword}</Typography>
            <Typography>글감 제공 : {theme.User?.nick || '익명'}</Typography>
            <Typography>{theme.Posts?.length || 0}편의 작품이 투고 되었습니다.</Typography>
         </Stack>
      </Box>
   )
}

export default ThemeItem
