import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUserThunk } from '../../features/authSlice'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Avatar, Menu, MenuItem, Divider, IconButton, Container, Tooltip, Link, Button, Box, InputBase, Stack, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'
import { MobileMenu, LinkBox } from '../../styles/StyledComponent'

function Navber({ isAuthenticated, user }) {
   const dispatch = useDispatch()
   const location = useLocation().pathname

   const [anchorEl, setAnchorEl] = useState(null)
   const [value, setValue] = useState('')
   const open = Boolean(anchorEl)

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }
   const handleClose = () => {
      setAnchorEl(null)
   }
   const handleLogout = useCallback(() => {
      dispatch(logoutUserThunk())
         .unwrap()
         .then(() => (window.location.href = '/'))
         .catch((error) => {
            alert(error)
         })
   }, [dispatch])

   const handleSearch = useCallback(
      (e) => {
         e.preventDefault()
         if (value) window.location.href = `/search/${value}`
      },
      [value]
   )

   const navItem = (
      <>
         <LinkBox to="/" isHover="none" variant="h1">
            글조각
         </LinkBox>
         <LinkBox to="/all">전체 글</LinkBox>
         {user && <LinkBox to="/follow">구독</LinkBox>}
         <LinkBox to="/theme">주제 모음집</LinkBox>
      </>
   )

   return (
      <Box sx={{ background: '#efebe9', mb: 4 }}>
         <Container
            sx={{
               display: 'flex',
               alignItems: 'center',
               height: 80,
            }}
         >
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}> {navItem}</Box>
            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
               <MobileMenu>{navItem}</MobileMenu>
            </Box>

            <Stack sx={{ marginLeft: 'auto' }} direction={'row'} spacing={2}>
               {location.includes('search') || (
                  <Box
                     sx={{ display: 'flex', alignItems: 'center', width: 120, borderBottom: '1px solid #888' }}
                     component={'form'}
                     onSubmit={(e) => handleSearch(e)}
                  >
                     <InputBase variant="standard" placeholder="검색" value={value} onChange={(e) => setValue(e.target.value)} />
                     <IconButton aria-label="검색" type="submit">
                        <Search />
                     </IconButton>
                  </Box>
               )}

               {isAuthenticated ? (
                  <Tooltip title="내 계정">
                     <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                     >
                        <Avatar src={`${process.env.REACT_APP_API_URL}${user.avatar}`} sx={{ width: 32, height: 32 }} />
                     </IconButton>
                  </Tooltip>
               ) : (
                  <Button sx={{ marginLeft: 'auto' }} component={RouterLink} to="/login" variant="outlined">
                     로그인
                  </Button>
               )}
            </Stack>
         </Container>
         <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
               paper: {
                  elevation: 0,
                  sx: {
                     overflow: 'visible',
                     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                     mt: 1.5,
                     '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                     },
                     '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 15,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                     },
                  },
               },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
         >
            <MenuItem onClick={handleClose}>
               <Link sx={{ minWidth: 100 }} component={RouterLink} to="/post/create" underline="none">
                  글 쓰기
               </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
               <Link sx={{ minWidth: 100 }} component={RouterLink} to="/notice" underline="none">
                  알림
               </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
               <Link sx={{ minWidth: 100 }} component={RouterLink} to="/profile" underline="none">
                  마이페이지
               </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
               <Link sx={{ minWidth: 100 }} component={RouterLink} to="/setting" underline="none">
                  계정 설정
               </Link>
               <Divider />
            </MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
         </Menu>
      </Box>
   )
}

export default Navber
