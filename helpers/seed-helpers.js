const dayjs = require('dayjs')
const faker = require('faker')
/*產生隨機dyaOfWeeks陣列↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
const getRandomDays = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] //星期一到日
  const randomDays = [] //最終回傳的列表
  const numDays = Math.floor(Math.random() * daysOfWeek.length) + 1 //隨機選擇要選幾天(下面迴圈要新增幾輪，一輪加一個)

  for (let i = 1; i < numDays + 1; i++) {
    const randomIndex = Math.floor(Math.random() * daysOfWeek.length) //抽一個index
    const day = daysOfWeek[randomIndex] //將inde的對應元素放入要被輸出的陣列中
    if (!randomDays.includes(day)) {
      randomDays.push(day) //檢查 如果是新的元素就新增
    } else {
      i-- //如果沒有新增就重跑這圈
    }
  }
  randomDays.sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)) //randomDays的元素對應daysOfWeek的index數字大小進行sorting
  return randomDays
}
/*回傳User instance物件↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
const generateUser = (id, email, isAdmin, name, password, totalHours, image, intro) => {
  return {
    id,
    name,
    email,
    password,
    is_admin: isAdmin,
    total_hours: totalHours,
    image,
    intro,
    created_at: new Date(),
    updated_at: new Date()
  }
}
/*回傳History instance物件陣列↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
const generateHistory = () => {
  const history = []
  let id = 1
  for (let i = 1; i < 6; i++) {
    for (let j = 1; j < 3; j++) {
      let newObject = {
        id: id,
        user_id: i + 1,
        course_id: Math.floor(Math.random() * 20 + 1),
        date: dayjs()
          .subtract(Math.floor(Math.random() * 30), 'day')
          .format('YYYY-MM-DD'),
        created_at: new Date(),
        updated_at: new Date()
      }
      history.push(newObject)
      id++
    }
  }
  return history
}
/*回傳Comment instance物件陣列↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
const generateComment = () => {
  const comment = []
  let id = 1
  for (let i = 1; i < 21; i++) {
    for (let j = 1; j < 3; j++) {
      let newObject = {
        id: id,
        user_id: Math.floor(Math.random() * 5 + 2),
        course_id: i,
        score: Math.floor(Math.random() * 10 + 1),
        comment: faker.lorem.text(),
        hitory_id: 0,
        created_at: new Date(),
        updated_at: new Date()
      }
      comment.push(newObject)
      id++
    }
  }
  return comment
}
/*回傳reservation instance物件陣列↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
const generateReserve = () => {
  const reservation = []

  for (let i = 1; i < 21; i++) {
    for (let j = 1; j < 3; j++) {
      let newReservation = {
        user_id: Math.floor(Math.random() * 5 + 2),
        course_id: i,
        date: dayjs()
          .add(Math.floor(Math.random() * 14 + 1), 'days')
          .format('YYYY-MM-DD'),
        time: '20:00',
        duration: '30',
        created_at: new Date(),
        updated_at: new Date()
      }
      reservation.push(newReservation)
    }
  }
  return reservation
}
/******************************************************* */
module.exports = { getRandomDays, generateUser, generateHistory, generateComment, generateReserve }
