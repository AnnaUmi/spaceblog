const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser'); // для работы с полями формы
const server = http.createServer(app);
const currentStatic = require('./gulp/config').root; // наши статические данные с config.js и вытаскиваем парамерт root
//const config = require('./config.json');
//const uploadDir = config.upload;

// подключаю шаблонизатор
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json()); // распарсивание значений с post запросов
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, currentStatic)));

app.use('/', require('./routes/index'));
app.use('/upload', require('./routes/upload'));
//app.use('/contact', require('./routes/mail'));

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res
    .status(404)
    .render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res
    .status(500)
    .render('500');
});

// запускаю сервер
server.listen(3000, 'localhost');
server.on('listening', function () {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});