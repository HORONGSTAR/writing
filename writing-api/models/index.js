const Sequelize = require('sequelize')
const User = require('./user')
const Post = require('./post')
const Comment = require('./comment')
const Theme = require('./theme')
const Alarm = require('./alarm')

const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const db = {}
dotenv.config()

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize

db.User = User
db.Post = Post
db.Comment = Comment
db.Theme = Theme
db.Alarm = Alarm

User.init(sequelize)
Post.init(sequelize)
Comment.init(sequelize)
Theme.init(sequelize)
Alarm.init(sequelize)

User.associate(db)
Post.associate(db)
Comment.associate(db)
Theme.associate(db)
Alarm.associate(db)

module.exports = db
