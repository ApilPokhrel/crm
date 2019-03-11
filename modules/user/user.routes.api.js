const router = require("express").Router();
const UserController = require("./user.controller");
const { SecureAPI } = require("../../utils/secure");
const Event = require('../event/event.schema');


router.post("/login", (req, res, next) => {
  let payload = Object.assign({}, req.body);
  if (req.body.remember === true) payload.jwtDuration = config.get("jwt.duration_long");

  UserController.authenticate(payload)
    .then(u => res.json(u))
    .catch(e => next(e));
});

router.get("/me", SecureAPI(), (req, res, next) => {
  UserController.getById(req.tokenData.user_id)
    .then(u => res.json(u))
    .catch(e => next(e));
});

router.post("/", async(req, res, next) => {
 
 try{
    await UserController.createUsingEmail(req.body);
    res.json('/login');

 }catch(e){
  res.json('/login'); 
  return;
 }
});

module.exports = router;
