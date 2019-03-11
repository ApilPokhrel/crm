'use strict';

//TODO: require  modules

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const eventSchema = mongoose.Schema({

    title:{type: String, required: true, trim: true},
    description:{type:String, required: true, trim: true},
    endSession: {type: Date, required: true},
    startSession:{type: Date, require: true},
    users:[{type: mongoose.Schema.Types.ObjectId, ref:'useres'}],
    eventType:{type: String, required: true},
    // status:{type: Boolean, default: false},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    seats:Number,
    schedule: {type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'},
    images:[String],
    speakers:[mongoose.Schema.Types.ObjectId],
    sponsers:[{
        name:{type: String},
        profile:{type: String}
    }],
    location:{
        type:{
        type:String,
        default: 'Point'
        },
        coordinates:[{
            type: Number,
           
        }],
        address:{
            type: String,
        }
    }
},
{timestamps: true});

module.exports = mongoose.model('events', eventSchema);