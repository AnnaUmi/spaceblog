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

router.get('/single-article-1', function(req, res) {
  let obj = {title: 'Что такое северное сияние?'};
  const Model = mongoose.model('blog');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
    res.render('pages/single-article-1', obj);
  });
  
});
router.get('/single-article-2', function(req, res) {
  let obj = {title: 'Что такое северное сияние?'};
  const Model = mongoose.model('blog');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
    res.render('pages/single-article-2', obj);
  });
  
});

module.exports = router;