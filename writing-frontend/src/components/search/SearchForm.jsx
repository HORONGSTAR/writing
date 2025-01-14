import { InputBase, IconButton, Box } from '@mui/material'
import { useState, useCallback } from 'react'
import { Search } from '@mui/icons-material'

function SearchForm({ onSubmit }) {
   const [value, setValue] = useState('')

   const handleSearch = useCallback(
      (e) => {
         e.preventDefault()
         if (!value.trim()) return
         onSubmit(value)
      },
      [value, onSubmit]
   )

   return (
      <Box
         component={'form'}
         onSubmit={handleSearch}
         sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, border: '1px solid #888', borderRadius: 5 }}
      >
         <InputBase fullWidth sx={{ ml: 1, flex: 1 }} value={value} onChange={(e) => setValue(e.target.value)} placeholder="검색어를 입력해주세요." />
         <IconButton type="submit" aria-label="검색">
            <Search />
         </IconButton>
      </Box>
   )
}

export default SearchForm
