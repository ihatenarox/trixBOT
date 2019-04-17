const mongoose = require("mongoose")

const config_Schema = mongoose.Schema({
    guildid: String,
    id: String,
    messageid: String,
    desc: String
})

module.exports = mongoose.model('sorteios', config_Schema)