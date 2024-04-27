const { Course, Comment, History } = require('../../models')
/******************************* */
const commentController = {
  getComment: (req, res, next) => {
    const historyId = req.params.id
    History.findOne({ include: [Course] }, { where: { id: historyId } })
      .then((history) => {
        if (!history) throw new Error('找不到可以評價的歷史紀錄')
        return res.render('comment', { history: history.toJSON() })
      })
      .catch((err) => next(err))
  },
  postComment: (req, res, next) => {
    const userId = req.user.id
    const historyId = req.params.id
    const { score, description } = req.body
    History.findByPk(historyId)
      .then((history) => {
        if (!history) throw new Error('找不到可以評價的歷史紀錄')
        const historyTojson = history.toJSON()
        console.log(historyTojson, history)
        return Comment.create({
          courseId: historyTojson.courseId,
          userId: userId,
          score,
          comment: description
        })
      })
      .then((comment) => {
        console.log(comment)
        return res.redirect(`/users/${userId}`)
      })
      .catch((err) => next(err))
  }
}
/******************************* */
module.exports = commentController
