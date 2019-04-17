//principais
const Discord = require('discord.js')
const fs = require('fs')
const config = require("../config.json")

//database
const mongoose = require("mongoose")
mongoose.connect(config.mongolink, {
    useNewUrlParser: true
})
const db_config = require("../models/config.js")
const staff_list = require("../models/staff-list.js")
const regras = require("../models/regras.js")
const mute = require("../models/mute.js")
const userinfo = require("../models/userinfo.js")
const warns = require("../models/warns.js")
const loja_tags = require("../models/loja-tags.js")
const eco = require("../models/eco.js")

const color = require('cli-color')

exports.run = (client, message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        const music_config = require("../models/music_volume.js")
        music_config.findOne({ guildid: message.guild.id }, (err, result) => {
            if (result) {
                result.volume = 0.3
                result.pedir_channel = '0'
                result.log_channel = '0'
                result.music_channel = '0'
                result.playlist = true
                result.tempo = 420
                result.save()
                const embed_certo = new Discord.RichEmbed()
                    .setColor('#00FF7F')
                    .setDescription(`${message.member}**, Configurações restauradas ao padrão com sucesso!**`)
                message.channel.send(embed_certo)
            } else {
                const embed_certo = new Discord.RichEmbed()
                    .setColor('#00FF7F')
                    .setDescription(`${message.member}**, Configurações restauradas ao padrão com sucesso!**`)
                message.channel.send(embed_certo)
            }
        })
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.author}**, Você não tem permissão __Administrador__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/musica-reset/'
}