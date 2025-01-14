import React, { useState, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUserThunk } from '../../features/authSlice'
import { Avatar, Menu, MenuItem, Divider, IconButton, Container, Box, Stack, Typography } from '@mui/material'
import { Search } from '@mui/icons-material'

function Navber({ isAuthenticated, user }) {
   const dispatch = useDispatch()
   const [anchorEl, setAnchorEl] = useState(null)
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

   return (
      <Box sx={{ background: '#efebe9', mb: 4 }}>
         <Container
            sx={{
               display: 'flex',
               alignItems: 'center',
               height: 60,
            }}
         >
            <Stack spacing={2} direction="row">
               <Typography component={RouterLink} to="/" variant="h1">
                  글조각
               </Typography>
               <RouterLink to="/all">전체 글</RouterLink>
               {user && <RouterLink to="/follow">구독</RouterLink>}
               <RouterLink to="/theme">주제 모음집</RouterLink>
            </Stack>

            <IconButton component={RouterLink} to="/search" sx={{ marginLeft: 'auto' }}>
               <Search aria-label="검색" />
            </IconButton>

            {!isAuthenticated ? (
               <>
                  <IconButton
                     onClick={handleClick}
                     size="small"
                     aria-haspopup="true"
                     aria-controls={open ? 'account-menu' : undefined}
                     aria-expanded={open ? 'true' : undefined}
                     aria-label="내 계정"
                  >
                     <Avatar src={`${process.env.REACT_APP_API_URL}${user?.avatar}`} sx={{ width: 32, height: 32 }} />
                  </IconButton>
               </>
            ) : (
               <RouterLink to="/login">로그인</RouterLink>
            )}
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
            <MenuItem>
               <RouterLink to="/post/create">글 쓰기</RouterLink>
            </MenuItem>
            <Divider />
            <MenuItem>
               <RouterLink to="/notice">알림</RouterLink>
            </MenuItem>
            <MenuItem>
               <RouterLink to="/profile">마이페이지</RouterLink>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
         </Menu>
      </Box>
   )
}

export default Navber
