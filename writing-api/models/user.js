const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: false,
               unique: true,
            },
            nick: {
               type: Sequelize.STRING(40),
               allowNull: false,
               unique: true,
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
      db.User.belongsToMany(db.Post, { as: 'LikemarkPost', through: 'Likemark' })
      db.User.belongsToMany(db.Post, { as: 'BookmarkPost', through: 'Bookmark' })
      db.User.belongsToMany(db.User, {
         foreignKey: 'FollowingId',
         as: 'Followers',
         through: 'Follow',
      })
      db.User.belongsToMany(db.User, {
         foreignKey: 'FollowerId',
         as: 'Followings',
         through: 'Follow',
      })
   }
}
