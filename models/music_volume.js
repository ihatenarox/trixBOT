const mongoose = require('mongoose')

const SchemaEco = mongoose.Schema({
    guildid: String,
    volume: Number,
    pedir_channel: String,
    log_channel: String,
    music_channel: String,
    playlist: Boolean,
    tempo: Number
})

module.exports = mongoose.model('music_volume', SchemaEco)