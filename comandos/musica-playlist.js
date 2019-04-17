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
        const args = message.content.toLowerCase().slice(config.prefix.length).trim().split(/ +/g);
        if (args.slice(1, 2).join(' ')) {
            if (args.slice(1, 2).join(' ') === 'true' || args.slice(1, 2).join(' ') === 'false') {
                const music_c = require("../models/music_volume.js")
                music_c.findOne({ guildid: message.guild.id }, (err, result) => {
                    if (result) {
                        result.playlist = args.slice(1, 2).join(' ')
                        result.save()
                        const embed = new Discord.RichEmbed()
                            .setColor('#00FF7F')
                            .setDescription(`${message.member}**, Playlist configurada com sucesso! = ${args.slice(1, 2).join(' ')}**`)
                        message.channel.send(embed)
                    } else {
                        const newc = new music_c({
                            guildid: message.guild.id,
                            volume: 0.3,
                            pedir_channel: '0',
                            log_channel: '0',
                            music_channel: '0',
                            playlist: args.slice(1, 2).join(' '),
                            tempo: 420
                        })
                        newc.save()
                        const embed = new Discord.RichEmbed()
                            .setColor('#00FF7F')
                            .setDescription(`${message.member}**, Playlist configurada com sucesso! = ${args.slice(1, 2).join(' ')}**`)
                        message.channel.send(embed)
                    }
                })
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor("#ff0000")
                    .setDescription(`${message.member}**, Informe se as pessoas vao poder colocar playlist ou nao!\n\ntrue = Sim\nfalse = Não**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor("#ff0000")
                .setDescription(`${message.member}**, Informe se as pessoas vao poder colocar playlist ou nao!\n\ntrue = Sim\nfalse = Não**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setDescription(`${message.member}**, Você não tem permissão __Administrador__ para executar este servidor!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/musica-playlist/'
}