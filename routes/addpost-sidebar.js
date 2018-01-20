const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config.json');

router.get('/', function (req, res) {
  let obj = { title: 'Добавить пост'};
  res.render('pages/addpost-sidebar', obj);
});

router.post('/', function (req, res) {
  let form = new formidable.IncomingForm();
  form.uploadDir = config.upload;
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
    const Model = mongoose.model('blogpic');
    // если картинка загружена с одним и тем же именем
    fs.rename(files.photo.path, path.join(config.upload, files.photo.name), function (err) {
        if (err) {
          fs.unlink(path.join(config.upload, files.photo.name)); // удаляем
          fs.rename(files.photo.path, files.photo.name); // и переименовываем
        }
        let dir = config.upload.substr(config.upload.indexOf('/'));
        const item = new Model({name: fields.name, title: fields.title, date: fields.date });
        item.save().then(pic => {
          Model.update({_id: pic._id}, {$set: {picture: path.join(dir, files.photo.name)}}, {upsert: true})
          .then(
            i => res.json({status: 'Запись успешно загружена'}),
            e => res.json({status: e.message})
          );
        });
     });
  });
});



module.exports = router;
