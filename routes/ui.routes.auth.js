const router = require('express').Router();
const UserController= require('../modules/user/user.controller');

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.post('/login_process', (req, res, next) => {
  UserController.authenticate(req.body)
  .then(data=> {
    res.cookie('access_token', data.token);
    res.cookie('name', JSON.stringify(data.name));
    res.json(data)
  })
  .catch(err => next(err))
});

router.get('/logout', (req, res, next) => {
  res.clearCookie("access_token");
  res.redirect('/login');
});

router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Register' });
});

module.exports = router;
