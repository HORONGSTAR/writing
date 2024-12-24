const express = require('express')
const multer = require('multer')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const User = require('../models/user')
const fs = require('fs')

try {
   fs.readdirSync('avatar-uploads')
} catch (err) {
   console.log('avatar-uploads 폴더 생성')
   fs.mkdirSync('avatar-uploads')
}

const router = express.Router()

const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'avatar-uploads/')
      },
      filename(req, file, cb) {
         const decodedFileName = decodeURIComponent(file.originalname)
         const ext = path.extname(decodedFileName)
         const basename = path.basename(decodedFileName, ext)
         cb(null, basename + Date.now() + ext)
      },
   }),
   limits: { fileSize: 5 * 1024 * 1024 },
})

router.post('/join', isNotLoggedIn, upload.single('img'), async (req, res, next) => {
   const { email, nick, password, avatar, info } = req.body
   try {
      const exUser = await User.findOne({ where: { email } })

      if (exUser) {
         return res.status(409).json({
            success: false,
            message: '이미 존재하는 사용자입니다.',
         })
      }

      const hash = await bcrypt.hash(password, 12)
      const newUser = await User.create({
         email: email,
         nick: nick,
         password: hash,
         avatar: avatar,
         info: info,
      })
      res.status(201).json({
         success: true,
         message: '사용자가 성공적으로 등록되었습니다.',
         user: {
            id: newUser.id,
            email: newUser.email,
            nick: newUser.nick,
            avatar: newUser.avatar,
            info: newUser.info,
         },
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '회원가입 중 오류가 발생했습니다.',
      })
      next(err)
   }
})

router.post('/login', isNotLoggedIn, async (req, res, next) => {
   passport.authenticate('local', (authError, user, info) => {
      if (authError) {
         return res
            .status(500)
            .json({ success: false, message: '인증 중 오류 발생', error: authError })
      }
      if (!user) {
         return res.status(401).json({
            success: false,
            message: info.message || '로그인 실패',
         })
      }
      req.logIn(user, (loginError) => {
         if (loginError) {
            return res
               .status(500)
               .json({ success: false, message: '로그인 중 오류 발생', error: loginError })
         }

         res.json({
            success: true,
            message: '로그인 성공',
            user: {
               id: user.id,
               nick: user.nick,
            },
         })
      })
   })(req, res, next)
})

router.get('/logout', isLoggedIn, async (req, res, next) => {
   req.logOut((err) => {
      if (err) {
         console.log(err)
         return res.status(500).json({
            success: false,
            message: '로그아웃 중 오류가 발생했습니다.',
            error: err,
         })
      }

      res.json({
         success: true,
         message: '로그아웃에 성공했습니다.',
      })
   })
})

router.get('/status', async (req, res, next) => {
   if (req.isAuthenticated()) {
      res.json({
         isAuthenticated: true,
         user: {
            id: req.user.id,
            nick: req.user.nick,
         },
      })
   } else {
      res.json({
         isAuthenticated: false,
      })
   }
})

module.exports = router