const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const { User, Post, Theme } = require('../models')
const { isLoggedIn } = require('./middlewares')

try {
   fs.readdirSync('uploads')
} catch (err) {
   console.log('uploads 폴더 생성')
   fs.mkdirSync('uploads')
}

const upload = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/')
      },
      filename(req, file, cb) {
         const decodedFileName = decodeURIComponent(file.originalname)
         const ext = path.extname(decodedFileName)
         const basename = path.basename(decodedFileName, ext)
         cb(null, basename + Date.now() + ext)
      },
   }),
   limits: { fileSize: 6 * 1024 * 1024 },
})

router.post('/', isLoggedIn, upload.single('background'), async (req, res) => {
   try {
      const theme = await Theme.create({
         keyword: req.body.keyword,
         background: req.file ? `/${req.file.filename}` : req.body.background,
         alt: req.body.alt,
         info: req.body.info,
         UserId: req.user.id,
      })
      console.log(req.body, req.file)

      res.json({
         success: true,
         theme: {
            id: theme.id,
            keyword: theme.keyword,
            background: theme.background,
            alt: theme.alt,
            info: req.body.info,
            UserId: theme.UserId,
         },
         message: '주제를 성공적으로 등록했습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '주제 등록 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.delete('/id/:id', isLoggedIn, async (req, res) => {
   try {
      const theme = await Theme.findOne({
         where: {
            id: req.params.id,
            UserId: req.user.id,
         },
      })
      if (!theme) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }
      await theme.destroy()
      res.json({
         success: true,
         message: '게시글이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시글 삭제 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.get('/id/:id', async (req, res) => {
   try {
      const theme = await Theme.findOne({
         where: { UserId: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'avatar'],
            },
            {
               model: Post,
               attributes: ['id', 'title', 'content'],
            },
         ],
      })

      if (!theme) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }
      res.json({
         success: true,
         theme,
         message: '게시물을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시물을 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.get('/', async (req, res) => {
   const page = parseInt(req.query.page, 10) || 1
   const limit = parseInt(req.query.limit, 10) || 10
   const offset = (page - 1) * limit

   try {
      const count = await Theme.count()
      const themes = await Theme.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'avatar'],
            },
            {
               model: Post,
               attributes: ['id', 'title', 'content'],
               include: [
                  {
                     model: User,
                     attributes: ['id', 'nick', 'avatar'],
                  },
               ],
            },
         ],
      })

      res.json({
         success: true,
         themes,
         pagination: {
            totalThemes: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit,
         },
         message: '주제 모음집을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '주제 모음집을 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.get('/', async (req, res) => {
   try {
      const themeList = await Theme.findAll({
         order: [['createdAt', 'DESC']],
      })
      res.json({
         success: true,
         themes,
         message: '주제 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '주제 리스트를 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

module.exports = router
