import { Box, Stack, Container, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import PostItem from '../post/PostItem'

function ThemeItem({ themes }) {
   return (
      <>
         {themes.map((theme) => (
            <Accordion key={'theme' + theme.id}>
               <AccordionSummary>
                  <Box
                     sx={{
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '180px',
                        background: theme.background,
                        textShadow: '0 0 8px #000',
                        color: '#fff',
                     }}
                  >
                     {theme?.background?.length > 7 && (
                        <Box
                           component="img"
                           src={`${theme.id !== 'preview' ? process.env.REACT_APP_API_URL : ''}${theme.background}`}
                           alt={theme.alt}
                           sx={{ width: '100%', display: 'block', position: 'relative' }}
                        />
                     )}
                     <Stack
                        sx={{
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}
                     >
                        <Typography variant="h4">{theme.keyword}</Typography>
                        <Typography>{theme.Posts?.length}편의 작품 투고</Typography>
                     </Stack>
                  </Box>
               </AccordionSummary>
               <AccordionDetails>
                  <PostItem posts={theme.Posts} />
               </AccordionDetails>
            </Accordion>
         ))}
      </>
   )
}

export default ThemeItem
