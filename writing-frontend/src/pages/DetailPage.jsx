import PostDetail from '../components/post/PostDetail'
import CommentBox from '../components/comment/CommentBox'
import { Container, Paper, IconButton, Stack } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { getPostByIdThunk } from '../features/postSlice'
import { addLikemarkThunk, removeLikemarkThunk, addBookmarkThunk, removeBookmarkThunk } from '../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TurnedIn, TurnedInNot, Favorite, FavoriteBorder, Comment, CommentOutlined } from '@mui/icons-material'
import { LoadingBox, NoticeBox } from '../styles/StyledComponent'

function PostPage({ auth }) {
   const [onBookmark, setOnBookmark] = useState(false)
   const [onLikemark, setOnLikemark] = useState(false)
   const [onCommentBox, setOnCommentBox] = useState(false)

   const dispatch = useDispatch()
   const { loading, error, post, bookmarks, likemarks } = useSelector((state) => state.posts)
   const { id } = useParams()

   useEffect(() => {
      dispatch(getPostByIdThunk(id))
      if (bookmarks?.filter((bookmark) => bookmark.UserId === auth?.id).length > 0) {
         setOnBookmark(!onBookmark)
      }
      if (likemarks?.filter((likemark) => likemark.UserId === auth?.id).length > 0) {
         setOnLikemark(!onLikemark)
      }
   }, [dispatch, id, onBookmark, onLikemark])

   const handleLikemark = useCallback(() => {
      if (onLikemark) {
         dispatch(removeLikemarkThunk(id))
         setOnLikemark(false)
      } else {
         dispatch(addLikemarkThunk(id))
         setOnLikemark(true)
      }
   }, [dispatch, id, onLikemark])

   const handleBookmark = useCallback(() => {
      if (onBookmark) {
         dispatch(removeBookmarkThunk(id))
         setOnBookmark(false)
      } else {
         dispatch(addBookmarkThunk(id))
         setOnBookmark(true)
      }
   }, [dispatch, id, onBookmark])

   if (loading) {
      return <LoadingBox />
   }

   if (error) {
      return <NoticeBox>{error}</NoticeBox>
   }

   return (
      <Container>
         <PostDetail id={id} auth={auth} post={post} />
         <Stack direction="row">
            <IconButton color="secondary" aria-label="댓글" onClick={() => setOnCommentBox(!onCommentBox)}>
               {onCommentBox ? <Comment /> : <CommentOutlined />}
            </IconButton>
            <IconButton color="secondary" aria-label="좋아요" onClick={handleLikemark}>
               {onLikemark ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton color="secondary" aria-label="책갈피" onClick={handleBookmark}>
               {onBookmark ? <TurnedIn /> : <TurnedInNot />}
            </IconButton>
         </Stack>

         {onCommentBox && (
            <Paper sx={{ background: '#eee', p: 1 }}>
               <CommentBox id={id} auth={auth} />
            </Paper>
         )}
      </Container>
   )
}

export default PostPage
