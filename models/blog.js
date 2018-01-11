'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// создание схемы
const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Укажите заголовок статьи'] // обязательное поле
  },
  date: {
    type: String,
    required: [true, 'Укажите дату публикации']
  },
  body: {
    type: String,
    required: [true, 'Укажите содержимое статьи']
  }
});
// создание модели
mongoose.model('blog', BlogSchema);