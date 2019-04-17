const mongoose = require('mongoose')

const schema = mongoose.Schema({
    key: String,
    keydate: String
})

module.exports = mongoose.model('keys',schema)