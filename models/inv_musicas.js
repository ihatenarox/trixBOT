const mongoose = require('mongoose')

const schema = mongoose.Schema({
    find: String,
    numero: { type: Number, min: 0, max: Infinity }
})

module.exports = mongoose.model('inv_musicas', schema)