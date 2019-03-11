const router = require('express').Router();
const { SecureAPI } = require("../../utils/secure");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Event = require('./event.schema');
const validator = require('../../services/FormValidation');
const EventController = require('./event.controller');


router.get('/', EventController.getEvents, async (req, res)=>{
    const events = req.events;
    res.json(events);
  });

router.get('/:id',SecureAPI(), async (req, res)=>{
  let event = await Event.findById(req.params.id);
  let events;
  let msg;
  if(!event) res.end(); 
  const redirectUrl = req.cookies['redirect_url'];

  if(redirectUrl){
    if(event.seats > event.users.length){
    await Event.updateOne({_id: event._id}, {$addToSet:{users: req.tokenData.user_id}});
    } else{
      msg = 'Event is full register for next events';
      events = await EventController.getNextEvents(event);
    }
  }
  let registered;
  if(event){registered = (event.users.indexOf(req.tokenData.user_id) > -1) ? true : false;}
  res.json({event, registered, msg, events});
});



router.delete('/:id', SecureAPI(), async (req, res)=>{
  const event = await Event.findByIdAndRemove(req.params.id);
  res.end();
});


router.patch('/:id', SecureAPI(), validator.validateEvent, async(req, res)=>{
 const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true, upsert: true, setDefaultsOnInsert: true});
 res.end();
});

  module.exports = router;