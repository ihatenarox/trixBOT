const mongoose = require("mongoose")

const config_Schema = mongoose.Schema({
    guildid: String,
    userid: String,
    tempo: String
})

module.exports = mongoose.model('mutes', config_Schema)