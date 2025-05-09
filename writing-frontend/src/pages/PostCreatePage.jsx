import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { createPostThunk } from './../features/postSlice'
import PostForm from '../components/post/PostForm'
import { Container } from '@mui/material'

function PostCreatePage() {
   const dispatch = useDispatch()
   const handleSubmit = useCallback(
      (postData) => {
         dispatch(createPostThunk(postData))
            .unwrap()
            .then(() => (window.location.href = '/'))
            .catch((error) => {
               console.error(`게시물 등록 중 에러 \n : ${error}`)
            })
         return
      },
      [dispatch]
   )

   return (
      <Container>
         <PostForm onSubmit={handleSubmit} />
      </Container>
   )
}

export default PostCreatePage
