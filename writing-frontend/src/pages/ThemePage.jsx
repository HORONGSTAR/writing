import { Button, Container, Stack, Box, Chip } from '@mui/material'
import ThemeForm from '../components/theme/ThemeForm'
import ThemeItem from '../components/theme/ThemeItem'
import { useDispatch, useSelector } from 'react-redux'
import { createThemeThunk } from '../features/themeSlice'
import { useCallback, useState } from 'react'
import { ModalBox } from './../styles/StyledComponent'

function ThemePage() {
   const dispatch = useDispatch()
   const { loading, error, themes } = useSelector((state) => state.themes)
   const [value, setValue] = useState(null)

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

   if (loading) return <>load</>
   if (error) return <>{error}</>
   return (
      <Container>
         <Stack spacing={3}>
            <Box>
               {themes.map((theme) => (
                  <Chip
                     color={theme.id === value?.id ? 'primary' : ''}
                     key={'theme' + theme.id}
                     label={theme.keyword}
                     onClick={() => (theme.id === value?.id ? setValue(null) : setValue(theme))}
                  />
               ))}
            </Box>
            <ModalBox btnName="주제 등록">
               <ThemeForm onSubmit={handleSubmit} />
            </ModalBox>
            {value ? <ThemeItem themes={[value]} /> : <ThemeItem themes={themes} />}
         </Stack>
      </Container>
   )
}

export default ThemePage
