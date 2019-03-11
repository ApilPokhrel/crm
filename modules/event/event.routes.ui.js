const router = require('express').Router();
const { SecureUI } = require("../../utils/secure");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const event = require('./event.controller');
const Event = require('./event.schema');
const validator = require('../../services/FormValidation');

router.get('/', async (req, res)=>  res.render('event/events',{title: 'Event'}));

router.post('/create', SecureUI(), validator.validateEvent, event.createEvent);

router.get('/create', SecureUI(), (req, res, next)=> res.render('event/create-event',{title: 'create-event'}));


router.get('/admin', SecureUI(), (req, res) => res.render('event/admin',{title: 'EventList'}));

router.get('/edit/:id', SecureUI(), async (req, res)=>{
   const event = await Event.findById(req.params.id);
   if(!event) res.redirect('back');
   console.log(event);
   res.render('event/edit', {title:'Edit Event', event})
  });

//Social Auth
router.get('/facebook', (req, res)=>{
  let eventId = req.query.eventId;
  if(!eventId){res.redirect('back'); return};
  res.cookie('redirect_url', `/event/${eventId}`);

  let accessToken = req.cookies['access_token'];
  if(accessToken){ res.redirect(`/event/${eventId}`); return;}

   res.redirect('/auth/facebook');
});

router.get('/google', (req, res)=>{
  let eventId = req.query.eventId;
  if(!eventId){res.redirect('back'); return};
  res.cookie('redirect_url', `/event/${eventId}`);

  let accessToken = req.cookies['access_token'];
  if(accessToken){ res.redirect(`/event/${eventId}`); return;}
   res.redirect('/auth/google');
});


router.get('/:id',SecureUI(), async(req, res)=> res.render('event/event',{title: event.title}));




module.exports = router;