const commentServices = require('../../services/comment-services')
/******************************* */
const commentController = {
  getCommentPage: (req, res, next) => {
    commentServices.getCommentPage(req, (err, data) => (err ? next(err) : res.json({ status: 'success', data })))
  },
  postComment: (req, res, next) => {
    commentServices.postComment(req, (err, data) => (err ? next(err) : res.json({ status: 'success', data })))
  }
}
/******************************* */
module.exports = commentController
