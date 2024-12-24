import Postitem from '../components/post/PostItem'

import { Paper, Container, Grid2, Typography } from '@mui/material'

function Home() {
   return (
      <Container>
         <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
               <Typography variant="h5">전체 글</Typography>
               <Paper>
                  <Postitem />
                  <Postitem />
                  <Postitem />
               </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
               <Typography variant="h5">구독</Typography>
               <Paper>
                  <Postitem />
                  <Postitem />
                  <Postitem />
               </Paper>
            </Grid2>
         </Grid2>
      </Container>
   )
}

export default Home
