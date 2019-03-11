
const request = require('request');
const fs = require('fs');



exports.upload = (file, )=>{

var req = request.post(url, function (err, resp, body) {
    if (err) {
      console.log('Error!');
    } else {
      console.log('URL: ' + body);
    }
  });
  var form = req.form();
  form.append('file', fs.createReadStream('filepath'));
  form.append('','');
  form.append('','');
}