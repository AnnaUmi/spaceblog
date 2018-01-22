const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', function (req, res) {
  let obj = { title: 'Блог с сайдбаром'};
  const Model = mongoose.model('blogpic');

  Model.find().then(items => {
    Object.assign(obj, {items: items}); //obj допослнить объектом items
   res.render('pages/blog-sidebar', obj); // передаем шаблон и объект кот нужно отдать в браузер и отрендерить
  });
  
});


module.exports = router;
