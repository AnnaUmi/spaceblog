const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const logger = require('morgan'); // выполняет дебаг, все логи в консоле, отслеживаем ошибки
const bodyParser = require('body-parser'); // для работы с полями формы (получать запросы)
const server = http.createServer(app);
const currentStatic = require('./gulp/config').root; // наши статические данные с config.js и вытаскиваем парамерт root
const config = require('./config.json');
const uploadDir = config.upload;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // заменяем промисы монгусв на промисы ноды, так как они устаревшие у монгуса
mongoose.connect('mongodb://anna_umi:945xdh422@ds247077.mlab.com:47077/savemyblogposts');


//подключаем модели(сущности, описывающие коллекции базы данных)
require('./models/blog');
require('./models/pic');
require('./models/blogpic');

// подключаю шаблонизатор
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// промежуточное по (midleware), все запросы кот, приходят на сервер пропускаются через промежуточное по
app.use(logger('dev'));
app.use(bodyParser.json()); // распарсивание значений с post запросов
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, currentStatic))); 


// использование роутеров
app.use('/', require('./routes/index')); // отвечает за выдачу ресурсов на вервер
app.use('/upload', require('./routes/upload'));
app.use('/contact', require('./routes/mail'));
app.use('/addpost', require('./routes/addpost'));
app.use('/addpost-sidebar', require('./routes/addpost-sidebar'));
app.use('/blog-sidebar', require('./routes/blog-sidebar'));

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404).render('404'); // если наши роутеры не найдут нужгую страницу будет вызван app.use
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) { // если будет ошибка на странице
  console.error(err.stack);
  res.status(500).render('500');
});

// запускаю сервер
//server.listen(80, '92.53.105.224'); here is running my web
server.listen(3000, 'localhost');
server.on('listening', function () {
   if (!fs.existsSync(uploadDir)) { // если нет мойей папки upload то сосздать
    fs.mkdirSync(uploadDir);
  }
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
// для pug
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}
