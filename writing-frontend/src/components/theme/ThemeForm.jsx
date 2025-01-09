import { Button, Stack, TextField, Container, ToggleButton, ToggleButtonGroup, Box } from '@mui/material'
import { useState, useCallback } from 'react'
import { SliderPicker } from 'react-color'
import ThemeItem from './ThemeItem'
import { Image, ColorLens, Block } from '@mui/icons-material'

function ThemeForm({ onSubmit, user }) {
   const [imgUrl, setImgUrl] = useState('')
   const [keyword, setKeyword] = useState('')
   const [info, setInfo] = useState('')
   const [imgFile, setImgFile] = useState(null)
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
         if (type === 'image' && imgFile) {
            const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), {
               type: imgFile.type,
            })
            formData.append('background', encodedFile)
         } else {
            formData.append('background', type === 'color' ? color : '#EEEEEE')
         }

         formData.append('keyword', keyword)
         formData.append('alt', imgAlt || '게시물 배경')
         formData.append('info', info)

         onSubmit(formData)
      },
      [keyword, imgFile, imgAlt, color, type, info, onSubmit]
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
            <TextField fullWidth id="info" label="주제에 대한 추가 설명" value={info} onChange={(e) => setInfo(e.target.value)} />
            <ToggleButtonGroup
               exclusive
               value={type}
               onChange={(e, newValue) => {
                  setType(newValue)
               }}
            >
               <ToggleButton value="none">
                  <Block fontSize="small" />
                  배경 없음
               </ToggleButton>
               <ToggleButton value="color">
                  <ColorLens fontSize="small" />
                  배경 색상
               </ToggleButton>
               <ToggleButton value="image">
                  <Image fontSize="small" />
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
                     <TextField fullWidth id="imgAlt" label="Alt" variant="standard" value={imgAlt} onChange={(e) => setImgAlt(e.target.value)} />
                  </>
               )}
            </Stack>

            <ThemeItem
               theme={{
                  id: 'preview',
                  keyword: keyword,
                  background: type === 'color' ? color : type === 'image' ? imgUrl || '#EEEEEE' : '#EEEEEE',
                  User: user,
               }}
               fontsize={'h6'}
            />
            <Button variant="contained" type="submit">
               완료
            </Button>
         </Stack>
      </Container>
   )
}

export default ThemeForm
