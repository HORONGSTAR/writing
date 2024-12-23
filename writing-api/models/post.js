const Sequelize = require('sequelize')
const { all } = require('../routes/post')

module.exports = class Post extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            title: {
               type: Sequelize.STRING(200),
               allowNull: false,
            },
            content: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Post.belongsTo(db.User)
      db.Post.belongsTo(db.Theme, {
         foreignKey: 'ThemeId',
         targetKey: 'id',
      })
      db.Post.belongsToMany(db.User, { through: 'LikePosts' })
      db.Post.belongsToMany(db.User, { through: 'BookmarkPosts' })
      db.Post.hasMany(db.Comment)
   }
}
