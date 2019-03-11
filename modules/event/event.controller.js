
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Event = require('./event.schema');

exports.createEvent = async (req, res, next)=>{
  let event = new Event(req.body);
  event.location.coordinates.push(req.body.lng, req.body.lat);
  event.location.address = req.body.address;
  event.users.push(req.tokenData.user_id);
  await event.save();
  res.end();

};


exports.getEvents = async (req, res, next)=>{
  var now = new Date(Date.now());
  const events = await Event.find({
    startSession: {
        $gte: now
    }
    });
   req.events = events;
   next();
};


exports.getNextEvents = async (event)=>{
     return new Promise( async (resolve, reject)=>{
           var now = new Date(Date.now());
           const events = await Event.find({
             startSession: {
            $gte: now
           },
          _id: {
           $gt: event._id}
          }).sort({_id: 1});

          resolve(events);
     });  
};


exports.validateEventRegister = async (req, res, next)=>{

};
