import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Container, Stack, Tab, Box, Paper } from '@mui/material'
import { searchResultThunk } from '../features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingBox, NoticeBox, ErrorBox } from '../styles/StyledComponent'
import { useCallback, useState } from 'react'
import SearchForm from '../components/search/SearchForm'
import { SearchUserItem, SearchPostItem, SearchThemeItem } from '../components/search/SearchList'

function SearchPage() {
   const dispatch = useDispatch()
   const [open, setOpen] = useState(false)
   const [value, setValue] = useState('post')
   const { posts, users, themes, loading, error } = useSelector((state) => state.search)

   const handleOnSubmit = useCallback(
      (search) => {
         dispatch(searchResultThunk(search))
            .unwrap()
            .then()
            .catch((error) => {
               console.error(`검색 중 에러 \n : ${error}`)
               setOpen(true)
            })
         return
      },
      [dispatch]
   )

   return (
      <Container sx={{ minHeight: 500 }}>
         <Stack alignItems={'center'} my={2}>
            <SearchForm onSubmit={handleOnSubmit} endpoint={value} />
         </Stack>
         {loading && <LoadingBox />}
         {error && <NoticeBox>{error}</NoticeBox>}
         <Paper sx={{ p: 2 }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
               <TabContext value={value} s>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                     <TabList onChange={(event, newValue) => setValue(newValue)} aria-label="검색 탭" variant="scrollable" allowScrollButtonsMobile>
                        <Tab label={`게시글 ${posts.length}`} value="post" />
                        <Tab label={`사용자 ${users.length}`} value="user" />
                        <Tab label={`주제 ${themes.length}`} value="theme" />
                     </TabList>
                  </Box>
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
         <ErrorBox open={open} setOpen={setOpen} error={error} />
      </Container>
   )
}

export default SearchPage
