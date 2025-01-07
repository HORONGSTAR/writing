import { useEffect, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updatePostThunk, getPostByIdThunk } from './../features/postSlice'
import PostForm from '../components/post/PostForm'
import { Container, Snackbar } from '@mui/material'
import { LoadingBox, NoticeBox } from '../styles/StyledComponent'

function PostEditPage() {
   const { id } = useParams()
   const [open, setOpen] = useState(false)
   const { post, loading, error } = useSelector((state) => state.posts)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getPostByIdThunk(id))
   }, [dispatch, id])

   const handleSubmit = useCallback(
      (postData) => {
         dispatch(updatePostThunk({ id, postData }))
            .unwrap()
            .then(() => {
               window.location.href = '/'
            })
            .catch((error) => {
               console.error('게시물 등록 중 에러:', error)
               setOpen(true)
            })
      },
      [dispatch, id]
   )

   if (loading) {
      return <LoadingBox />
   }

   if (error) {
      return <NoticeBox>{error}</NoticeBox>
   }

   return (
      <Container>
         <PostForm onSubmit={handleSubmit} initialValues={post} />
         <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} message="게시물 등록에 실패했습니다." />
      </Container>
   )
}

export default PostEditPage
