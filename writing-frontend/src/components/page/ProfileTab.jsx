import { useState } from 'react'
import PostItem from '../post/PostItem'
import { Box, Tab, List, ListItem, Typography, Divider } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { NoticeBox } from '../../styles/StyledComponent'
import { Link as RouterLink } from 'react-router-dom'
import dayjs from 'dayjs'

function UserPage({ user }) {
   const [value, setValue] = useState('1')
   const handleChange = (event, newValue) => setValue(newValue)

   return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
         <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
               <TabList onChange={handleChange} aria-label="프로필 탭">
                  <Tab label="작품 목록" value="1" />
                  <Tab label="책갈피" value="2" />
                  <Tab label="등록한 주제" value="3" />
               </TabList>
            </Box>
            <TabPanel value="1">
               <PostItem posts={user?.Posts} />
            </TabPanel>
            <TabPanel value="2">
               <PostItem posts={user?.BookmarkPost} />
            </TabPanel>
            <TabPanel value="3">
               {user?.Themes?.length > 0 ? (
                  user?.Themes?.map((theme, index) => (
                     <List key={theme.id} component={RouterLink} to={`/theme/${theme.id}`}>
                        <ListItem>
                           <Typography variant="h6">{theme.keyword}</Typography>
                           <Typography variant="caption" sx={{ display: 'block', marginLeft: 'auto' }}>
                              {dayjs(theme.createdAt).format('YYYY-MM-DD')}
                           </Typography>
                        </ListItem>
                        <ListItem>
                           <Typography variant="body2">{theme.Posts?.length || 0}편의 작품이 투고 되었습니다.</Typography>
                        </ListItem>
                        {index === user?.Themes?.length - 1 || <Divider />}
                     </List>
                  ))
               ) : (
                  <NoticeBox>등록된 글이 없습니다.</NoticeBox>
               )}
            </TabPanel>
         </TabContext>
      </Box>
   )
}

export default UserPage
