import { Button, Stack, TextField } from '@mui/material'
import { useState, useCallback } from 'react'

function ThemeForm({ onSubmit, initialValues = {} }) {
   const [imgUrl, setImgUrl] = useState(initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : '')
   const [keyword, setKeyword] = useState('')
   const [imgFile, setImgFile] = useState('')
   const [imgAlt, setImgAlt] = useState('')

   const handleImageChange = useCallback((e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return

      setImgFile(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
   }, [])

   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()
         if (!keyword.trim()) {
            alert('내용을 입력하세요.')
            return
         }
         if (!imgAlt.trim()) {
            alert('ALT를 입력하세요.')
            return
         }
         if (!imgUrl) {
            alert('이미지 파일을 추가하세요.')
            return
         }

         const formData = new FormData()
         if (imgFile) {
            const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), {
               type: imgFile.type,
            })
            formData.append('img', encodedFile)
         }

         formData.append('keyword', keyword)
         formData.append('alt', imgAlt || '게시물 이미지')
         onSubmit(formData)
      },
      [keyword, imgFile, imgAlt, imgUrl, onSubmit]
   )

   return (
      <Stack spacing={2} component="form" onSubmit={handleSubmit} encType="multipart/form-data">
         <TextField
            id="keyword"
            label="테마 키워드"
            variant="standard"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            error={alert.keyword}
            helperText={alert.keyword && '이메일을 입력하세요.'}
         />
         <Button variant="contained" component="label">
            이미지 업로드
            <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
         </Button>
         <TextField id="imgAlt" label="Alt" variant="standard" value={imgAlt} onChange={(e) => setImgAlt(e.target.value)} />
         <Button type="submit">등록</Button>
      </Stack>
   )
}

export default ThemeForm
