const express = require('express')
const router = express.Router()
const path = require('path')
const { User, Post, Theme } = require('../models')
const { isLoggedIn } = require('./middlewares')
const { title } = require('process')

router.post('/', isLoggedIn, async (req, res) => {
   try {
      const post = await Post.create({
         title: req.body.title,
         content: req.body.content,
         UserId: req.user.id,
         ThemeId: req.theme.id,
      })
      res.json({
         success: true,
         post: {
            id: post.id,
            title: post.title,
            content: post.content,
            alt: post.alt,
            UserId: post.UserId,
            ThemeId: post.ThemeId,
         },
         message: '게시물이 성공적으로 등록되었습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시물 등록 중 오류가 발생했습니다.',
         error,
      })
   }
})

router.put('/:id', isLoggedIn, async (req, res) => {
   try {
      const post = await Post.findOne({
         where: {
            id: req.params.id,
            UserId: req.user.id,
         },
      })
      if (!post) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }

      await post.update({
         title: req.body.title,
         content: req.body.content,
         UserId: req.user.id,
         ThemeId: req.theme.id,
      })

      const updatedPost = await Post.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
            {
               model: Theme,
               attributes: ['id', 'keyword'],
            },
         ],
      })
      res.json({
         success: true,
         post: updatedPost,
         message: '게시글을 성공적으로 수정했습니다.',
      })
   } catch (err) {
      console.error(err)
      res.status(500).json({
         success: false,
         message: '게시글 수정중 오류가 발생했습니다.',
      })
   }
})

router.delete('/:id', async (req, res) => {
   try {
      const post = await Post.findOne({
         where: {
            id: req.params.id,
            UserId: req.user.id,
         },
      })
      if (!post) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }
      await post.destroy()
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

router.get('/:id', async (req, res) => {
   try {
      const post = await Post.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
            {
               model: Theme,
               attributes: ['id', 'keyword'],
            },
         ],
      })
      if (!post) {
         return res.status(404).json({
            success: false,
            message: '게시물을 찾을 수 없습니다.',
         })
      }
      res.json({
         success: true,
         post,
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
   const limit = parseInt(req.query.limit, 10) || 3
   const offset = (page - 1) * limit

   try {
      const count = await Post.count()

      const posts = await Post.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],
         include: [
            {
               model: User,
               attributes: ['id', 'nick'],
            },
            {
               model: Theme,
               attributes: ['id', 'keyword'],
            },
         ],
      })

      res.json({
         success: true,
         posts,
         pagination: {
            totalPosts: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit,
         },
         message: '전체 게시물 리스트를 성공적으로 불러왔습니다.',
      })
   } catch (error) {
      console.error(error)
      res.status(500).json({
         success: false,
         message: '게시물 리스트를 불러오는 중 오류가 발생했습니다.',
         error,
      })
   }
})

module.exports = router
