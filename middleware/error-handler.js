module.exports = {
  generalErrorHandler(err, req, res, next) {
    if (err instanceof Error) {
      //判斷傳入的 err 是不是一個 Error 物件，是，就印出該error資訊來
      req.flash('error_messages', `${err.name}: ${err.message}`)
    } else {
      req.flash('error_messages', `${err}`) //不是，而是一堆錯誤報告，直接把字串印出來即可
    }
    res.redirect('back')
    next(err)
  },
  apiErrorHandler(err, req, res, next) {
    if (err instanceof Error) {
      res.status(err.status || 500).json({
        status: 'error',
        message: `${err.name}: ${err.message}`
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: `${err}`
      })
    }
    next(err)
  }
}
