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

const color = require('cli-color')

exports.run = (client, message) => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args.slice(1).join(' ')) {
            const emoji_trix_sino = client.emojis.find(emoji => emoji.name === 'trix_sino')
            const embed = new Discord.RichEmbed()
                .setColor('#FFD700')
                .setTitle(`${emoji_trix_sino} - ANUNCIO - ${message.guild.name}`)
                .setDescription(`${args.slice(1).join(' ')}\n\n***Atenciosamente\nEquipe ${message.guild.name}.***`)
                .setFooter(`Anuncio feito por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
            message.channel.send(embed).then(msg => {
                msg.edit('- @everyone')
                message.delete()
            })
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe alguma mensagem para fazer o anuncio!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Somente __ADMINISTRADORES__ podem executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/anunciar/'
}