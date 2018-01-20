const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const formidable = require('formidable');
const fs = require('fs');
const config = require('../config.json');
const path = require('path');

router.get('/', function(req, res) { // обработчик маршрута, при '/' - путь по которому выполнился запрос + function - cb ф
  let obj = {title: 'Главная страница'}; // создаем объект, кот будем передавать в наш шаблон
  const Model = mongoose.model('blogpic');
  Model.find().then(articles => {
    Object.assign(obj, {articles: articles});
   res.render('pages/index', obj); // передаем шаблон и объект кот нужно отдать в браузер и отрендерить
  });

});
router.get('/gallery', function(req, res) { // обработчик маршрута, при '/' - путь по которому выполнился запрос + function - cb ф
  let obj = {title: 'Главная страница'}; // создаем объект, кот будем передавать в наш шаблон
  const Model = mongoose.model('pic');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
    res.render('pages/gallery', obj); // передаем шаблон и объект кот нужно отдать в браузер и отрендерить
  });
 
});


router.get('/blog-sidebar/:id', function(req, res){
  const Model = mongoose.model('blogpic');
  Model.findById(req.params.id, function(err, article){
    res.render('pages/single-article', {
      article:article
    });
  });
});

router.get('/blog-sidebar/edit/:id', function(req, res){
  const Model = mongoose.model('blogpic');
  Model.findById(req.params.id, function(err, article){
    res.render('pages/edit-blog', {
      title: 'edit',
      article: article
    });
  });
});

router.post('/blog-sidebar/edit/:id', function(req, res){
  let form = new formidable.IncomingForm();
   form.parse(req, function (err, fields, files) {
    if (err) {
      return res.json({status: 'Не удалось загрузить картинку'});
    }
    if (!fields.name) {
      return res.json({status: 'Не указн пост'});
    }
     if (!fields.title) {
      return res.json({status: 'Не указн заголовок'});
    }
     if (!fields.date) {
      return res.json({status: 'Не указна дата'});
    }
let article = {};
  article.title = fields.title;
  article.date = fields.date;
  article.name = fields.name;

  let query = {_id:req.params.id}
 const Model = mongoose.model('blogpic');
Model.update(query, article, function(err){
  if(err){
  console.log(err);
    return;
  } else{
    res.redirect('/blog-sidebar');
   }
 })

  });

});

router.delete('/blog-sidebar/:id', function(req, res){
  let query = {_id:req.params.id};
//console.log(query)
const Model = mongoose.model('blogpic');
  Model.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('all ok')
  });
});



module.exports = router;