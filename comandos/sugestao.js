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
    const args = message.content.toLowerCase().slice(config.prefix.length).trim().split(/ +/g);
    if (args.slice(1).join(' ')) {
        const embed_ori = new Discord.RichEmbed()
            .setColor('#FFD700')
            .setTitle('SUGESTÃO')
            .setThumbnail(message.author.displayAvatarURL)
            .addField('Autor', `${message.author.id}|${message.member}`, true)
            .addField('Guild', `${message.guild.id}|${message.guild.name}`, true)
            .addField('Sugestão', `${args.slice(1).join(' ')}`)
        const canal = client.channels.find(canal => canal.id === '532359268276371466')
        canal.send(embed_ori)

        const emoji_trix_sim_ou_nao = client.emojis.find(e => e.name === 'trix_sim_ou_nao')
        const embed = new Discord.RichEmbed()
            .setColor('#20B2AA')
            .setDescription(`${message.member}**, Sugestão enviada com sucesso! Obrigado pela sua colaboração!**${emoji_trix_sim_ou_nao}`)
        message.channel.send(embed)
        message.delete()
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você precisa informar sua sugestão!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/sugestao/'
}