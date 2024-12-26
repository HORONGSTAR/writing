import { TextField, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { useState } from 'react'

function PostForm() {
   const [age, setAge] = useState('')

   return (
      <Stack component="form" spacing={2}>
         <FormControl sx={{ width: '300px' }}>
            <InputLabel id="demo-simple-select-label">참여주제</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="참여주제" onChange={(e) => setAge(e.target.value)}>
               <MenuItem value={10}>Ten</MenuItem>
               <MenuItem value={20}>Twenty</MenuItem>
               <MenuItem value={30}>Thirty</MenuItem>
            </Select>
         </FormControl>
         <TextField fullWidth placeholder="제목을 작성하세요." />
         <TextField fullWidth placeholder="내용을 작성하세요." rows={24} multiline />
         <Button></Button>
      </Stack>
   )
}

export default PostForm
