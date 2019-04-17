const mongoose = require('mongoose')

const schema = mongoose.Schema({
    userid: String,
    mult: Number
})

module.exports = mongoose.model('vips',schema)