import { useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updatePostThunk, getPostByIdThunk } from './../features/postSlice'
import PostForm from '../components/post/PostForm'
import { Container } from '@mui/material'
import { LoadingBox, NoticeBox } from '../styles/StyledComponent'

function PostEditPage() {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { post, loading, error } = useSelector((state) => state.posts)

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
               alert('게시물 등록에 실패했습니다.')
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
      </Container>
   )
}

export default PostEditPage
