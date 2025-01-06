import { Container, Stack, Box, Chip, Pagination, Typography, Divider } from '@mui/material'
import ThemeForm from '../components/theme/ThemeForm'
import ThemeList from '../components/theme/ThemeList'
import { useDispatch, useSelector } from 'react-redux'
import { createThemeThunk } from '../features/themeSlice'
import { useCallback, useState, useEffect } from 'react'
import { ModalBox } from './../styles/StyledComponent'
import { getThemesThunk } from '../features/themeSlice'
import { LoadingBox, NoticeBox } from '../styles/StyledComponent'
import { useParams } from 'react-router-dom'

function ThemePage({ user }) {
   const { id } = useParams()
   const dispatch = useDispatch()
   const { loading, error, themes, themeList, pagination } = useSelector((state) => state.themes)
   const [value, setValue] = useState(id || null)
   const [page, setPage] = useState(1)

   useEffect(() => {
      dispatch(getThemesThunk({ page: page, limit: 10 }))
   }, [dispatch, page, value])

   const handleSubmit = useCallback(
      (themeData) => {
         dispatch(createThemeThunk(themeData))
            .unwrap()
            .then(() => {
               window.location.href = '/theme'
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
         <Stack spacing={2}>
            <Typography variant="h5" color="secondary">
               주제 모음집
            </Typography>
            <Divider />
            <Box>
               {themeList.map((theme) => (
                  <Chip
                     color={String(theme.id) === String(value) ? 'primary' : ''}
                     key={'theme' + theme.id}
                     label={theme.keyword}
                     onClick={() => (String(theme.id) === String(value) ? setValue(null) : setValue(theme.id))}
                  />
               ))}
            </Box>
            {user && (
               <ModalBox btnName="주제 등록">
                  <ThemeForm onSubmit={handleSubmit} user={user} />
               </ModalBox>
            )}

            {id ? <ThemeList themes={themes.filter((theme) => String(theme.id) === String(value))} /> : <ThemeList themes={themes} />}
            {themeList.length === 0 && <NoticeBox>등록된 글이 없습니다.</NoticeBox>}
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
               <Pagination count={pagination?.totalPages} page={page} onChange={(e, value) => setPage(value)} />
            </Stack>
         </Stack>
      </Container>
   )
}

export default ThemePage
