//TODO 

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const config = require("config");
const { UserManager, Utils } = require("rs-user");

const { TextUtils, Error, ERR } = require("../../utils");
const messenger = require("../../utils/messenger");

class UserController extends UserManager {
  loginExternal({ service, service_id, extras }) {
    return this.authenticateExternal({
      service,
      service_id,
      tokenData: 'calculateTokenData',
      jwtDuration: config.get("jwt.duration"),
      extras
    });
  };

  


  findCommByEmail(email){
     return new Promise(async(resolve, reject)=>{
        resolve(await this.models.CommModel.findOne({'type': 'email', 'address': email}));
     });
  };

}

module.exports = new UserController({
  mongoose,
  messenger,
  appSecret: config.get("app.secret"),
  jwtDuration: config.get("jwt.duration"),
  modelConfig: {
    User: {
      schema: {
        gender: String,
        dob: Date,
      }
    }
  }
});
