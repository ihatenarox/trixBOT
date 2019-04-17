const mongoose = require('mongoose')

const SchemaInfo = mongoose.Schema({
    guildid: String,
    userid: String,
    aviso: String,
    data: String,
    autor: String
})

module.exports = mongoose.model('warns', SchemaInfo)