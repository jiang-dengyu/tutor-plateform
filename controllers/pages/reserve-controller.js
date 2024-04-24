const { Course, Reservation } = require('../../models')
const { inTwoWeeks, inDayOfWeek, isTimeCorrect } = require('../../helpers/date-helpers.js')
const dayjs = require('dayjs')
/******************************* */
const reserveController = {
  reserve: (req, res, next) => {
    const userId = req.user.id
    const courseId = req.params.id
    const { date, time, duration } = req.body

    if (!inTwoWeeks(date)) throw new Error('只能預約兩週內的課程')
    if (!isTimeCorrect(time, duration)) throw new Error('上課開始或結束時間需要在18:00~21:00範圍內')
    Course.findByPk(courseId)
      .then((course) => {
        console.log(inDayOfWeek(date, course.dayOfWeek))
        if (!inDayOfWeek(date, course.dayOfWeek)) throw new Error('只能課成的開課日')
        return Reservation.create({
          courseId,
          userId,
          date,
          time,
          duration
        })
      })
      .then((reservation) => {
        const result = reservation.toJSON()
        console.log(result)
        return res.render('reserveResult', { result })
      })
      .catch((err) => next(err))
    // Course.findByPk({ courseId })
    //   .then((course) => {
    //     if (!inDayOfWeek(date, course.dyaOfWeek)) throw new Error('預約日(星期幾)與課程開課日不符')
    //     return Reservation.findAll({
    //       where: {
    //         courseId: courseId,
    //         date: date
    //       }
    //     })
    //   })
    //   .then(() => {})
    //   .catch((err) => next(err))
  }
}
/******************************* */
module.exports = reserveController
