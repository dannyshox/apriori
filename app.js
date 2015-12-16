var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Apriori = require('apriori');
var fs = require('fs');
var async = require('async');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.post('/apriori', function(req, res) {
  //console.log('TEST: ' + req.body.data);
  //res.send('POST request to the homepage');
  //var text = fs.readFileSync('./public/datasets/transactions.csv','utf8');
  //console.log(text);
  //var result = 
  //setTimeout(function() { res.send(result); }, 2000);
  console.log('JERE');

  new Apriori.Algorithm(0.001, 0.001, true).showAnalysisResultFromFile('./public/datasets/transactions.csv', function(err, data) {
    console.log('TESTER');
  });

  

  // async.parallel([
  //     function(callback) { //This is the first task, and callback is its callback task
         
  //             callback();
       
  //     },
  //     function(callback) { //This is the second task, and callback is its callback task
  //       console.log('asdsad' + s);
  //       res.send(s)
  //     }
  //   ], function(err) { //This is the final callback
  //       console.log('Both a and b are saved now');
  //   });


//   fs.readFile('./public/datasets/transactions.csv', 'utf8', function (err, data) {
//     if (err)
//         throw err;

//     delimiter = ',';
//     var regexp = new RegExp(("(\\" + delimiter + "|\\r?\\n|\\r|^)" + "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + "([^\"\\" + delimiter + "\\r\\n]*))"), 'gi');

//     var arrayOfRows = [[]];
//     var matched;
//     var analysisResult;

//     while (!!(matched = regexp.exec(data))) {
//         var matchedDelimiter = matched[1];
//         if (matchedDelimiter.length && matchedDelimiter !== delimiter) {
//             arrayOfRows.push([]);
//         }
//         var matchedValue = matched[2] ? matched[2].replace(new RegExp('""', 'g'), '"') : matched[3];
//         if (matchedValue.length > 0) {
//             arrayOfRows[arrayOfRows.length - 1].push(matchedValue);
//         }
//     }

//     analysisResult = self.analyze(arrayOfRows);
     
//     console.log('TEST FILE');

//     //console.log(JSON.stringify(analysisResult.associationRules));
//     res.send(analysisResult);

// });
  //res.send('sdfasd');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
