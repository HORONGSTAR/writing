const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: false,
            },
            nick: {
               type: Sequelize.STRING(40),
               allowNull: false,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            avatar: {
               type: Sequelize.STRING(200),
               allowNull: true,
            },
            info: {
               type: Sequelize.STRING(200),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.User.hasMany(db.Post)
      db.User.hasMany(db.Theme, {
         foreignKey: 'UserId',
         sourceKey: 'id',
      })
      db.User.hasMany(db.Comment, {
         foreignKey: 'UserId',
         sourceKey: 'id',
      })
      db.User.belongsToMany(db.Post, { through: 'LikePosts' })
      db.User.belongsToMany(db.Post, { through: 'BookmarkPosts' })
   }
}