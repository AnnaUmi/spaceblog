/*const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res) { // обращение к корневой папке
  let obj = {title: "Главная страница"}; // создаем объект 
  res.render('pages/index', obj); // передача и рендер шаблона, obj - это все переменные, title
});

router.get('/blog', function(req, res) { // если пришел get запрос на blog вызывается cb ф-ция, но нам нужны данне с переменной article объявляем ее вверху
  let obj = {title: "Blog"};
  const Model = mongoose.model('blog')// получили модель блога
  Model.find().then(items => {// ищем все записи find вернет промис и все записи которые найдет
  	Object.assign(obj, {items: items});// перед рендером объединяем объект с итемами
  	res.render('pages/blog', obj);//теперь рендерим все записи
  })
  
  res.render('pages/blog', obj);
});

module.exports = router;
*/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res) { // обработчик маршрута, при '/' - путь по которому выполнился запрос + function - cb ф
  let obj = {title: 'Главная страница'}; // создаем объект, кот будем передавать в наш шаблон
  const Model = mongoose.model('pic');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
    res.render('pages/index', obj); // передаем шаблон и объект кот нужно отдать в браузер и отрендерить
  });

});



router.get('/blog', function(req, res) {
  let obj = {title: 'Blog'};
  const Model = mongoose.model('blog');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
    res.render('pages/blog', obj);
  });
  
});


module.exports = router;