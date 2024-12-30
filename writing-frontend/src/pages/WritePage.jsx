import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPostThunk } from './../features/postSlice'

import PostForm from '../components/post/PostForm'
import { Container } from '@mui/material'

function PostPage() {
   const location = useLocation()
   const dispatch = useDispatch()
   console.log(location)
   const handleCreatePost = useCallback(
      (postDate) => {
         dispatch(createPostThunk(postDate))
            .unwrap()
            .then(() => (window.location.href = '/'))
            .catch((err) => console.error(err))
         return
      },
      [dispatch]
   )

   return (
      <Container>
         <PostForm onSubmit={handleCreatePost} />
      </Container>
   )
}

export default PostPage
