'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.Course, { foreignKey: 'courseId' })
      History.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  History.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      date: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'History',
      tableName: 'Histories',
      underscored: true
    }
  )
  return History
}
