'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PicSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Укажите описание картинки']
    },
    picture: {
      type: String
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('pic', PicSchema);