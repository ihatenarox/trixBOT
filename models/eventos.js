const mongoose = require('mongoose')

const SchemaEco = mongoose.Schema({
    id: String,
    msgs: Number,
    key: String
})

module.exports = mongoose.model('eventos', SchemaEco)