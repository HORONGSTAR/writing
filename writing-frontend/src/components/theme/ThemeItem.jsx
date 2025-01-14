import { Box, Stack, Typography } from '@mui/material'

function ThemeItem({ theme, brightness }) {
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
            background: '#000',
         }}
      >
         {theme?.background?.length > 10 ? (
            <Box
               component="img"
               src={`${theme.id !== 'preview' ? process.env.REACT_APP_API_URL : ''}${theme.background}`}
               alt={theme.alt}
               sx={{ width: '100%', display: 'block', opacity: (brightness || 10) * 0.1 }}
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
            <Typography variant="h3" fontSize={{ xs: 22, sm: 28 }}>
               {theme.keyword}
            </Typography>
            <Typography variant="body2">글감 제공 : {theme.User?.nick || '익명'}</Typography>
            <Typography variant="body2">{theme.Posts?.length || 0}편의 작품이 투고 되었습니다.</Typography>
         </Stack>
      </Box>
   )
}

export default ThemeItem
