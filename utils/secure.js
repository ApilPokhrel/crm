const UserController = require("../modules/user/user.controller");
const { ERR } = require("./error");

//This processes token from header x-access-token
const SecureAPI = () => {
  return function(req, res, next) {
    //TODO need to verify permissions
    var token = req.body.access_token || req.query.access_token || req.headers["access_token"];
    if (!token) throw ERR.TOKON_REQ;

    UserController.validateToken(token)
      .then(t => {
        req.tokenData = t.data;
        next();
      })
      .catch(next);
  };
};

//This processes token from cookies
const SecureUI = perms => {
  return function(req, res, next) {
    //TODO need to verify permissions
    var token =
      req.cookies.access_token ||
      req.query.access_token ||
      req.body.access_token ||
      req.headers["access_token"];
    if (!token) {
      res.redirect("/login");
      res.end();
    }

    UserController.validateToken(token)
      .then(t => {
        req.tokenData = t.data;

        next();
      })
      .catch(err => {
        res.redirect("/login");
        res.end();
      });
  };
};


module.exports = {
  SecureAPI,
  SecureUI
};
