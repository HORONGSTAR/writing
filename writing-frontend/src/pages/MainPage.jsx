import PostItem from '../components/post/PostItem'
import ThemeItem from '../components/theme/ThemeItem'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Container, Grid2, Typography, Stack, Divider, Pagination } from '@mui/material'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { getPostsThunk } from '../features/postSlice'
import { ThemeBanner, NoticeBox, LoadingBox } from '../styles/StyledComponent'

function MainPage({ user, endpoint }) {
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

   const noticeBoxItem = useMemo(() => {
      return posts?.follow?.length === 0 && <NoticeBox>{user ? '등록된 글이 없습니다.' : '로그인해서 다양한 작가님을 구독해보세요!'}</NoticeBox>
   }, [posts, user])

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
                  <Stack spacing={2}>
                     <Subtitle text={'최근 주제'} />
                     <Divider />
                     {themeList.length > 0 ? <ThemeItem theme={themeList[0]} /> : <ThemeBanner />}
                  </Stack>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Subtitle text={'전체 글'} />
                  <Paper sx={{ height: '100%' }}>
                     {posts.length === 0 && <NoticeBox>등록된 글이 없습니다.</NoticeBox>}
                     <PostItem posts={posts.all} />
                  </Paper>
               </Grid2>
               <Grid2 size={{ xs: 12, sm: 6 }}>
                  <Subtitle text={'구독'} />
                  <Paper sx={{ height: '100%' }}>
                     {noticeBoxItem}
                     <PostItem posts={posts.follow} />
                  </Paper>
               </Grid2>
            </Grid2>
         ) : (
            <Stack spacing={2}>
               <Subtitle text={subtitleText} />
               <Divider />
               <Paper>
                  {posts.length === 0 && <NoticeBox>등록된 글이 없습니다.</NoticeBox>}
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

const Subtitle = ({ text }) => {
   return (
      <Typography variant="h5" color="secondary">
         {text}
      </Typography>
   )
}
