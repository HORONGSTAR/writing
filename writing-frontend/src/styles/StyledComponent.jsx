import * as React from 'react'
import { createTheme } from '@mui/material/styles'
import styled from 'styled-components'
import { Drawer, Typography, Modal, Box, Button, IconButton, Stack, CircularProgress, Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

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

export const LoadingBox = () => {
   return (
      <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '400px' }}>
         <CircularProgress color="secondary" size={50} />
      </Stack>
   )
}

export const LinkBox = ({ to, isHover, children, variant, color }) => {
   return (
      <Link mx={1} component={RouterLink} to={to} underline={isHover || 'hover'}>
         <Typography color={color || 'primary'} variant={variant || 'body1'}>
            {children}
         </Typography>
      </Link>
   )
}

export const NoticeBox = ({ children }) => {
   return <Stack sx={{ height: '100%', minHeight: '200px', alignItems: 'center', justifyContent: 'center' }}>{children}</Stack>
}

export const MobileMenu = ({ children }) => {
   const [open, setOpen] = useState(false)

   const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen)
   }

   return (
      <>
         <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
         </IconButton>
         <Drawer open={open} onClose={toggleDrawer(false)}>
            <Stack spacing={3} p={3} width={100}>
               {children}
            </Stack>
         </Drawer>
      </>
   )
}

export const ThemeBanner = () => {
   return (
      <BannerImg>
         <Stack sx={{ alignItems: 'center', color: '#fff' }}>
            <Typography variant="h5">첫번째 주제를 등록해보세요.</Typography>
            <Typography>함께 글감을 나누며 글을 쓸 수 있어요!</Typography>
         </Stack>
      </BannerImg>
   )
}

export const AlertBox = ({ children, display }) => {
   return (
      <Typography color="error" style={{ display: display ? 'block' : 'none' }}>
         {children}
      </Typography>
   )
}

export const ModalBox = ({ children, btnName, variant, size }) => {
   const [open, setOpen] = useState(false)

   return (
      <>
         <Button size={size || 'medium'} variant={variant || 'outlined'} onClick={() => setOpen(true)}>
            {btnName}
         </Button>
         <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="title" aria-describedby="description">
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: { xs: 340, sm: 400 },
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 24,
                  px: { xs: 0.5, sm: 3 },
                  p: 3,
                  maxHeight: '600px',
                  overflowY: 'auto',
               }}
            >
               {children}
            </Box>
         </Modal>
      </>
   )
}

export const BannerImg = styled.div`
   width: 100%;
   height: 180px;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #000;
   background-image: url(images/banner1.jpg);
   background-size: cover;
   background-position: center;
   border-radius: 10px;
   text-shadow: 0 0 8px #000;
`

export const TextBox = styled.div`
   width: 100%;
   text-overflow: ellipsis;
   overflow: hidden;
   word-break: break-word;
   display: -webkit-box;
   -webkit-line-clamp: ${(props) => props.$line || 1};
   -webkit-box-orient: vertical;
   white-space: ${(props) => (props.$space ? 'pre-line' : 'normal')};
`
