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
        db_config.findOne({ guildid: message.guild.id }, (err, guild) => {
            if (guild) {
                if (message.guild.channels.find(canal => canal.id === guild.contador_de_membros_channel)) {
                    const canal = message.guild.channels.find(canal => canal.id === guild.contador_de_membros_channel)
                    canal.setTopic('')
                }
                guild.contador_de_membros_channel = '0'
                guild.save()

                const embed = new Discord.RichEmbed()
                    .setColor('#FF8C00')
                    .setDescription(`${message.member}**, Configurações do __Contador de Mebros__ resetado com sucesso!**`)
                message.channel.send(embed)
            }
        })
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão __ADMINISTRADOR__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/contador-reset/'
}