const mongoose = require('mongoose')

const SchemaInfo = mongoose.Schema({
    guildid: String,
    userid: String,
    mutes: String,
    warns: String
})

module.exports = mongoose.model('userinfo', SchemaInfo)