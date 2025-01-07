import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   AccordionActions,
   DialogTitle,
   DialogActions,
   Button,
   DialogContent,
   Snackbar,
} from '@mui/material'
import PostItem from '../post/PostItem'
import ThemeItem from './ThemeItem'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteThemeThunk } from '../../features/themeSlice'
import { ModalBox } from '../../styles/StyledComponent'

function ThemeList({ themes }) {
   const dispatch = useDispatch()
   const [open, setOpen] = useState(false)

   const onClickDelete = useCallback(
      (theme) => {
         dispatch(deleteThemeThunk(theme.id))
            .unwrap()
            .then(() => {
               window.location.href = '/theme'
            })
            .catch((error) => {
               console.error('주제 삭제중 오류 발생', error)
               setOpen(true)
            })
      },
      [dispatch]
   )

   return (
      <>
         {themes &&
            themes.map((theme) => (
               <Accordion key={'theme' + theme.id}>
                  <AccordionSummary>
                     <ThemeItem theme={theme} />
                  </AccordionSummary>
                  <AccordionActions>
                     <ModalBox btnName={'삭제'}>
                        <DialogTitle>정말로 주제를 삭제하시겠습니까?</DialogTitle>
                        <DialogContent>주제를 삭제하면 해당 주제에 등록된 글은 그대로 유지되며, 게시글의 주제만 미정으로 변환됩니다.</DialogContent>
                        <DialogActions>
                           <Button onClick={() => onClickDelete(theme)}>확인</Button>
                        </DialogActions>
                     </ModalBox>
                  </AccordionActions>
                  <AccordionDetails>
                     <PostItem posts={theme.Posts} />
                  </AccordionDetails>
                  <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} message={'주제 삭제 중 오류가 발생했습니다.'} />
               </Accordion>
            ))}
      </>
   )
}

export default ThemeList
