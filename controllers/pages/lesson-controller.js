/******************************* */
const courseController = {
  home: (req, res) => {
    return res.render('home')
  },
  applyPage: (req, res) => {
    return res.render('apply')
  }
}
/******************************* */
module.exports = courseController
