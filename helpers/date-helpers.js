const dayjs = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
dayjs.extend(isBetween)
/******************************************* */
const inTwoWeeks = (reserveDate) => {
  const today = dayjs() //當天日期
  const towWeeksLater = today.add(14, 'day') //設置+14天後的日期
  const result = dayjs(reserveDate).isBetween(today, towWeeksLater) //判斷reserveDate是否在兩個時間點內
  return result
}
const inDayOfWeek = (reserveDate, coursedays) => {
  console.log(coursedays)
  const reserveDay = dayjs(reserveDate).format('dddd') //使用者輸入的轉換成星期的代號0~6
  const result = coursedays.includes(reserveDay)
  return result
}
const isTimeCorrect = (time, duration) => {
  duration = parseInt(duration)
  let hours = parseInt(time.split(':')[0]) //取小時的部分
  let minute = parseInt(time.split(':')[1]) //取分鐘的部分
  minute = minute + duration //分鐘加上30/60分鐘，判斷是否進位
  if (minute >= 60) {
    hours = hours + 1
    minute = minute % 60
  }

  if (hours < 18 || hours > 21 || (hours === 21 && minute !== 0)) {
    return false //判斷進位後的時是否在18:00~21:00
  } else {
    return true
  }
}
const existingReservation = (existingDate, existingTime, existingDuration, date, time, duration) => {
  duration = parseInt(duration)
  let hours = parseInt(time.split(':')[0]) //取小時的部分
  let minute = parseInt(time.split(':')[1]) //取分鐘的部分
  const startDateTime = dayjs(date).set('hour', hours).set('minute', minute)
  const endDateTime = dayjs(startDateTime)
  let existingHours = parseInt(dayjs(existingTime).hour()) //取小時的部分
  let existingMinute = parseInt(dayjs(existingTime).minute()) //取分鐘的部分
  existingMinute = existingMinute + existingDuration //分鐘加上30/60分鐘，判斷是否進位
  if (existingMinute >= 60) {
    existingHours = existingHours + 1
    existingMinute = existingMinute % 60
  }
}
/******************************************* */
module.exports = { inTwoWeeks, inDayOfWeek, isTimeCorrect, existingReservation }
