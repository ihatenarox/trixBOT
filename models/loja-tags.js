const mongoose = require('mongoose')

const SchemaEco = mongoose.Schema({
    guildid: String,
    id: String,
    roleid: String,
    valor: Number,
    desc: String
})

module.exports = mongoose.model('shop-role', SchemaEco)