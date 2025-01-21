import { Avatar, Stack, Divider, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { deleteAlarmByIdThunk } from '../../features/alarmSlice'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

function AlarmList({ alarmList }) {
   const page = {
      1: '/profile/',
      2: '/detail/',
      3: '/detail/',
   }

   const message = {
      1: '님이 나를 팔로우 했습니다.',
      2: '님이 내 게시글에 감상을 남겼습니다.',
      3: '님이 내 게시글을 좋아합니다.',
   }

   const dispatch = useDispatch()
   const handleOnClick = useCallback(
      (id) => {
         dispatch(deleteAlarmByIdThunk(id))
      },
      [dispatch]
   )

   return (
      <Stack spacing={1}>
         {alarmList.map((alarm, index) => (
            <Box key={'alarm' + alarm.id}>
               <Stack direction="row" p={2} onClick={() => handleOnClick(alarm.id)} component={RouterLink} to={page[alarm.category] + alarm.linkId}>
                  <Avatar src={`${process.env.REACT_APP_API_URL}${alarm.FromUser.avatar}`} sx={{ width: 24, height: 24, marginRight: 0.5 }} />
                  {alarm.FromUser.nick}
                  {message[alarm.category]}
               </Stack>
               {index === alarmList?.length - 1 || <Divider />}
            </Box>
         ))}
      </Stack>
   )
}

export default AlarmList
