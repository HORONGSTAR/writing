import { Box, Stack, Typography } from '@mui/material'

function ThemeItem({ theme, fontsize }) {
   return (
      <Box
         sx={{
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '180px',
            textShadow: '0 0 4px #000',
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
            <Typography variant="h3" fontSize={fontsize}>
               {theme.keyword}
            </Typography>
            <Typography>글감 제공 : {theme.User?.nick || '익명'}</Typography>
            <Typography>{theme.Posts?.length || 0}편의 작품이 투고 되었습니다.</Typography>
         </Stack>
      </Box>
   )
}

export default ThemeItem
