import { Button, Stack, TextField, Container, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState, useCallback } from 'react'
import { SliderPicker } from 'react-color'
import ThemeItem from './ThemeItem'
import { Image, ColorLens, Block } from '@mui/icons-material'

function ThemeForm({ onSubmit }) {
   const [imgUrl, setImgUrl] = useState('')
   const [keyword, setKeyword] = useState('')
   const [imgFile, setImgFile] = useState('')
   const [imgAlt, setImgAlt] = useState('')
   const [color, setColor] = useState('#b3c8e6')
   const [type, setType] = useState('color')

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

         const formData = new FormData()
         if (imgFile) {
            const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), {
               type: imgFile.type,
            })
            formData.append('background', encodedFile || color)
         }

         formData.append('keyword', keyword)
         formData.append('alt', imgAlt || '게시물 이미지')
         onSubmit(formData)
      },
      [keyword, imgFile, imgAlt, color, onSubmit]
   )

   return (
      <Container
         component="form"
         onSubmit={handleSubmit}
         encType="multipart/form-data"
         sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
         <Stack sx={{ width: 400 }} spacing={2}>
            <h4>주제 등록</h4>
            <TextField
               fullWidth
               id="keyword"
               label="글쓰기 주제"
               value={keyword}
               onChange={(e) => setKeyword(e.target.value)}
               error={alert.keyword}
               helperText={alert.keyword && '주제를 입력하세요.'}
            />

            <ToggleButtonGroup
               exclusive
               value={type}
               onChange={(e, newValue) => {
                  setType(newValue)
               }}
            >
               <ToggleButton value="none">
                  <Block />
                  배경 없음
               </ToggleButton>
               <ToggleButton value="color">
                  <ColorLens />
                  배경 색상
               </ToggleButton>
               <ToggleButton value="image">
                  <Image />
                  배경 이미지
               </ToggleButton>
            </ToggleButtonGroup>

            <Stack spacing={2}>
               {type === 'color' && <SliderPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />}
               {type === 'image' && (
                  <>
                     <Button variant="contained" component="label">
                        이미지 업로드
                        <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
                     </Button>
                     <TextField
                        fullWidth
                        id="imgAlt"
                        label="Alt"
                        variant="standard"
                        value={imgAlt}
                        onChange={(e) => setImgAlt(e.target.value)}
                     />
                  </>
               )}
            </Stack>

            <ThemeItem
               themes={[
                  {
                     id: 'preview',
                     keyword: keyword,
                     background: type === 'color' ? color : type === 'image' ? imgUrl || '#EEEEEE' : '#EEEEEE',
                  },
               ]}
            />
            <Button variant="contained" type="submit">
               완료
            </Button>
         </Stack>
      </Container>
   )
}

export default ThemeForm
