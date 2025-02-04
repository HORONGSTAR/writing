const express = require('express')
const router = express.Router()
const { Comment, User, Alarm, Post } = require('../models')
const { isLoggedIn } = require('./middlewares')
const { Op } = require('sequelize')

router.post('/', isLoggedIn, async (req, res) => {
   try {
      await Comment.create({
         comment: req.body.comment,
         userId: req.user.id,
         postId: req.body.postId,
      })

      const target = await Post.findOne({ where: { id: req.body.postId } })

      if (target.userId !== req.user.id) {
         await Alarm.create({
            category: 2,
            linkId: req.body.postId,
            toUserId: target.userId,
            fromUserId: req.user.id,
         })
      }

      const comments = await Comment.findAll({
         where: { postId: req.body.postId },
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'avatar'],
            },
         ],
      })

      res.json({
         success: true,
         comments,
         message: '댓글이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '댓글 등록 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.get('/:id', async (req, res) => {
   try {
      const comments = await Comment.findAll({
         where: { postId: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'avatar'],
            },
         ],
      })

      res.json({
         success: true,
         comments,
         message: '댓글을 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '댓글을 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.put('/:id', isLoggedIn, async (req, res) => {
   try {
      const comment = await Comment.findOne({
         where: {
            id: req.params.id,
            userId: req.user.id,
         },
      })

      if (!comment) {
         return res.status(404).json({
            success: false,
            message: '댓글을 찾을 수 없습니다.',
         })
      }

      await comment.update({
         comment: req.body.comment,
      })

      const comments = await Comment.findAll({
         where: { postId: comment.postId },
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'avatar'],
            },
         ],
      })

      res.json({
         success: true,
         comments,
         message: '댓글이 성공적으로 수정되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '댓글 수정 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.delete('/:id', isLoggedIn, async (req, res) => {
   try {
      const comment = await Comment.findOne({
         where: {
            id: req.params.id,
            UserId: req.user.id,
         },
      })
      if (!comment) {
         return res.status(404).json({
            success: false,
            message: '댓글을 찾을 수 없습니다.',
         })
      }

      await comment.destroy()

      const comments = await Comment.findAll({
         where: { postId: comment.postId },
         include: [
            {
               model: User,
               attributes: ['id', 'nick', 'avatar'],
            },
         ],
      })

      res.json({
         success: true,
         comments,
         message: '댓글이 성공적으로 삭제되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '댓글 삭제 중 오류가 발생했습니다.',
         error,
      })
   }
})

module.exports = router
