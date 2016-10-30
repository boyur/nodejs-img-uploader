'use strict';
let fs         = require('fs');
let path       = require('path');
let multiparty = require('multiparty');
let util       = require('util');
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Uploader' });
});

router.post('/upload/', (req, res) => {
  var count = 0;
  var form = new multiparty.Form();

// Errors may be emitted
// Note that if you are listening to 'part' events, the same error may be
// emitted from the `form` and the `part`.
  form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
  });

// Parts are emitted when parsing the form
  form.on('part', function(part) {
    // You *must* act on the part by reading it
    // NOTE: if you want to ignore it, just call "part.resume()"

    if (!part.filename) {
      // filename is not defined when this is a field and not a file
      console.log('got field named ');
      console.log(part.headers);
      // ignore field's content
      part.resume();
    }

    if (part.filename) {
      // filename is defined when this is a file
      count++;
      console.log('got file named ' + part.name);
      // ignore file's content here
      part.resume();
    }

    part.on('error', function(err) {
      // decide what to do
    });
  });

// Close emitted after form parsed
  form.on('close', function() {
    console.log('Upload completed!');
    //res.setHeader('text/plain');
    res.end('Received ' + count + ' files');
  });

// Parse req
  form.parse(req);


  // var form = new multiparty.Form();
  // //var file = new formidable.File();
  // var files = [];
  // var fields = [];
  //
  // form.maxFieldsSize = 10 * 1024 * 1024;
  // form.multiples = true;
  // //form.uploadDir = '/upload';
  // form
  //   .on('field', function(name, field) {
  //     console.log(name, field);
  //
  //     fs.writeFile('../upload/myfile.jpg', field, 'binary', function(err){
  //       if (err) throw err;
  //       console.log('File saved.');
  //     });
  //
  //     fields.push([name, field]);
  //   })
  //   .on('file', function(field, file) {
  //     console.log('FILE!!!');
  //     console.log(field, file);
  //     files.push([field, file]);
  //   })
  //   .on('end', function() {
  //     console.log('-> upload done');
  //     res.writeHead(200, {'content-type': 'text/plain'});
  //     //res.write('received fields:\n\n '+util.inspect(fields));
  //     res.write('\n\n');
  //     res.end('received files:\n\n '+util.inspect(files));
  //   });
  // form.parse(req);


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
