import { Container, TextField, Button, Stack } from '@mui/material'
import ThemeForm from '../components/theme/ThemeForm'
import ThemeItem from '../components/theme/ThemeItem'
import ThemeList from '../components/theme/ThemeList'

function ThemePage() {
   return (
      <Container>
         <ThemeList />
         <ThemeForm />
         <ThemeItem />
      </Container>
   )
}

export default ThemePage
