import { Box, Stack, ListItem, Container, Typography } from '@mui/material'
import PostItem from '../post/PostItem'

function ThemeItem({ themes }) {
   return (
      <Stack spacing={2}>
         {themes.map((theme) => (
            <Box
               key={'theme' + theme.id}
               sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}
            >
               <Box
                  component="img"
                  src={`${process.env.REACT_APP_API_URL}${theme.background}`}
                  alt={theme.alt}
                  sx={{ width: '100%', display: 'block', position: 'relative' }}
               />
               <Box sx={{ position: 'absolute', color: '#fff' }}>
                  <Container>
                     <Typography variant="h4" textAlign="center">
                        {theme.keyword}
                     </Typography>
                     <PostItem posts={theme.Posts} />
                  </Container>
               </Box>
            </Box>
         ))}
      </Stack>
   )
}

export default ThemeItem
