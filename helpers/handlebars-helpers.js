const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
/*輸出東西提共給handlebars template{{}}引用************************************* */

module.exports = {
  currentYear: (date) => dayjs().year(),
  transDateTime: (date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm')
  },
  relativeTimeFromNow: (a) => dayjs(a).fromNow(),
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  addOne: function (value) {
    return value + 1
  }
}
