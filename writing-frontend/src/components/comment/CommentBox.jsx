import { List, ListItem, Avatar, Divider, Stack, IconButton, InputBase, Button, Typography } from '@mui/material'
import { getCommentsThunk, createCommentThunk, updateCommentThunk, deleteCommentThunk } from '../../features/commentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { Create, Delete } from '@mui/icons-material'
import dayjs from 'dayjs'

function CommentBox({ id, auth }) {
   const dispatch = useDispatch()
   const [comment, setComment] = useState('')
   const [editComment, setEditComment] = useState('')
   const [editCommentId, setEditCommentId] = useState('')

   const { items, loading, error } = useSelector((state) => state.comments)

   const handleEditComment = useCallback(
      (item) => {
         if (!editCommentId) {
            setEditComment(item.comment)
            setEditCommentId(item.id)
         } else {
            dispatch(updateCommentThunk({ id: editCommentId, commentData: { comment: editComment } }))
               .unwrap()
               .then(() => {
                  setEditComment('')
                  setEditCommentId('')
               })
               .catch((err) => console.error(err))
         }
      },
      [dispatch, editComment, editCommentId]
   )

   const handleDeleteComment = useCallback(
      (itemId) => {
         dispatch(deleteCommentThunk(itemId))
            .unwrap()
            .then()
            .catch((err) => console.error(err))
         return
      },
      [dispatch]
   )

   const handleOnSubmit = useCallback(() => {
      dispatch(createCommentThunk({ PostId: id, comment: comment }))
         .unwrap()
         .then(() => setComment(''))
         .catch((err) => console.error(err))
      return
   }, [dispatch, id, comment])

   useEffect(() => {
      dispatch(getCommentsThunk(id))
   }, [dispatch, id])

   return (
      <>
         <Stack spacing={1} direction="row" sx={{ alignItems: 'center', background: '#fff', p: 1 }}>
            <InputBase fullWidth placeholder="감상 작성하기" value={comment} onChange={(e) => setComment(e.target.value)} />
            <Button variant="contained" size="small" onClick={handleOnSubmit}>
               등록
            </Button>
         </Stack>
         {items &&
            items.map((item) => (
               <List key={`post${id}/user${item.User.id}/comment${item.id}`}>
                  <Divider />
                  <ListItem>
                     <Avatar src={`${process.env.REACT_APP_API_URL}${item.User.avatar}`} sx={{ width: 24, height: 24, marginRight: 0.5 }} />
                     {item.User.nick}

                     {auth?.id === item.User.id && (
                        <>
                           <IconButton aria-label="수정" size="small" onClick={() => handleEditComment(item)}>
                              <Create fontSize="small" />
                           </IconButton>
                           <IconButton aria-label="삭제" size="small" onClick={() => handleDeleteComment(item.id)}>
                              <Delete fontSize="small" />
                           </IconButton>
                        </>
                     )}
                     <Typography variant="caption" sx={{ display: 'block', marginLeft: 'auto' }}>
                        {dayjs(item.createdAt).format('YYYY-MM-DD HH:MM')}
                     </Typography>
                  </ListItem>
                  {editCommentId === item.id ? (
                     <ListItem sx={{ background: '#fff', p: 1 }}>
                        <InputBase
                           fullWidth
                           placeholder="감상 작성하기"
                           autoFocus
                           value={editComment}
                           onChange={(e) => setEditComment(e.target.value)}
                        />
                     </ListItem>
                  ) : (
                     <>
                        <ListItem>{item.comment}</ListItem>
                     </>
                  )}
               </List>
            ))}
      </>
   )
}

export default CommentBox
