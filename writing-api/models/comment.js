const Sequelize = require('sequelize')

module.exports = class Comment extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            comment: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Comment.belongsTo(db.User, {
         foreignKey: 'userId',
         targetKey: 'id',
      })
      db.Comment.belongsTo(db.Post, {
         foreignKey: 'postId',
         targetKey: 'id',
      })
   }
}
