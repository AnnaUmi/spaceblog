const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res) {
  let obj = {
    title: 'Добавить запись блога'
  };
  res.render('pages/addpost', obj);
});

router.post('/', (req, res) => {
    //требуем наличия заголовка, даты и текста
  if (!req.body.title || !req.body.date || !req.body.text) {
    //если что-либо не указано - сообщаем об этом
    return res.json({status: 'Укажите данные!'});
  }
  // пришли данные в пост и пришли валидацию - теперь созаем пост
  const Model = mongoose.model('blog');
  let item = new Model({title: req.body.title, date: req.body.date, body: req.body.text});
  item.save().then(
    (i) => {return res.json({status: 'Запись успешно добавлена'});},
    (e) => {
      const error = Object
        .keys(e.errors) // превращаем в массив
        .map(key => e.errors[key].message) // вытаскиваем все сообщения ошибок
        .join(', '); // соединчем
      res.json({status: 'При добавление записи произошла ошибка: ' + error});
    }
  );
});


module.exports = router;