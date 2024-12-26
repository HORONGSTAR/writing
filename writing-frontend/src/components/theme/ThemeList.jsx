import { Box, Chip, Stack } from '@mui/material'
import { useState } from 'react'

function ThemeList() {
   const [variant, setVariant] = useState(true)
   const handleClick = () => {
      setVariant('outlined')
   }

   return <></>
}

export default ThemeList
