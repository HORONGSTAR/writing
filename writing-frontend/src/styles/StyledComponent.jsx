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
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`
export const AlertBox = ({ children, display }) => {
   return (
      <Typography color="error" style={{ display: display ? 'block' : 'none' }}>
         {children}
      </Typography>
   )
}
