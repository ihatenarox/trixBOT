//principais
const Discord = require('discord.js')
const fs = require('fs')
const config = require("../config.json")

//database
const mongoose = require("mongoose")
mongoose.connect('mongodb://maycon190:+m97466833@ds135714.mlab.com:35714/dark_bot', {
    useNewUrlParser: true
})
const db_config = require("../models/config.js")
const staff_list = require("../models/staff-list.js")
const regras = require("../models/regras.js")
const mute = require("../models/mute.js")

const color = require('cli-color')

exports.run = (client, guildo) => {

    db_config.findOne({ guildid: guildo.id }, (err, guild) => {
        if (!guild) {
            const newConfig = new db_config({
                guildid: guildo.id,

                //bemvindo
                bem_vindo_channel: '0',
                bem_vindo_msg: 'null',
                autorole_id: '0',

                //saida
                saida_channel: '0',
                saida_msg: 'null',

                //contador de membros
                contador_de_membros_channel: '0',

                //punicoes
                punicoes_channel: '0',

                //anti-link
                antilink: '0',

                //ticketchannel
                ticket_channel: '0',

                //logs
                modlog_channel: '0'
            })
            newConfig.save()
        }
    })


    regras.findOne({ guildid: guildo.id }, (err, g_regras) => {
        if (!g_regras) {
            const newRegras = new regras({
                guildid: guildo.id,
                regras: 'null'
            })
            newRegras.save()
        }
    })
}

module.exports.help = {
    name: 'db-new'
}