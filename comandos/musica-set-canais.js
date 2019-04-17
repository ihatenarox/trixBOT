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
        if (message.member.voiceChannel) {
            const canal_voz = message.member.voiceChannel
            if (message.mentions.channels.array().length === 2) {
                const canal_pedir = message.mentions.channels.array()[0]
                const canal_log = message.mentions.channels.array()[1]
                if (canal_voz.speakable) {
                    if (!canal_pedir.muted) {
                        if (!canal_log.muted) {
                            const music_config = require("../models/music_volume.js")
                            music_config.findOne({ guildid: message.guild.id }, (err, result) => {
                                if (result) {
                                    result.pedir_channel = canal_pedir.id
                                    result.log_channel = canal_log.id
                                    result.music_channel = canal_voz.id
                                    result.save()

                                    const embed_final = new Discord.RichEmbed()
                                        .setColor('#00FF7F')
                                        .setDescription(`${message.member}**, Canais configurado com sucesso
                                        
                                        Canal de pedir musica: ${canal_pedir}
                                        Canal de log de musica: ${canal_log}
                                        
                                        Canal de para reproduzir musicas: ${'``'}${canal_voz.name}${'``'}**`)
                                    message.channel.send(embed_final)

                                } else {
                                    const newc = new music_config({
                                        guildid: message.guild.id,
                                        volume: 0.3,
                                        pedir_channel: canal_pedir.id,
                                        log_channel: canal_log.id,
                                        music_channel: canal_voz.id,
                                        playlist: true,
                                        tempo: 420
                                    })
                                    newc.save()

                                    const embed_final = new Discord.RichEmbed()
                                        .setColor('#00FF7F')
                                        .setDescription(`${message.member}**, Canais configurado com sucesso
                                        
                                        Canal de pedir musica: ${canal_pedir}
                                        Canal de log de musica(Onde eu enviarei a musica que esta tocando no momento): ${canal_log}
                                        
                                        Canal de para reproduzir musicas: ${'``'}${canal_voz.name}${'``'}**`)
                                    message.channel.send(embed_final)
                                }
                            })
                        } else {
                            const embed_err = new Discord.RichEmbed()
                                .setColor('#ff0000')
                                .setDescription(`${message.author}**, Eu não tenho permissão para mandar mensagens no canal ${'``'}${canal_log.name}${'``'}!**`)
                            message.channel.send(embed_err)
                        }
                    } else {
                        const embed_err = new Discord.RichEmbed()
                            .setColor('#ff0000')
                            .setDescription(`${message.author}**, Eu não tenho permissão para mandar mensagens no canal ${'``'}${canal_pedir.name}${'``'}!**`)
                        message.channel.send(embed_err)
                    }
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${message.author}**, Eu não tenho permissão para falar no canal de voz ${'``'}${canal_voz.name}${'``'}!**`)
                    message.channel.send(embed_err)
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`
                    ${message.author}**, Mencione 2 canais de texto
                    O primeiro será: Canal para pedir musicas!
                    O segundo será:  Canal para a logs de musica (Onde eu enviarei a musica que esta tocando no momento)**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.author}**, Você precisa estar no canal de voz que você quer que eu reproduza a musica!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.author}**, Você não tem permissão __Administrador__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/musica-set-canais/'
}