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
const existingReservation = (existingDate, existingTime, existingDuration, newDate, newTime, newDuration) => {
  const existingStart = dayjs(`${existingDate} ${existingTime}`) //用dayjs組合成完整 起始時間
  const existingEnd = existingStart.add(existingDuration, 'minute') //用dayjs組合成完整 結束時間

  const newStart = dayjs(`${newDate} ${newTime}`)
  const newEnd = newStart.add(newDuration, 'minute')

  if (newStart.isAfter(existingEnd) || newEnd.isBefore(existingStart)) {
    return false //時段沒交集(重疊)給予false，也就不跑後面的if(result)
  } else {
    return true
  }
}
/******************************************* */
module.exports = { inTwoWeeks, inDayOfWeek, isTimeCorrect, existingReservation }
