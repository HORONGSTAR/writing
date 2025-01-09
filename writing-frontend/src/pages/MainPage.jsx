import PostItem from '../components/post/PostItem'
import ThemeItem from '../components/theme/ThemeItem'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Container, Grid2, Typography, Stack, Link, Pagination, Button, Box } from '@mui/material'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { getPostsThunk } from '../features/postSlice'
import { ThemeBanner, NoticeBox, LoadingBox } from '../styles/StyledComponent'

function MainPage() {
   const endpoint = useLocation().pathname
   const { loading, error, posts, pagination } = useSelector((state) => state.posts)
   const { themeList } = useSelector((state) => state.themes)
   const [page, setPage] = useState(1)

   const dispatch = useDispatch()
   const PostsLoad = useCallback(() => {
      dispatch(getPostsThunk({ page, limit: 5, endpoint }))
   }, [dispatch, page, endpoint])

   useEffect(() => {
      PostsLoad()
   }, [PostsLoad])

   const subtitleText = useMemo(() => {
      return endpoint === '/all' ? '전체 글' : '구독'
   }, [endpoint])

   if (loading) return <LoadingBox />
   if (error) return <NoticeBox>{error}</NoticeBox>

   return (
      <Container>
         {endpoint === '/' ? (
            <Grid2 container rowSpacing={8} columnSpacing={2}>
               <Grid2 size={{ xs: 12 }}>
                  <Stack spacing={1}>
                     <Typography variant="h5" color="secondary">
                        최근주제
                     </Typography>
                     <Box component={RouterLink} to={'/theme'}>
                        {themeList.length > 0 ? <ThemeItem theme={themeList[0]} /> : <ThemeBanner />}
                     </Box>
                  </Stack>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Stack direction={'row'} spacing={1} sx={{ alignItems: 'end' }}>
                     <Typography variant="h5" color="secondary">
                        전체 글
                     </Typography>
                     <Link component={RouterLink} to={'/all'} underline="hover" color="#888">
                        <Typography variant="button">더 보기</Typography>
                     </Link>
                  </Stack>
                  <Paper sx={{ height: '100%' }}>
                     <PostItem posts={posts.all} />
                  </Paper>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Stack direction={'row'} spacing={1} sx={{ alignItems: 'end' }}>
                     <Typography variant="h5" color="secondary">
                        구독
                     </Typography>
                     <Link component={RouterLink} to={'/follow'} underline="hover" color="#888">
                        <Typography variant="button">더 보기</Typography>
                     </Link>
                  </Stack>

                  <Paper sx={{ height: '100%' }}>
                     <PostItem posts={posts.follow} />
                  </Paper>
               </Grid2>
            </Grid2>
         ) : (
            <Stack spacing={2}>
               <Typography variant="h5" color="secondary">
                  {subtitleText}
               </Typography>
               <Paper>
                  <PostItem posts={posts} line={3} />
               </Paper>
               <Stack spacing={2} sx={{ alignItems: 'center' }}>
                  <Pagination count={pagination?.totalPages} page={page} onChange={(e, value) => setPage(value)} />
               </Stack>
            </Stack>
         )}
      </Container>
   )
}

export default MainPage
