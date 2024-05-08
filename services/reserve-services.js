const { Course, Reservation } = require('../models')
const { inTwoWeeks, inDayOfWeek, isTimeCorrect, existingReservation } = require('../helpers/date-helpers.js')

/******************************* */
const reserveServices = {
  reserve: (req, cb) => {
    const userId = req.user.id
    const courseId = req.params.id
    console.log(userId)
    const { date, time, duration } = req.body
    if (!inTwoWeeks(date)) throw new Error('只能預約兩週內的課程')
    if (!isTimeCorrect(time, duration)) throw new Error('上課開始或結束時間需要在18:00~21:00範圍內')

    Promise.all([Course.findByPk(courseId), Course.findOne({ where: { userId }, raw: true })])
      .then(([course, checkTeacher]) => {
        if (checkTeacher) throw new Error('此帳號為老師 不能夠預約課程')
        if (!inDayOfWeek(date, course.dayOfWeek)) throw new Error('只能課成的開課日')

        return Reservation.findAll({
          where: {
            courseId: courseId,
            date: date
          },
          raw: true
        })
      })
      .then(([reservations]) => {
        const result = reservations
          ? reservations.some((reservation) => {
              return existingReservation(reservation.date, reservation.time, reservation.duration, date, time, duration)
            })
          : false
        if (result) throw new Error('時段已被預約')
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
        return cb(null, { result })
      })
      .catch((err) => cb(err))
  }
}
/******************************* */
module.exports = reserveServices
