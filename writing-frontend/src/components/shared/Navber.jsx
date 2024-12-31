import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUserThunk } from '../../features/authSlice'
import { Link as RouterLink } from 'react-router-dom'
import {
   Avatar,
   Menu,
   MenuItem,
   Divider,
   IconButton,
   Container,
   Tooltip,
   Link,
   Button,
   Typography,
} from '@mui/material'

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
      <>
         <Container
            sx={{
               display: 'flex',
               alignItems: 'center',
               height: 80,
            }}
         >
            <Link mr={3} component={RouterLink} to="/" underline="none">
               글조각
            </Link>
            <Link mr={3} component={RouterLink} to="/all" underline="hover">
               전체 글
            </Link>
            <Link mr={3} component={RouterLink} to="/follow" underline="hover">
               구독
            </Link>
            <Link mr={3} component={RouterLink} to="/theme" underline="hover">
               주제 모음집
            </Link>

            {isAuthenticated ? (
               <Tooltip title="내 계정">
                  <IconButton
                     onClick={handleClick}
                     size="small"
                     sx={{ marginLeft: 'auto' }}
                     aria-controls={open ? 'account-menu' : undefined}
                     aria-haspopup="true"
                     aria-expanded={open ? 'true' : undefined}
                  >
                     <Avatar sx={{ width: 32, height: 32 }} />
                  </IconButton>
               </Tooltip>
            ) : (
               <Button
                  sx={{ marginLeft: 'auto' }}
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
               >
                  로그인
               </Button>
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
            <MenuItem onClick={handleClose}>
               <Link
                  sx={{ minWidth: 100 }}
                  component={RouterLink}
                  to="/post/create"
                  underline="none"
               >
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
            <MenuItem onClick={handleLogout}>
               <Link sx={{ minWidth: 100 }} component={RouterLink} to="/logout" underline="none">
                  로그아웃
               </Link>
            </MenuItem>
         </Menu>
      </>
   )
}

export default Navber
