const router = require("express").Router();
const { SecureUI } = require("../utils/secure");
const AuthRouter = require("./ui.routes.auth");
const SettingsController = require("../modules/settings/settings.controller");
const eventUi = require('../modules/event/event.routes.ui');
const userUi = require('../modules/user/user.routes.ui');
const passport = require('passport');
const UserController =  require('../modules/user/user.controller');


router.use('/event',eventUi);
router.use('/user', userUi);

/* GET home page. */
router.get("/", SecureUI(), (req, res, next) => {
  res.render("index", { title: "Rumsan Seed" });
});

router.get("/app", async (req, res, next) => {
  let settings = await SettingsController.get();
  res.render("app", {
    settings
  });
});

router.get("/settings", SecureUI(), (req, res, next) => {
  res.render("misc/settings", { title: "Settings" });
});

router.use("/", AuthRouter);



require('../utils/passport');

router.get('/auth/facebook',(req, res, next)=>{
     next();
}, passport.authenticate('facebook',{ scope: ['email']}));


router.get('/auth/facebook/callback',
  (req, res, next)=>{
  passport.authenticate('facebook', async (err, user)=>{
     if(err){
       let data = {name: '', email: ''};
       res.render('register_social', {title:'social_login', data})
     }
     else {
      const redirect_url = req.cookies['redirect_url'];
       if(user){
        res.cookie('access_token', user.token);
        res.redirect(redirect_url);
       } else{
       let data = {name: user.extras.displayName, email: user.extras.emails[0].value}
       res.render('register_social', {title:'social_login', data})
       }
     }
    })(req, res, next);
  } 
);
                                      
                                                                    
router.get('/auth/google',(req, res, next)=>{
   next();
},
  passport.authenticate('google', { scope: 
                                   [ 'https://www.googleapis.com/auth/plus.login',
                                  , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
                                    ));

router.get('/auth/google/callback',
  (req, res, next)=>{
  passport.authenticate('google', async (err, user)=>{
   let data;
   const redirect_url = req.cookies['redirect_url'];
   if(user){
     res.cookie('access_token', user.token);
     res.redirect(redirect_url);
   }else{
     res.render('register_social', {title: 'title', data});
   }   
  })(req, res, next);
}
);


module.exports = router;
