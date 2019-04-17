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


const color = require('cli-color')

exports.run = (client, message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.mentions.channels.array()[0]) {
            const canal = message.mentions.channels.array()[0]
            db_config.findOne({ guildid: message.guild.id }, (err, guild) => {
                if (guild) {
                    if (guild.contador_de_membros_channel !== '0') {
                        const canal_antigo = message.guild.channels.find(canal => canal.id === guild.contador_de_membros_channel)
                        if (canal_antigo) {
                            canal_antigo.setTopic('')
                        }
                    }
                    guild.contador_de_membros_channel = canal.id
                    guild.save()

                    const canali = message.guild.channels.find(canall => canall.id === canal.id)
                    const edit = `${message.guild.memberCount}`
                        .replace(/0/g, ':one:')
                        .replace(/1/g, ':one:')
                        .replace(/2/g, ':two:')
                        .replace(/3/g, ':three:')
                        .replace(/4/g, ':four:')
                        .replace(/5/g, ':five:')
                        .replace(/6/g, ':six:')
                        .replace(/7/g, ':seven:')
                        .replace(/8/g, ':eight:')
                        .replace(/9/g, ':nine:')
                    canali.setTopic(`${edit} ***MEMBROS***`)

                    const embed = new Discord.RichEmbed()
                        .setColor('#4682B4')
                        .setDescription(`${message.member},Contador de membros no canal ${canal} configurado com sucesso!`)
                    message.channel.send(embed)
                }
            })
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Mencione o canal que você deseja que o contador de membros funcione!**`)
            message.channel.send(embed_err)
        }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Você não tem permissão __ADMINISTRADOR__ para executar este comando!**`)
            message.channel.send(embed_err)
        }
    }

    module.exports.help = {
        name: '/contador-set-canal/'
    }