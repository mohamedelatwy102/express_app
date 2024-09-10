var cron = require("node-cron")


const weeklyReport = ()=> {
    var cron = require('node-cron');

cron.schedule('* * */23 * * *', () => {
  console.log('running a task every two minutes');
});
}

module.exports = weeklyReport