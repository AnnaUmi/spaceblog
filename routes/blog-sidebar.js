const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://anna_umi:945xdh422@ds261527.mlab.com:61527/en-app');

router.get('/', function (req, res) {
  let obj = { title: 'Пример верстки страницы с сайдбаром'};
  const Model = mongoose.model('blogpic');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
   res.render('pages/blog-sidebar', obj); // передаем шаблон и объект кот нужно отдать в браузер и отрендерить
  });
  
});


module.exports = router;
