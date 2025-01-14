const Sequelize = require('sequelize')

module.exports = class Alarm extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            category: {
               type: Sequelize.INTEGER, // 팔로 1, 댓글 2, 좋아요3
               allowNull: false,
            },
            linkId: {
               type: Sequelize.INTEGER,
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Alarm',
            tableName: 'alarms',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Alarm.belongsTo(db.User, {
         foreignKey: 'toUserId',
         as: 'toUser',
         targetKey: 'id',
      })
      db.Alarm.belongsTo(db.User, {
         foreignKey: 'fromUserId',
         as: 'fromUser',
         targetKey: 'id',
      })
   }
}
