const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./middlewares')
const { User, Post, Theme } = require('../models')

router.get('/profile', isLoggedIn, async (req, res) => {
   res.json({
      success: true,
      user: req.user,
      message: '프로필 정보를 성공적으로 가져왔습니다.',
   })
})

router.get('/profile/:id', isLoggedIn, async (req, res) => {
   try {
      const userId = req.params.id
      const user = await User.findOne({
         where: { id: userId },
         attributes: ['id', 'nick', 'email', 'info', 'avatar', 'createdAt', 'updatedAt'],
         include: [
            {
               model: User,
               as: 'Followers',
               attributes: ['id', 'nick', 'email', 'avatar'],
            },
            {
               model: User,
               as: 'Followings',
               attributes: ['id', 'nick', 'email', 'avatar'],
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
            {
               model: Post,
               as: 'BookmarkPost',
               attributes: ['id', 'title', 'content'],
               include: [
                  {
                     model: User,
                     attributes: ['id', 'nick', 'avatar'],
                  },
               ],
            },
            {
               model: Theme,
               attributes: ['id', 'keyword', 'background'],
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
            },
         ],
      })

      if (!user) {
         return res.status(404).json({
            success: false,
            message: '사용자를 찾을 수 없습니다.',
         })
      }

      res.json({
         success: true,
         user,
         message: '프로필 정보를 성공적으로 가져왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '특정 사용자 정보를 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

module.exports = router
