import { Button, Container } from '@mui/material'
import ThemeForm from '../components/theme/ThemeForm'
import ThemeItem from '../components/theme/ThemeItem'
import { useDispatch, useSelector } from 'react-redux'
import { createThemeThunk } from '../features/themeSlice'
import { useCallback } from 'react'

function ThemePage() {
   const dispatch = useDispatch()

   const { loading, error, themes } = useSelector((state) => state.themes)

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
         {themes.map((theme) => (
            <Button>{theme.keyword}</Button>
         ))}

         <ThemeForm onSubmit={handleSubmit} />
         <ThemeItem themes={themes} />
      </Container>
   )
}

export default ThemePage
