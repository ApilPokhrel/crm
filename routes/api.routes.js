const router = require('express').Router();
const user = require('../modules/user/user.routes.api');
const event = require('../modules/event/events.routes.api');
router.use('/user', user);
router.use('/event', event);
module.exports = router;