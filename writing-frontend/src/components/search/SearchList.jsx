import { List, ListItem, Typography, Avatar, Link, Divider, ListItemText } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Ellipsis } from '../../styles/StyledComponent'
import { NoticeBox } from '../../styles/StyledComponent'
import dayjs from 'dayjs'

export const SearchPostItem = ({ posts }) => {
   if (posts.length === 0) return <NoticeBox>게시글 검색 결과가 없습니다.</NoticeBox>
   return (
      <>
         {posts.map((post) => (
            <List key={'search-post' + post.id}>
               <ListItem>
                  <Link underline="hover" component={RouterLink} to={`/detail/${post.id}`}>
                     <Typography sx={{ fontWeight: 'bold' }}>{post.title}</Typography>
                  </Link>
               </ListItem>
               <ListItem>
                  <Typography variant="body2" color="#888">
                     {dayjs(post.createdAt).format('YYYY.MM.DD')}
                  </Typography>
                  <Typography variant="body2" color="#888" mx={1}>
                     —
                  </Typography>
                  <Ellipsis>
                     <Typography variant="body2" color="#888">
                        {post.content}
                     </Typography>
                  </Ellipsis>
               </ListItem>
            </List>
         ))}
      </>
   )
}
export const SearchUserItem = ({ users }) => {
   if (users.length === 0) return <NoticeBox>사용자 검색 결과가 없습니다.</NoticeBox>
   return (
      <>
         {users.map((user) => (
            <List key={'search-user' + user.id}>
               <ListItem component={RouterLink} to={`/profile/${user.id}`}>
                  <Avatar src={`${process.env.REACT_APP_API_URL}${user.avatar}`} sx={{ width: 24, height: 24, marginRight: 0.5 }} />
                  {user.nick}
               </ListItem>
               <ListItem>
                  <Ellipsis>{user.info || '등록된 자기 소개가 없습니다.'}</Ellipsis>
               </ListItem>
            </List>
         ))}
      </>
   )
}

export const SearchThemeItem = ({ themes }) => {
   if (themes.length === 0) return <NoticeBox>주제 검색 결과가 없습니다.</NoticeBox>
   return (
      <>
         {themes.map((theme) => (
            <List key={'search-theme' + theme.id}>
               <ListItem>
                  <Link underline="hover" component={RouterLink} to={`/theme/${theme.id}`}>
                     <Typography sx={{ fontWeight: 'bold' }}>{theme.keyword}</Typography>
                  </Link>
               </ListItem>
               <ListItem>
                  <Typography variant="body2" color="#888">
                     {dayjs(theme.createdAt).format('YYYY.MM.DD')}
                  </Typography>
                  <Typography variant="body2" color="#888" mx={1}>
                     —
                  </Typography>
                  <Ellipsis>
                     <Typography variant="body2" color="#888">
                        {theme.info || '등록된 소개가 없습니다.'}
                     </Typography>
                  </Ellipsis>
               </ListItem>
            </List>
         ))}
      </>
   )
}
