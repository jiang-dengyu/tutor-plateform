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
      Comment.belongsTo(models.User, { foreignKey: 'userId' })
      Comment.belongsTo(models.Course, { foreignKey: 'courseId' })
    }
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      hitoryId: DataTypes.INTEGER
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
