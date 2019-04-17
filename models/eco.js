const mongoose = require('mongoose')

const SchemaEco = mongoose.Schema({
    guildid: String,
    userid: String,
    coins: { type: Number, min: 0, max: Infinity }
})

module.exports = mongoose.model('ecos', SchemaEco)