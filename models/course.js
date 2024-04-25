'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.hasMany(models.Reservation, { foreignKey: 'courseId' })
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      introduction: DataTypes.TEXT,
      style: DataTypes.STRING,
      dayOfWeek: DataTypes.JSON,
      duration: DataTypes.STRING,
      classLink: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Course',
      tableName: 'Courses',
      underscored: true
    }
  )
  return Course
}