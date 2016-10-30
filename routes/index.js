'use strict';
let fs         = require('fs');
let path       = require('path');
//let multiparty = require('multiparty');
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

  var form = new formidable.IncomingForm();
  var files = [];
  var fields = [];

  form.uploadDir = '/upload';

  form
    .on('field', function(field, value) {
      console.log(field, value);
      fields.push([field, value]);
    })
    .on('file', function(field, file) {
      console.log(field, file);
      files.push([field, file]);
    })
    .on('end', function() {
      console.log('-> upload done');
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received fields:\n\n '+util.inspect(fields));
      res.write('\n\n');
      res.end('received files:\n\n '+util.inspect(files));
    });
  form.parse(req);


  // form.parse(req, function(err, fields, files) {
  //   res.writeHead(200, {'content-type': 'text/plain'});
  //   res.write('received upload:\n\n');
  //
  //   console.log(fields);
  //
  //   res.end(util.inspect({fields: fields, files: files}));
  // });

  // form.parse(req, function(err, fields, files) {
  //
  //   console.log("Парсим");
  //
  //   if (err) {
  //     console.log("Ошибка");
  //     return res.send(JSON.stringify({error: err.message || err}))
  //   }
  //
  //   console.log(fields);
  //   console.log(files);
  // });

});

  //res.send(JSON.stringify({message: 'Фаил загружен'}));


module.exports = router;
