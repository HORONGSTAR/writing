import { Container, Stack, Box, Chip, Pagination, Typography, Divider } from '@mui/material'
import ThemeForm from '../components/theme/ThemeForm'
import ThemeList from '../components/theme/ThemeList'
import { useDispatch, useSelector } from 'react-redux'
import { createThemeThunk } from '../features/themeSlice'
import { useCallback, useState, useEffect } from 'react'
import { ModalBox } from './../styles/StyledComponent'
import { getThemesThunk } from '../features/themeSlice'
import { ThemeBanner, LoadingBox, NoticeBox } from '../styles/StyledComponent'

function ThemePage({ user }) {
   const dispatch = useDispatch()
   const [page, setPage] = useState(1)
   const { loading, error, themes, themeList, pagination } = useSelector((state) => state.themes)
   const [value, setValue] = useState(null)

   useEffect(() => {
      dispatch(getThemesThunk({ page: page, limit: 10 }))
   }, [dispatch, page])

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
      [dispatch]
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
                     color={theme.id === value?.id ? 'primary' : ''}
                     key={'theme' + theme.id}
                     label={theme.keyword}
                     onClick={() => (theme.id === value?.id ? setValue(null) : setValue(theme))}
                  />
               ))}
            </Box>
            {user && (
               <ModalBox btnName="주제 등록">
                  <ThemeForm onSubmit={handleSubmit} user={user} />
               </ModalBox>
            )}

            {value ? <ThemeList themes={themes.filter((theme) => theme.id === value.id)} /> : <ThemeList themes={themes} />}
            {themeList.length === 0 && <ThemeBanner />}
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
               <Pagination count={pagination?.totalPages} page={page} onChange={(e, value) => setPage(value)} />
            </Stack>
         </Stack>
      </Container>
   )
}

export default ThemePage
