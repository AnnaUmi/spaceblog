const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
  let obj = {
    title: 'Загрузка картинки'
  };
  res.render('pages/upload', obj);
});


module.exports = router;