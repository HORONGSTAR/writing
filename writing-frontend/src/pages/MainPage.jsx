import { Paper, Container, Grid2, Stack, Pagination, Box } from '@mui/material'
import { ThemeBanner, NoticeBox, LoadingBox, SubTitle } from '../styles/StyledComponent'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { getPostsThunk } from '../features/postSlice'
import PostItem from '../components/post/PostItem'
import ThemeItem from '../components/theme/ThemeItem'

function MainPage() {
   const endpoint = useLocation().pathname
   const [open, setOpen] = useState(false)
   const [page, setPage] = useState(1)

   const { loading, error, posts, pagination } = useSelector((state) => state.posts)
   const { themeList } = useSelector((state) => state.themes)

   const subTitle = { '/all': '전체 글', '/follow': '구독' }

   const dispatch = useDispatch()
   const PostsLoad = useCallback(() => {
      dispatch(getPostsThunk({ page, limit: 10, endpoint }))
      return
   }, [dispatch, page, endpoint])

   useEffect(() => {
      PostsLoad()
   }, [PostsLoad])

   if (loading) return <LoadingBox />
   if (error) return <NoticeBox>{error}</NoticeBox>

   return (
      <Container>
         {endpoint === '/' ? (
            <Grid2 container rowSpacing={8} columnSpacing={2}>
               <Grid2 size={{ xs: 12 }}>
                  <SubTitle title="최근 주제" />
                  <Box width="100%" component={RouterLink} to={'/theme'}>
                     {themeList[0] ? <ThemeItem theme={themeList[0]} /> : <ThemeBanner />}
                  </Box>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <SubTitle title="전체 글" />
                  <Paper sx={{ height: '100%' }}>
                     <PostItem posts={posts?.all} />
                  </Paper>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <SubTitle title="구독" />
                  <Paper sx={{ height: '100%' }}>
                     <PostItem posts={posts?.follow} />
                  </Paper>
               </Grid2>
            </Grid2>
         ) : (
            <Stack spacing={2}>
               <SubTitle title={subTitle[endpoint]} />
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
