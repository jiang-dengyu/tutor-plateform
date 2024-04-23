'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reservation.init(
    {
      userId: DataTypes.INTEGER,
      coursId: DataTypes.INTEGER,
      dayOfWeek: DataTypes.JSON,
      reservedTime: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Reservation',
      tableName: 'Reservations',
      underscored: true
    }
  )
  return reservation
}
