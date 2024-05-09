'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservation.belongsTo(models.User, { foreignKey: 'userId' })
      Reservation.belongsTo(models.Course, { foreignKey: 'courseId' })
    }
  }
  Reservation.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      duration: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Reservation',
      tableName: 'Reservations',
      underscored: true
    }
  )
  return Reservation
}
