import * as React from 'react'
import { createTheme } from '@mui/material/styles'
import styled from 'styled-components'
import { Typography, Modal, Box, Button } from '@mui/material'
import { useState } from 'react'

export const theme = createTheme({
   palette: {
      primary: { main: '#222' },
   },
})

export const Ellipsis = styled.div`
   width: 100%;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: ${(props) => props.$line || 1};
   -webkit-box-orient: vertical;
`
export const AlertBox = ({ children, display }) => {
   return (
      <Typography color="error" style={{ display: display ? 'block' : 'none' }}>
         {children}
      </Typography>
   )
}

export const ModalBox = ({ children, btnName }) => {
   const [open, setOpen] = useState(false)

   return (
      <>
         <Button variant="outlined" onClick={() => setOpen(true)}>
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
               }}
            >
               {children}
            </Box>
         </Modal>
      </>
   )
}
