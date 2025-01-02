import { TextField, Stack, Button, NativeSelect, InputLabel, FormControl, Snackbar } from '@mui/material'
import { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getThemeListThunk } from '../../features/themeSlice'

function PostForm({ onSubmit, initialValues = {} }) {
   const [title, setTitle] = useState(initialValues?.title || '')
   const [content, setContent] = useState(initialValues?.content || '')
   const [themeId, setThemeId] = useState(initialValues?.ThemeId || '')
   const { themeList } = useSelector((state) => state.themes)
   const [open, setOpen] = useState(false)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getThemeListThunk())
   }, [dispatch])

   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()
         const value = { ti: title.trim(), ct: content.trim() }
         if (!value.ti || !value.ct) return setOpen(true)
         onSubmit({ title, content, themeId })
      },
      [title, content, themeId, onSubmit]
   )

   return (
      <Stack spacing={2}>
         <FormControl sx={{ width: '300px' }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
               참여주제
            </InputLabel>
            <NativeSelect
               defaultValue={themeId}
               inputProps={{
                  name: '참여주제',
                  id: 'uncontrolled-native',
               }}
               onChange={(e) => setThemeId(e.target.value)}
            >
               {themeList.map((theme) => (
                  <option key={`theme_keyword_${theme.id}`} value={theme.id}>
                     {theme.keyword}
                  </option>
               ))}
            </NativeSelect>
         </FormControl>

         <TextField fullWidth label="제목" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
         <TextField fullWidth multiline label="내용" rows={24} id="content" value={content} onChange={(e) => setContent(e.target.value)} />
         <Button sx={{ marginLeft: 'auto' }} onClick={handleSubmit} variant="contained">
            등록
         </Button>
         <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} message="제목 및 내용을 채워주세요." />
      </Stack>
   )
}

export default PostForm
