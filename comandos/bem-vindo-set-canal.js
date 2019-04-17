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
                    guild.bem_vindo_channel = canal.id
                    guild.save()

                    const embed_final = new Discord.RichEmbed()
                        .setColor('#4682B4')
                        .setDescription(`**${message.member}, Canal ${canal} setado com sucesso para as mensagens de bem-vindo!**`)
                    message.channel.send(embed_final)
                }
            })
        }else{
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Mencione o canal que você deseja que envie as mensagens de bem-vindo!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão __ADMINISTRADOR__ para executar este comando**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/bem-vindo-set-canal/'
}