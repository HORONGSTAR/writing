const passport = require('passport')
const local = require('./localStrategy')
const { User, Post, Theme } = require('../models')

module.exports = () => {
   passport.serializeUser((user, done) => {
      done(null, user.id)
   })

   passport.deserializeUser((id, done) => {
      User.findOne({
         where: { id },
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
         .then((user) => done(null, user))
         .catch((err) => done(err))
   })

   local()
}
