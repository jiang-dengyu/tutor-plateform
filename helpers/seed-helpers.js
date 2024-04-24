const dayjs = require('dayjs')
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
const generateUser = (id, email, isAdmin, name, password) => {
  return {
    id,
    name,
    email,
    password,
    is_admin: isAdmin,
    created_at: new Date(),
    updated_at: new Date()
  }
}
/*回傳History instance物件↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
const generateHistory = () => {
  const history = []
  let id = 1
  let userId = 2
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 3; j++) {
      let newObject = {
        id: id,
        user_id: userId,
        course_id: Math.floor(Math.random() * 20 + 1),
        date: dayjs()
          .subtract(Math.floor(Math.random() * 30), 'day')
          .format('yyyy-MM-DD'),
        created_at: new Date(),
        updated_at: new Date()
      }
      history.push(newObject)
      id++
    }
    userId++
  }
  return history
}
/******************************************************* */
module.exports = { getRandomDays, generateUser, generateHistory }
