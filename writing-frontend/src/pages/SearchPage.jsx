import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Container, Divider, Stack, Tab, Box, Paper, Chip, Typography } from '@mui/material'
import { searchResultThunk } from '../features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingBox, NoticeBox } from '../styles/StyledComponent'
import { useCallback, useState, useMemo } from 'react'
import SearchForm from '../components/search/SearchForm'
import { SearchUserItem, SearchPostItem, SearchThemeItem } from '../components/search/SearchList'

function SearchPage() {
   const dispatch = useDispatch()
   const [value, setValue] = useState('all')
   const handleChange = (event, newValue) => setValue(newValue)

   const handleOnSubmit = useCallback(
      (search) => {
         dispatch(searchResultThunk(search))
      },
      [dispatch, value]
   )

   const type = { all: '전체', post: '게시글', user: '사용자', theme: '주제' }
   const { posts, users, themes, loading, error } = useSelector((state) => state.search)

   const resultLength = useMemo(() => {
      return posts.length + users.length + themes.length
   }, [posts, users, themes])

   return (
      <Container sx={{ minHeight: 500 }}>
         <Stack spacing={2} alignItems={'center'}>
            <SearchForm onSubmit={handleOnSubmit} endpoint={value} />
         </Stack>
         {loading && <LoadingBox />}
         {error && <NoticeBox>{error}</NoticeBox>}
         <Paper sx={{ p: 2 }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
               <TabContext value={value} s>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                     <TabList onChange={handleChange} aria-label="검색 탭" variant="scrollable" allowScrollButtonsMobile>
                        <Tab label={`전체 ${resultLength}`} value="all" />
                        <Tab label={`게시글 ${posts.length}`} value="post" />
                        <Tab label={`사용자 ${users.length}`} value="user" />
                        <Tab label={`주제 ${themes.length}`} value="theme" />
                     </TabList>
                  </Box>
                  <TabPanel value="all">
                     {resultLength === 0 && <NoticeBox> 검색 결과가 없습니다.</NoticeBox>}
                     <Stack spacing={4}>
                        {posts.length > 0 && (
                           <Stack spacing={1}>
                              <Divider textAlign="left">
                                 <Chip label="게시글" size="small" />
                              </Divider>
                              <SearchPostItem posts={posts} />
                           </Stack>
                        )}

                        {users.length > 0 && (
                           <Stack spacing={1}>
                              <Divider textAlign="left">
                                 <Chip label="사용자" size="small" />
                              </Divider>
                              <SearchUserItem users={users} />
                           </Stack>
                        )}

                        {themes.length > 0 && (
                           <Stack spacing={1}>
                              <Divider textAlign="left">
                                 <Chip label="주제" size="small" />
                              </Divider>
                              <SearchThemeItem themes={themes} variant />
                           </Stack>
                        )}
                     </Stack>
                  </TabPanel>
                  <TabPanel value="post">
                     <SearchPostItem posts={posts} />
                  </TabPanel>
                  <TabPanel value="user">
                     <SearchUserItem users={users} />
                  </TabPanel>
                  <TabPanel value="theme">
                     <SearchThemeItem themes={themes} />
                  </TabPanel>
               </TabContext>
            </Box>
         </Paper>
      </Container>
   )
}

export default SearchPage
