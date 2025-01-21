const Sequelize = require('sequelize')

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
      db.Post.belongsTo(db.User, {
         foreignKey: 'userId',
         targetKey: 'id',
      })
      db.Post.belongsTo(db.Theme, {
         foreignKey: 'themeId',
         targetKey: 'id',
      })
      db.Post.belongsToMany(db.User, {
         foreignKey: 'userId',
         sourceKey: 'id',
         as: 'LikemarkUser',
         through: 'Likemark',
      })
      db.Post.belongsToMany(db.User, {
         foreignKey: 'userId',
         sourceKey: 'id',
         as: 'BookmarkUser',
         through: 'Bookmark',
      })
      db.Post.hasMany(db.Comment, {
         foreignKey: 'postId',
         sourceKey: 'id',
      })
   }
}
