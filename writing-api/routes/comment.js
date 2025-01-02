const express = require('express')
const router = express.Router()
const { Comment } = require('../models')
const { isLoggedIn } = require('./middlewares')

router.post('/', isLoggedIn, async (req, res) => {
   try {
      const comment = await Comment.create({
         comment: req.body.comment,
         UserId: req.user.id,
         PostId: req.body.PostId,
      })
      res.json({
         success: true,
         post: {
            id: comment.id,
            comment: comment.title,
            UserId: comment.content,
            PostId: comment.UserId,
         },
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

router.delete('/:id', async (req, res) => {
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
      res.json({
         success: true,
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
