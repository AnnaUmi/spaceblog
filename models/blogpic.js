'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogPicSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Укажите описание картинки']
    },
    picture: {
      type: String
    },
    title: {
      type: String,
      required: [true, 'Укажите заглавие']
    },
    date: {
      type: String,
      required: [true, 'Укажите дату в любой форме']
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
let blogpic = module.exports = mongoose.model('blogpic', BlogPicSchema);