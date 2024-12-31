import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MyProfile from '../components/page/MyProfile'
import MySetting from '../components/page/MySetting'
import PostItem from '../components/post/PostItem'
import { Container, Box, Tab, List, ListItem } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPostsThunk } from '../features/postSlice'

function UserPage({ auth }) {
   const { id } = useParams()
   const [value, setValue] = useState('1')

   const { loading, error, posts } = useSelector((state) => state.posts)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getUserPostsThunk({ id: id || auth?.id }))
   }, [dispatch, id, auth])

   const handleChange = (event, newValue) => {
      setValue(newValue)
   }

   return (
      <Container>
         <MyProfile auth={auth} id={id} />
         <MySetting auth={auth} />
         <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                     <Tab label="작품 목록" value="1" />
                     <Tab label="책갈피" value="2" />
                     <Tab label="참여한 주제" value="3" />
                  </TabList>
               </Box>
               <TabPanel value="1">
                  <PostItem posts={posts} profile={true} />
               </TabPanel>
               <TabPanel value="2">Item Two</TabPanel>
               <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
         </Box>
      </Container>
   )
}

export default UserPage
