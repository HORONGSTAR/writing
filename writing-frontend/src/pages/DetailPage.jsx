import PostDetail from '../components/post/PostDetail'
import CommentForm from '../components/comment/CommentForm'
import CommentItem from '../components/comment/CommentItem'
import { Container, Paper } from '@mui/material'
import { useEffect } from 'react'
import { getPostByIdThunk } from '../features/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function PostPage({ auth }) {
   const dispatch = useDispatch()
   const { loading, error, post, comments } = useSelector((state) => state.posts)
   const { id } = useParams()
   useEffect(() => {
      dispatch(getPostByIdThunk(id))
   }, [dispatch, id])

   return (
      <Container>
         <PostDetail id={id} auth={auth} post={post} />
         <Paper sx={{ background: '#eee', p: 1 }}>
            {comments?.length > 0 && <CommentItem comments={comments} />}

            <CommentForm id={id} />
         </Paper>
      </Container>
   )
}

export default PostPage
