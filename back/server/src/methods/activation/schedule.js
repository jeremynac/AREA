const schedule = require('node-schedule');
const { activate } = require('@activation/activation');

function scheduleActivation(key) {
    let schedules = {
        '5sec': '*/5 * * * * *',
        '30sec': '*/30 * * * * *',
        '1min': '42 * * * * *',
        '5min': '* /5 * * * *',
        '1h': '* 42 * * * *'
    }
    let time = schedules[key]
    const job = schedule.scheduleJob(time, function() {
        console.log('START !');
        activate()
    });
}

module.exports = {
    scheduleActivation,
}