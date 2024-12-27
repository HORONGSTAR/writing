import { Container, Box } from '@mui/material'
import ThemeForm from '../components/theme/ThemeForm'
import ThemeItem from '../components/theme/ThemeItem'
import ThemeList from '../components/theme/ThemeList'
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
            .then(() => {})
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
         <ThemeList />
         <ThemeForm onSubmit={handleSubmit} />
         {themes.length > 0 && themes.map((theme) => <Box key={'theme' + theme.id}>{theme.keyword}</Box>)}
         <ThemeItem />
      </Container>
   )
}

export default ThemePage
