'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comment.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      comment: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'Comments',
      underscored: true
    }
  )
  return comment
}
