import PostDetail from '../components/post/PostDetail'
import { Container } from '@mui/material'

function PostPage({ auth }) {
   return (
      <Container>
         <PostDetail auth={auth} />
      </Container>
   )
}

export default PostPage
