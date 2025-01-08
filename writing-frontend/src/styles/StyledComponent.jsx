import * as React from 'react'
import { createTheme } from '@mui/material/styles'
import styled from 'styled-components'
import { Typography, Modal, Box, Button, Stack, CircularProgress } from '@mui/material'
import { useState } from 'react'

export const theme = createTheme({
  palette: {
    primary: { main: '#222' },
    secondary: { main: '#00838f' },
  },
})

export const LoadingBox = () => {
  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '400px' }}>
      <CircularProgress color="secondary" size={50} />
    </Stack>
  )
}

export const NoticeBox = ({ children }) => {
  return <Stack sx={{ height: '100%', minHeight: '300px', alignItems: 'center', justifyContent: 'center' }}>{children}</Stack>
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

export const Ellipsis = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.$line || 1};
  -webkit-box-orient: vertical;
`

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

export const ModalBox = ({ children, btnName, variant }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant={variant || 'outlined'} onClick={() => setOpen(true)}>
        {btnName}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="title" aria-describedby="description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 1200,
            minWidth: 400,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
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
