'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const scheduleSchema = mongoose.Schema({
eventSchedules:[{
startTime: Date,
endTime: Date,
speaker:String,
topic: String
}]

},
{timestamps: true});

module.exports = mongoose.model('Schedule', scheduleSchema);