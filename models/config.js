const mongoose = require("mongoose")

const config_Schema = mongoose.Schema({
    guildid: String,

    //bemvindo
    bem_vindo_channel: String,
    bem_vindo_msg: String,
    autorole_id: String,

    //saida
    saida_channel: String,
    saida_msg: String,

    //contador de membros
    contador_de_membros_channel: String,

    //punicoes
    punicoes_channel: String,

    //antilink
    antilink: String,

    //ticketchannel
    ticket_channel: String,

    //logs
    modlog_channel: String
})

module.exports = mongoose.model('guild_configs', config_Schema)