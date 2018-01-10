const express = require('express');
const router = express.Router();
const article = require('../source/data/article');

router.get('/', function(req, res) { // обращение к корневой папке
  let obj = {title: "Главная страница"}; // создаем объект 
  res.render('pages/index', obj); // передача и рендер шаблона, obj - это все переменные, title
});

/*router.get('/blog', function(req, res) {
  let obj = {title: "Blog"};
  Object.assign(obj, article);
  res.render('pages/blog', obj);
});*/

module.exports = router;