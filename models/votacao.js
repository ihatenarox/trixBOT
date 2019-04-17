const mongoose = require("mongoose")

const config_Schema = mongoose.Schema({
    guildid: String,
    id: String,
    messageid: String,
    desc: String
})

module.exports = mongoose.model('votacoes', config_Schema)