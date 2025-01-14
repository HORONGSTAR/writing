import * as React from 'react'
import styled from 'styled-components'
import { Drawer, Typography, Modal, Box, Button, IconButton, Stack, CircularProgress, Dialog, DialogContent, DialogTitle, Chip } from '@mui/material'
import { Menu, Close } from '@mui/icons-material'
import { useState } from 'react'

export const LoadingBox = () => {
   return (
      <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '400px' }}>
         <CircularProgress color="secondary" size={50} />
      </Stack>
   )
}

export const SubTitle = ({ title }) => {
   return (
      <Typography variant="h2" color="secondary" gutterBottom>
         {title}
      </Typography>
   )
}

export const NoticeBox = ({ children }) => {
   return (
      <Stack sx={{ height: '100%', minHeight: '200px', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>{children}</Stack>
   )
}

export const ErrorBox = ({ error, open, setOpen }) => {
   return (
      <>
         <Dialog
            onClose={() => {
               setOpen(false)
            }}
            aria-labelledby="에러 메세지"
            open={open}
         >
            <DialogTitle sx={{ m: 0, p: 2 }} id="에러 메세지">
               에러 메세지
            </DialogTitle>
            <IconButton
               aria-label="close"
               onClick={() => {
                  setOpen(false)
               }}
               sx={(theme) => ({
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
               })}
            >
               <Close />
            </IconButton>
            <DialogContent dividers>
               <Typography gutterBottom color="error">
                  {error}
               </Typography>
               <Typography gutterBottom variant="body2">
                  문제가 계속 해결되지 않을 경우 관리자에게 문의 부탁드립니다.
               </Typography>
               <Typography gutterBottom variant="body2">
                  <Chip label="Email : admin@naver.com" size="small" />
               </Typography>
            </DialogContent>
         </Dialog>
      </>
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
                  py: 3,
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

export const MobileMenu = ({ children }) => {
   const [open, setOpen] = useState(false)

   const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen)
   }

   return (
      <>
         <IconButton onClick={toggleDrawer(true)}>
            <Menu />
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
