const mongoose = require("mongoose")

const config_Schema = mongoose.Schema({
    guildid: String,
    roleid: String
})

module.exports = mongoose.model('staff-list', config_Schema)