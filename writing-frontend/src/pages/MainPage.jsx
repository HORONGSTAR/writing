import PostItem from '../components/post/PostItem'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Container, Grid2, Typography } from '@mui/material'
import { useEffect } from 'react'
import { getPostsThunk, getFolloingPostsThunk } from '../features/postSlice'

function MainPage() {
   const location = useLocation()
   const { loading, error, posts, followingPosts } = useSelector((state) => state.posts)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getPostsThunk())
      dispatch(getFolloingPostsThunk())
   }, [dispatch])

   return (
      <Container>
         {location.pathname === '/' && (
            <Grid2 container spacing={2}>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h5">전체 글</Typography>
                  <Paper>
                     <PostItem posts={posts} />
                  </Paper>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h5">구독</Typography>
                  <Paper>
                     <PostItem posts={followingPosts} />
                  </Paper>
               </Grid2>
            </Grid2>
         )}
         {location.pathname === '/all' && (
            <>
               <Typography variant="h5">전체 글</Typography>
               <Paper>
                  <PostItem posts={posts} line={3} />
               </Paper>
            </>
         )}
         {location.pathname === '/follow' && (
            <>
               <Typography variant="h5">구독</Typography>
               <Paper>
                  <PostItem posts={followingPosts} line={3} />
               </Paper>
            </>
         )}
      </Container>
   )
}

export default MainPage
