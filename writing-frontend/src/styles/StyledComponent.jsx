import * as React from 'react'
import { createTheme } from '@mui/material/styles'
import styled from 'styled-components'
import { Typography } from '@mui/material'

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
