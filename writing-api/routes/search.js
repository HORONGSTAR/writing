const express = require('express')
const router = express.Router()
const { User, Post, Theme } = require('../models')
const { Op } = require('sequelize')

router.get('/:search', async (req, res, next) => {
   const search = req.params.search
   try {
      const users = await User.findAll({
         order: [['createdAt', 'DESC']],
         where: {
            nick: { [Op.like]: `%${search}%` },
         },
      })

      const posts = await Post.findAll({
         order: [['createdAt', 'DESC']],
         where: {
            [Op.or]: {
               title: { [Op.like]: `%${search}%` },
               content: { [Op.like]: `%${search}%` },
            },
         },
      })

      const themes = await Theme.findAll({
         order: [['createdAt', 'DESC']],
         where: {
            [Op.or]: {
               keyword: { [Op.like]: `%${search}%` },
               info: { [Op.like]: `%${search}%` },
            },
         },
      })

      res.json({
         success: true,
         users,
         posts,
         themes,
         message: '유저 검색 결과를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '유저 검색 중 오류가 발생했습니다.',
         error,
      })
   }
})
module.exports = router
