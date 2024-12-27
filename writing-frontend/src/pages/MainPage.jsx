import Postitem from '../components/post/PostItem'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Container, Grid2, Typography } from '@mui/material'

function MainPage() {
   const { loading, error, posts } = useSelector((state) => state.posts)
   return (
      <Container>
         <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
               <Typography variant="h5">전체 글</Typography>
               <Paper>{posts.length > 0 && posts.map((post) => <Postitem key={'all' + post.id} post={post} />)}</Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
               <Typography variant="h5">구독</Typography>
               <Paper>{posts.length > 0 && posts.map((post) => <Postitem key={'follow' + post.id} post={post} />)}</Paper>
            </Grid2>
         </Grid2>
      </Container>
   )
}

export default MainPage
