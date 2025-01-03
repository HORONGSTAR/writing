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
            .catch((err) => console.error(err))
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
