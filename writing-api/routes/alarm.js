const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('./middlewares')
const { User, Post, Alarm } = require('../models')

router.get('/', isLoggedIn, async (req, res) => {
   try {
      const alarmList = await Alarm.findAll({
         where: { Userid1: req.user.id },
         include: [
            {
               model: User,
               as: 'User2',
               attributes: ['id', 'nick', 'avatar'],
            },
         ],
      })
      res.json({
         success: true,
         alarmList,
         message: '알림 목록을 성공적으로 가져왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '알림 목록을 가져오던 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      const alarm = await Alarm.findOne({
         where: {
            id: req.params.id,
         },
      })

      if (!alarm) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }

      await alarm.destroy()

      const alarmList = await Alarm.findAll({
         where: { Userid1: req.user.id },
         include: [
            {
               model: User,
               as: 'User2',
               attributes: ['id', 'nick', 'avatar'],
            },
         ],
      })

      res.json({
         success: true,
         alarmList,
         message: '알림이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '알림 삭제 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.delete('/', isLoggedIn, async (req, res) => {
   try {
      await Alarm.destroy({
         where: {
            UserId1: req.user.id,
         },
      })

      res.json({
         success: true,
         message: '알림 목록이 성공적으로 삭제 되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '알림 목록 삭제 중 오류가 발생했습니다.',
         error,
      })
   }
})

module.exports = router
