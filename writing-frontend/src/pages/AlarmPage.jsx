import { Container, Typography, Button, Stack, Divider } from '@mui/material'
import { getAlarmListThunk, deleteAlarmListThunk } from '../features/alarmSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { LoadingBox, NoticeBox } from '../styles/StyledComponent'
import AlarmList from '../components/page/AlarmList'

function AlarmPage() {
   const dispatch = useDispatch()
   const { alarmList, loading, error } = useSelector((state) => state.alarm)

   useEffect(() => {
      dispatch(getAlarmListThunk())
   }, [dispatch])

   const handleOnClick = useCallback(() => {
      dispatch(deleteAlarmListThunk())
   }, [dispatch])

   if (loading) return <LoadingBox />
   if (error) return <NoticeBox>{error}</NoticeBox>

   return (
      <Container>
         <Stack spacing={2}>
            <Stack direction="row">
               <Typography variant="h5" color="secondary">
                  알림
               </Typography>
               <Button onClick={handleOnClick} size="small" variant="outlined" sx={{ display: 'block', marginLeft: 'auto' }}>
                  알림 전체 확인
               </Button>
            </Stack>
            <Divider />
            {alarmList.length !== 0 ? <AlarmList alarmList={alarmList} /> : <NoticeBox>새로운 알림이 없습니다.</NoticeBox>}
         </Stack>
      </Container>
   )
}

export default AlarmPage
