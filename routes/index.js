'use strict';
let fs         = require('fs');
let path       = require('path');
let formidable = require('formidable');
let util       = require('util');
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Uploader' });
});

router.post('/upload/', (req, res) => {
  //let form = new multiparty.Form();
  console.log("Пришел запрос с картинкой");
  //console.log(req.methods);
  //console.log(req.headers);
  //console.log(req.url);

  var form = new formidable.IncomingForm();
  //var file = new formidable.File();
  var files = [];
  var fields = [];

  form.maxFieldsSize = 8 * 1024 * 1024;
  form.multiples = true;
  //form.uploadDir = '/upload';
  form
    .on('field', function(name, field) {
      console.log(name, field);

      fs.writeFile('../upload/myfile.jpg', field, 'binary', function(err){
        if (err) throw err;
        console.log('File saved.');
      });

      fields.push([name, field]);
    })
    .on('file', function(field, file) {
      console.log('FILE!!!');
      console.log(field, file);
      files.push([field, file]);
    })
    .on('end', function() {
      console.log('-> upload done');
      res.writeHead(200, {'content-type': 'text/plain'});
      //res.write('received fields:\n\n '+util.inspect(fields));
      res.write('\n\n');
      res.end('received files:\n\n '+util.inspect(files));
    });
  form.parse(req);

});

module.exports = router;
