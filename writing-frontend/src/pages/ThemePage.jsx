import { Container, Stack, Box, Chip, Pagination, Typography, Button } from '@mui/material'
import ThemeForm from '../components/theme/ThemeForm'
import ThemeList from '../components/theme/ThemeList'
import { useDispatch, useSelector } from 'react-redux'
import { createThemeThunk } from '../features/themeSlice'
import { useCallback, useState, useEffect } from 'react'
import { getThemesThunk } from '../features/themeSlice'
import { LoadingBox, NoticeBox, ModalBox, ErrorBox } from '../styles/StyledComponent'
import { useParams } from 'react-router-dom'

function ThemePage({ user }) {
   const dispatch = useDispatch()
   const { id } = useParams()
   const [value, setValue] = useState(null)
   const [page, setPage] = useState(1)
   const [open, setOpen] = useState(false)
   const [index, setIndex] = useState(10)

   const { loading, error, themes, themeList, pagination } = useSelector((state) => state.themes)

   useEffect(() => {
      dispatch(getThemesThunk({ page: page, limit: 10 }))
      setValue(id)
   }, [dispatch, page, id])

   useEffect(() => {
      setIndex(themeList.length > 10 ? 10 : themeList.length)
   }, [themeList])

   const handleSubmit = useCallback(
      (themeData) => {
         dispatch(createThemeThunk(themeData))
            .unwrap()
            .then(() => {
               window.location.href = '/theme'
            })
            .catch((error) => {
               console.error(`주제 로드 중 에러 \n : ${error}`)
               setOpen(true)
            })
         return
      },
      [dispatch]
   )

   if (loading) return <LoadingBox />
   if (error) return <NoticeBox>{error}</NoticeBox>

   return (
      <Container>
         <Stack spacing={2}>
            <Stack spacing={2} direction={'row'}>
               <Typography variant="h2" color="secondary">
                  주제 모음집
               </Typography>
               {user && (
                  <ModalBox size="small" btnName="주제 등록">
                     <ThemeForm onSubmit={handleSubmit} user={user} />
                  </ModalBox>
               )}
            </Stack>

            <Box>
               {themeList.slice(0, index).map((theme) => (
                  <Chip
                     color={String(theme.id) === String(value) ? 'primary' : ''}
                     key={'theme' + theme.id}
                     label={theme.keyword}
                     onClick={() => (String(theme.id) === String(value) ? setValue(null) : setValue(theme.id))}
                  />
               ))}
               {index < themeList.length && (
                  <Button onClick={() => setIndex(index + 10)}>
                     더 보기({index}/{themeList.length})
                  </Button>
               )}
            </Box>

            {value ? (
               <ThemeList themes={themes.filter((theme) => String(theme.id) === String(value))} auth={user} />
            ) : (
               <ThemeList themes={themes} auth={user} />
            )}
            {themeList.length === 0 && <NoticeBox>등록된 글이 없습니다.</NoticeBox>}
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
               <Pagination count={pagination?.totalPages} page={page} onChange={(e, value) => setPage(value)} />
            </Stack>
         </Stack>
         <ErrorBox open={open} setOpen={setOpen} error={error} />
      </Container>
   )
}

export default ThemePage
