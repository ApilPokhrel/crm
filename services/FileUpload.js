'use strict';

const multer = require('multer');

 var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'.'+file.mimetype.split('/')[1])
    }
  });
   
  
  
  
  
        exports.upload = multer({ storage: storage ,
            fileFilter(req, file, cb){
            const isPhoto = file.mimetype.startsWith('image/');
            if(isPhoto){ 
         
            cb(null, true);
            } else{
        
            cb({message:'type of file is not supported'}, false);
            }
         
        }});


        exports.delete = (filename)=>{
          var fs = require('fs');
          var filePath = './public/uploads/'+filename; 
          fs.unlinkSync(filePath);
        };