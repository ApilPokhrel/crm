const Joi = require('joi');
const file = require('../services/FileUpload');

exports.validateUser = (req, res, next)=>{
    console.log(req.body.name, req.body.email, req.body.contact, req.body.birthDate);
    const schema = Joi.object().keys({
        name: Joi.string().required().label("name is invalid"),
        email: Joi.string().min(6).required().label("email is invalid"),
        contact: Joi.string().label('not a valid contact'),
        birthDate: Joi.string().label('not a valid birth date'),
    });
  
    const result = Joi.validate(req.body, schema,{
        allowUnknown: true,
        abortEarly: false
    });
   
    if(result.error){
        const error = result.error.details.map(err => err.context.label);
        res.json(error);
        return;
  
    } else{
        next();
    }
};





exports.validateEvent = (req, res, next)=>{
     const schema = Joi.object().keys({
     title: Joi.string().required().label("must supply event title"),
     description: Joi.string().required().label("must supply event description"),
     startSession: Joi.date().min(Date.now()).required().label("must supply valid event start session"),
     endSession: Joi.date().min(req.body.startSession || Date.now()).required().label("must supply valid event end Session"),
     lat: Joi.number().required().label("must supply event latitude"),
     lng: Joi.number().required().label("must supply event longitude"),
    //  status: Joi.boolean().required().label("must supply status!"),
     address:  Joi.string().required().label("must supply event address"),
     seats: Joi.number().min(1).required().label("must provide no of seats")
     });

     const result = Joi.validate(req.body, schema,{
         allowUnknown: true,
         abortEarly: false
     });

     if(result.error){
         const error = result.error.details.map(err => err.context.label);
         res.json(error);
         return;
     } else{
         next();
     }
};