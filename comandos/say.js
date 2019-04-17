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
    if (message.member.hasPermission('MANAGE_MESSAGES')) {
        const args = message.content.toLowerCase().slice(config.prefix.length).trim().split(/ +/g);
        if (args.slice(1, 2).join(' ')) {
            const fala = args.slice(1, 2).join(' ')
            const embed = new Discord.RichEmbed()
                .setColor('#4682B4')
                .setAuthor(`${message.member.displayName}`, message.author.avatarURL)
                .setDescription(fala)
            message.channel.send(embed)
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe o que você quer que eu fale!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão __Gerenciar mensagens__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/say/'
}