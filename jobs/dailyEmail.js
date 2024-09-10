var cron = require("node-cron")


const dailyEmail = ()=> {
    var cron = require('node-cron');

cron.schedule('*/2 * * * * *', () => {
  console.log('running a task every two minutes');
});
}

module.exports = dailyEmail