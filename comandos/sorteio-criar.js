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
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        if (args.slice(1).join(' ')) {
            const db_sorteio = require("../models/sorteio.js")
            const moment = require('moment')
            moment.locale('pt-BR')

            const id1 = Math.floor(Math.random() * (9))
            const id2 = Math.floor(Math.random() * (9))
            const id3 = Math.floor(Math.random() * (9))
            const id4 = Math.floor(Math.random() * (9))
            const id5 = Math.floor(Math.random() * (9))
            const idf = `${id1}${id2}${id3}${id4}${id5}`
            const votacao = args.slice(1).join(' ')

            const emoji_sorteio = client.emojis.find(e => e.name === 'trix_premio')

            const embed = new Discord.RichEmbed()
                .setColor('#FFD700')
                .setTitle('Sorteio - ' + message.guild.name)
                .setDescription(`${emoji_sorteio}Premio: ${args.slice(1).join(' ')}\n\n**Para participar do sorteio reaja com ${emoji_sorteio}**\n\n**ID Do SORTEIO: ${idf}**`)
            message.channel.send(embed).then(msg => {
                msg.edit('- @everyone')
                msg.react(emoji_sorteio)
                const newDB = new db_sorteio({
                    guildid: message.guild.id,
                    id: idf,
                    messageid: msg.id,
                    desc: args.slice(1).join(' ')
                })
                newDB.save()
            })
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe o premio do sorteio!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão de __Administrador__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/sorteio-criar/'
}