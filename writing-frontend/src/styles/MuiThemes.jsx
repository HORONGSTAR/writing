import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
   palette: {
      primary: { main: '#222' },
      secondary: { main: '#795548' },
   },
   typography: {
      h1: {
         fontSize: 18,
         fontWeight: 'bold',
         fontFamily: "'Gyeonggi_Batang_Regular','sans-serif'",
      },
      h2: {
         fontSize: 24,
         fontWeight: '500',
         fontFamily: "'Gyeonggi_Batang_Regular','sans-serif'",
      },
      h3: {
         fontSize: 28,
         fontFamily: "'Gyeonggi_Batang_Regular','sans-serif'",
      },
      h4: {
         fontSize: 24,
         fontFamily: "'Gyeonggi_Batang_Regular','sans-serif'",
      },
      h5: {
         fontSize: 20,
      },
      h6: {
         fontSize: 18,
      },
      fontFamily: "'Pretendard', 'sans-serif'",
   },
})
