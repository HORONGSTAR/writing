import { Avatar, Typography, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { NoticeBox } from '../../styles/StyledComponent'
import { useMemo } from 'react'

function FollowList({ users }) {
   const items = useMemo(() => {
      return (
         <>
            {users ? (
               users.map((user) => (
                  <Stack direction="row" key={'follow' + user.id} sx={{ alignItems: 'end' }} spacing={1}>
                     <Stack direction="row" component={RouterLink} to={`/profile/${user.id}`} sx={{ color: 'inherit', alignItems: 'center' }}>
                        <Avatar src={`${process.env.REACT_APP_API_URL}${user.avatar}`} sx={{ width: 24, height: 24, marginRight: 0.5 }} />
                        {user.nick}
                     </Stack>

                     <Typography variant="caption">{user.email}</Typography>
                  </Stack>
               ))
            ) : (
               <NoticeBox>팔로 중인 계정이 없습니다.</NoticeBox>
            )}
         </>
      )
   }, [users])

   return items
}

export default FollowList
