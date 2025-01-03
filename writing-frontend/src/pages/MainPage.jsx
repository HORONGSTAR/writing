import PostItem from '../components/post/PostItem'
import ThemeItem from '../components/theme/ThemeItem'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Container, Grid2, Typography, Stack, Divider, Pagination } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { getPostsThunk, getFolloingPostsThunk } from '../features/postSlice'
import { ThemeBanner, NoticeBox, LoadingBox } from '../styles/StyledComponent'

function MainPage({ user }) {
   const location = useLocation()
   const { loading, error, posts, followingPosts, pagination } = useSelector((state) => state.posts)
   const { themeList } = useSelector((state) => state.themes)
   const [page, setPage] = useState(1)
   const [value, setValue] = useState(null)

   const dispatch = useDispatch()

   const PostsLoad = useCallback(() => {
      if (user) dispatch(getFolloingPostsThunk({ page: page, limit: 10 }))
      if (location.pathname !== '/follow') dispatch(getPostsThunk({ page: page, limit: 10 }))
   }, [location, dispatch, user])

   useEffect(() => {
      PostsLoad()
   }, [PostsLoad])

   if (loading) {
      return <LoadingBox />
   }

   if (error) {
      return <NoticeBox>{error}</NoticeBox>
   }

   return (
      <Container>
         {location.pathname === '/' && (
            <Grid2 container rowSpacing={8} columnSpacing={2}>
               <Grid2 size={{ xs: 12 }}>
                  <Stack spacing={2}>
                     <Typography variant="h5" color="secondary">
                        최근 주제
                     </Typography>
                     <Divider />
                     {themeList.length > 0 ? <ThemeItem theme={themeList[0]} /> : <ThemeBanner />}
                  </Stack>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h5" color="secondary">
                     전체 글
                  </Typography>
                  <Paper sx={{ height: '100%' }}>
                     <PostItem posts={posts} />
                  </Paper>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Typography variant="h5" color="secondary">
                     구독
                  </Typography>
                  <Paper sx={{ height: '100%' }}>
                     {!followingPosts && <NoticeBox>등록된 글이 없습니다.</NoticeBox>}
                     <PostItem posts={followingPosts} />
                  </Paper>
               </Grid2>
            </Grid2>
         )}
         {location.pathname === '/all' && (
            <Stack spacing={2}>
               <Typography variant="h5" color="secondary">
                  전체 글
               </Typography>
               <Divider />
               <Paper>
                  {!posts && <NoticeBox>등록된 글이 없습니다.</NoticeBox>}
                  <PostItem posts={posts} line={3} />
               </Paper>
               <Stack spacing={2} sx={{ alignItems: 'center' }}>
                  <Pagination count={pagination?.totalPages} page={page} onChange={(e, value) => setPage(value)} />
               </Stack>
            </Stack>
         )}
         {location.pathname === '/follow' && (
            <Stack spacing={2}>
               <Typography variant="h5" color="secondary">
                  구독
               </Typography>
               <Divider />
               <Paper>
                  {!followingPosts && <NoticeBox>등록된 글이 없습니다.</NoticeBox>}
                  <PostItem posts={followingPosts} line={3} />
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
