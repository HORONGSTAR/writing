import { TurnedIn, TurnedInNot, Favorite, FavoriteBorder, Comment, CommentOutlined } from '@mui/icons-material'
import { Container, Paper, IconButton, Stack } from '@mui/material'
import { LoadingBox, ErrorBox, NoticeBox } from '../styles/StyledComponent'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostByIdThunk } from '../features/postSlice'
import { addLmkThunk, removeLmkThunk, addBmkThunk, removeBmkThunk } from '../features/userSlice'
import PostDetail from '../components/post/PostDetail'
import CommentBox from '../components/comment/CommentBox'

function PostPage({ auth }) {
   const [onLikemark, setOnLikemark] = useState(false)
   const [likemarks, setLikemarks] = useState([])
   const [onBookmark, setOnBookmark] = useState(false)
   const [bookmarks, setBookmarks] = useState([])
   const [onCommentBox, setOnCommentBox] = useState(false)
   const [open, setOpen] = useState(false)
   const [errMsg, setErrMsg] = useState('')

   const dispatch = useDispatch()
   const { loading, error, post } = useSelector((state) => state.posts)
   const { id } = useParams()

   useEffect(() => {
      dispatch(getPostByIdThunk(id))
         .unwrap()
         .then((result) => {
            setLikemarks(result.post.LikemarkUser)
            setBookmarks(result.post.BookmarkUser)
         })
         .catch((error) => {
            setOpen(true)
            setErrMsg(error)
            console.error(error)
         })
      return
   }, [dispatch, id])

   useEffect(() => {
      likemarks.filter((user) => user.id === auth?.id).length > 0 ? setOnLikemark(true) : setOnLikemark(false)
      bookmarks.filter((user) => user.id === auth?.id).length > 0 ? setOnBookmark(true) : setOnBookmark(false)
   }, [likemarks, bookmarks, auth])

   const handleLikemark = useCallback(() => {
      if (onLikemark) {
         dispatch(removeLmkThunk(id))
            .unwrap()
            .then(() => setOnLikemark(false))
            .catch((error) => {
               setOpen(true)
               setErrMsg(error)
               console.error(error)
            })
         return
      } else {
         dispatch(addLmkThunk(id))
            .unwrap()
            .then(() => setOnLikemark(true))
            .catch((error) => {
               setOpen(true)
               setErrMsg(error)
               console.error(error)
            })
         return
      }
   }, [dispatch, id, onLikemark])

   const handleBookmark = useCallback(() => {
      if (onBookmark) {
         dispatch(removeBmkThunk(id))
            .unwrap()
            .then(() => setOnBookmark(false))
            .catch((error) => {
               setOpen(true)
               setErrMsg(error)
               console.error(error)
            })
         return
      } else {
         dispatch(addBmkThunk(id))
            .unwrap()
            .then(() => setOnBookmark(true))
            .catch((error) => {
               setOpen(true)
               setErrMsg(error)
               console.error(error)
            })
         return
      }
   }, [dispatch, id, onBookmark])

   if (loading) return <LoadingBox />
   if (error) return <NoticeBox>{error}</NoticeBox>

   return (
      <Container>
         <PostDetail id={id} auth={auth} post={post} />
         <Stack direction="row" sx={{ alignItems: 'center' }}>
            <IconButton color="secondary" aria-label="댓글" onClick={() => setOnCommentBox(!onCommentBox)}>
               {onCommentBox ? <Comment /> : <CommentOutlined />}
            </IconButton>
            <IconButton color="secondary" aria-label="좋아요" onClick={handleLikemark} disabled={!auth}>
               {onLikemark ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton color="secondary" aria-label="책갈피" onClick={handleBookmark} disabled={!auth}>
               {onBookmark ? <TurnedIn /> : <TurnedInNot />}
            </IconButton>
         </Stack>
         {onCommentBox && (
            <Paper sx={{ background: '#eee', p: 1 }}>
               <CommentBox id={id} auth={auth} />
            </Paper>
         )}
         <ErrorBox open={open} setOpen={setOpen} error={errMsg} />
      </Container>
   )
}

export default PostPage
