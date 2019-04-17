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

const color = require('cli-color')

exports.run = (client, message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.mentions.members.array()[0]) {
            const user = message.mentions.members.array()[0]
            const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
            if (args.slice(2).join(' ')) {
                const aaa = '```'
                const embed_aviso = new Discord.RichEmbed()
                    .setColor('#FF8C00')
                    .setTitle('AVISO')
                    .setDescription(`**${user} - Motivo do aviso:**\n${aaa}md\n#${args.slice(2).join(' ')}${aaa}`)
                    .setFooter(`Aviso feito por ${message.author.tag}`, message.author.displayAvatarURL)
                message.channel.send(embed_aviso).then(a => {
                    a.edit(`- ${user}`)
                })
                const moment = require("moment")
                moment.locale('pt-BR')
                const data = moment().utc().subtract(3,'hour').format('DD/MM/YYYY | HH:mm')
                const NewAviso = new warns({
                    guildid: message.guild.id,
                    userid: user.id,
                    aviso: args.slice(2).join(' '),
                    data: data,
                    autor: message.author.tag
                })
                NewAviso.save()

                userinfo.findOne({ guildid: message.guild.id, userid: user.id }, (err, Ruserinfo) => {
                    if (!Ruserinfo) {
                        const NewUserInfo = new userinfo({
                            guildid: message.guild.id,
                            userid: user.id,
                            mutes: '0',
                            warns: '1'
                        })
                        NewUserInfo.save()
                    }
                    if (Ruserinfo) {
                        const avisos = Math.floor(Ruserinfo.warns)
                        Ruserinfo.warns = Math.floor(avisos + 1)
                        Ruserinfo.save()
                    }
                })
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Informe o motivo do aviso!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Mencione alguem para ser avisado!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão de administrador para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/warn/'
}