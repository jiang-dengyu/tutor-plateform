'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Course, { foreignKey: 'courseId' })
      Comment.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Comment.init(
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
  return Comment
}
