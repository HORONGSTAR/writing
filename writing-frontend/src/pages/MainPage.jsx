import PostItem from '../components/post/PostItem'
import ThemeItem from '../components/theme/ThemeItem'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Container, Grid2, Typography, Stack, Link, Pagination, Button, Box } from '@mui/material'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { getPostsThunk } from '../features/postSlice'
import { ThemeBanner, NoticeBox, LoadingBox, LinkBox } from '../styles/StyledComponent'

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
                     <Typography variant="h2" color="secondary">
                        최근 주제
                     </Typography>
                     <Box component={RouterLink} to={'/theme'}>
                        {themeList.length > 0 ? <ThemeItem theme={themeList[0]} /> : <ThemeBanner />}
                     </Box>
                  </Stack>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <MainItems posts={posts.all} to="/all">
                     전체 글
                  </MainItems>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <MainItems posts={posts.follow} to="/follow">
                     구독
                  </MainItems>
               </Grid2>
            </Grid2>
         ) : (
            <Stack spacing={2}>
               <Typography variant="h2" color="secondary">
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

export const MainItems = ({ posts, children, to }) => {
   return (
      <>
         <Stack direction={'row'} spacing={1} sx={{ alignItems: 'end' }}>
            <Typography variant="h2" color="secondary">
               {children}
            </Typography>
            <LinkBox to={to} variant="button" color="#888">
               더 보기
            </LinkBox>
         </Stack>

         <Paper sx={{ height: '100%' }}>
            <PostItem posts={posts} />
         </Paper>
      </>
   )
}
