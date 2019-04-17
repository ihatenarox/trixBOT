const mongoose = require('mongoose')

const schema = mongoose.Schema({
    guildid: String,
    userid: String,
    msgid: String,
    status: String,
    id: String,
    pergunta: String,
    resposta: String,
    resposta_autor: String
})

module.exports = mongoose.model('tickets', schema)