import { Stack, InputLabel, InputBase, Button } from '@mui/material'
import { useCallback, useState } from 'react'
import { BorderColor } from '@mui/icons-material'
import { createCommentThunk } from '../../features/commentSlice'
import { useDispatch } from 'react-redux'

function CommentForm({ initialValues, id }) {
   const [comment, setComment] = useState(initialValues?.comment || '')
   const dispatch = useDispatch()

   const handleOnSubmit = useCallback(() => {
      dispatch(createCommentThunk({ PostId: id, comment: comment }))
   }, [dispatch, id, comment])

   return (
      <>
         <InputLabel variant="standard" htmlFor="comment">
            <Stack spacing={1} direction="row" sx={{ color: 'initial', alignItems: 'center', p: 1 }}>
               <BorderColor fontSize="14px" />
               감상 작성하기
            </Stack>
         </InputLabel>
         <Stack spacing={1} direction="row" sx={{ alignItems: 'center', background: '#fff', p: 1 }}>
            <InputBase
               fullWidth
               inputProps={{
                  name: '감상 작성하기',
                  id: 'comment',
               }}
               value={comment}
               onChange={(e) => setComment(e.target.value)}
            />
            <Button variant="contained" size="small" onClick={handleOnSubmit}>
               등록
            </Button>
         </Stack>
      </>
   )
}

export default CommentForm
