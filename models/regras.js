const mongoose = require('mongoose')

const RegrasSchema = mongoose.Schema({
    guildid: String,
    regras: String
})

module.exports = mongoose.model('regras',RegrasSchema)