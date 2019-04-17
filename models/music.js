const mongoose = require('mongoose')

const SchemaEco = mongoose.Schema({
    guildid: String,
    link: String,
    autor: String,
    id: { type: Number, min: 0, max: Infinity }
})

module.exports = mongoose.model('musics', SchemaEco)