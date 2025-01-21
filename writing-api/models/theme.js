const Sequelize = require('sequelize')

module.exports = class Theme extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            keyword: {
               type: Sequelize.STRING(200),
               allowNull: false,
            },
            background: {
               type: Sequelize.STRING(200),
               allowNull: true,
            },
            alt: {
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
            modelName: 'Theme',
            tableName: 'themes',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Theme.belongsTo(db.User, {
         foreignKey: 'userId',
         targetKey: 'id',
      })
      db.Theme.hasMany(db.Post, {
         foreignKey: 'themeId',
         sourceKey: 'id',
      })
   }
}
