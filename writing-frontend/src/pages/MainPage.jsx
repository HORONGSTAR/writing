import Postitem from '../components/post/PostItem'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Container, Grid2, Typography } from '@mui/material'
import { useEffect } from 'react'
import { getPostsThunk, getFolloingPostsThunk } from '../features/postSlice'

function MainPage() {
   const { loading, error, posts, followingPosts } = useSelector((state) => state.posts)

   const location = useLocation()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getPostsThunk())
      dispatch(getFolloingPostsThunk())
      console.log(followingPosts)
   }, [dispatch])

   return (
      <Container>
         {location.pathname === '/' && (
            <Grid2 container spacing={2}>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h5">전체 글</Typography>
                  <Paper>{posts.length > 0 && posts.map((post) => <Postitem key={'all' + post.id} post={post} />)}</Paper>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h5">구독</Typography>
                  <Paper>{followingPosts.length > 0 && followingPosts.map((post) => <Postitem key={'follow' + post.id} post={post} />)}</Paper>
               </Grid2>
            </Grid2>
         )}
         {location.pathname === '/main/all' && (
            <>
               <Typography variant="h5">전체 글</Typography>
               <Paper>{posts.length > 0 && posts.map((post) => <Postitem key={'all' + post.id} post={post} line={4} />)}</Paper>
            </>
         )}
         {location.pathname === '/main/follow' && (
            <>
               <Typography variant="h5">구독</Typography>
               <Paper>{followingPosts.length > 0 && followingPosts.map((post) => <Postitem key={'follow' + post.id} post={post} line={4} />)}</Paper>
            </>
         )}
      </Container>
   )
}

export default MainPage
