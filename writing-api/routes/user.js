const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./middlewares')
const User = require('../models/user')

router.post('/follow/:id', isLoggedIn, async (req, res) => {
   try {
      const user = await User.findOne({ where: { id: req.user.id } })

      if (user) {
         await user.addFollowing(parseInt(req.params.id, 10))
         res.json({ success: true, message: '사용자를 성공적으로 팔로우했습니다.' })
      } else {
         res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' })
      }
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '팔로우 하는 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.delete('/follow/:id', isLoggedIn, async (req, res) => {
   try {
      const user = await User.findOne({ where: { id: req.user.id } })

      if (user) {
         await user.removeFollowing(parseInt(req.params.id, 10))
         res.json({ success: true, message: '사용자를 성공적으로 언팔로우했습니다.' })
      } else {
         res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' })
      }
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '언팔로우 하는 중 오류가 발생했습니다.',
         error,
      })
   }
})

module.exports = router
