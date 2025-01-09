import { Accordion, AccordionDetails, AccordionSummary, AccordionActions, Button, Typography, Snackbar, Divider, Box } from '@mui/material'
import PostItem from '../post/PostItem'
import ThemeItem from './ThemeItem'
import { useCallback, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { deleteThemeThunk } from '../../features/themeSlice'
import { ModalBox, NoticeBox } from '../../styles/StyledComponent'

function ThemeList({ themes, auth }) {
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
   const items = useMemo(() => {
      return (
         <>
            {themes ? (
               themes.map((theme) => (
                  <Accordion key={'theme' + theme.id}>
                     <AccordionSummary>
                        <ThemeItem theme={theme} />
                     </AccordionSummary>
                     <AccordionDetails>
                        <Typography variant="body2" color="#888" pl={2}>
                           주제 소개 : {theme.info}
                        </Typography>
                        <Divider />
                        <Box sx={{ maxHeight: 600, overflowY: 'auto' }}>
                           <PostItem posts={theme.Posts} />
                        </Box>
                        <AccordionActions sx={{ py: 0 }}>
                           {theme.UserId === auth?.id && (
                              <ModalBox btnName={'주제 삭제하기'}>
                                 <Typography variant="h6">정말로 주제를 삭제하시겠습니까?</Typography>
                                 <Typography>
                                    주제를 삭제하면 해당 주제에 등록된 글은 그대로 유지되며, 게시글의 주제만 미정으로 변환됩니다.
                                 </Typography>
                                 <Button color="secondary" sx={{ display: 'block', marginLeft: 'auto' }} onClick={() => onClickDelete(theme)}>
                                    확인
                                 </Button>
                              </ModalBox>
                           )}
                        </AccordionActions>
                     </AccordionDetails>

                     <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} message={'주제 삭제 중 오류가 발생했습니다.'} />
                  </Accordion>
               ))
            ) : (
               <NoticeBox>등록된 글이 없습니다.</NoticeBox>
            )}
         </>
      )
   }, [themes, auth])

   return items
}

export default ThemeList
