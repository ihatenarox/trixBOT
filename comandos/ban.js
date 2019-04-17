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
    message.delete()
    if (message.member.hasPermission('BAN_MEMBERS')) {
        const bot = message.guild.members.find(a => a.id === client.user.id)
        if (bot.hasPermission('BAN_MEMBERS')) {
            if (message.mentions.members.array()[0]) {
                const user = message.mentions.members.array()[0]
                if (user.bannable) {
                    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
                    user.ban(args.slice(2).join(' '))
                    const embed_info = new Discord.RichEmbed()
                        .setColor('#B22222')
                        .setTitle('BAN')
                        .setThumbnail(user.user.displayAvatarURL)
                        .addField('User', `${user.user} | ID: ${user.user.id}`, true)
                        .addField('Autor', `${message.author} | ID: ${message.author.id}`, true)
                    if (args.slice(2).join(' ')) {
                        embed_info.addField('Motivo', `${args.slice(2).join(' ')}`)
                    }
                    db_config.findOne({ guildid: message.guild.id }, (err, Rguild) => {
                        if (Rguild) {

                            //embed user
                            const embed_user = new Discord.RichEmbed()
                                .setColor('#ff0000')
                                .setTitle('BAN')
                                .setDescription(`Você foi banido do servidor ***${message.guild.name}*** pelo staff ${message.author.tag}!`)
                            if (args.slice(2).join(' ')) {
                                embed_user.addField('Motivo', `${args.slice(2).join(' ')}`)
                            }
                            user.send(embed_user)


                            if (Rguild.punicoes_channel !== '0') {
                                const canal = message.guild.channels.find(canal => canal.id === Rguild.punicoes_channel)
                                if (canal) {
                                    canal.send(embed_info)

                                    const embed_certo = new Discord.RichEmbed()
                                        .setColor('#B22222')
                                        .setDescription(`${message.member}**, O(A) ${user} foi banido(a) com sucesso!**`)
                                    message.channel.send(embed_certo).then(mm => {
                                        mm.delete(5000)
                                    })
                                } else {
                                    Rguild.punicoes_channel = '0'
                                }
                            } else {
                                const embed_certo = new Discord.RichEmbed()
                                    .setColor('#B22222')
                                    .setDescription(`${message.member}**, O(A) ${user} foi banido(a) com sucesso!**`)
                                message.channel.send(embed_certo).then(mm => {
                                    mm.delete(5000)
                                })

                                message.channel.send(embed_info)
                            }
                        }
                    })
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor('#ff0000')
                        .setDescription(`${message.member}**, Eu não tenho permissão para banir este membro!**`)
                    message.channel.send(embed_err)
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Mencione um membro para ser banido!**`)
                message.channel.send(embed_err)
            }
        }else{
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Eu não tenho permissão para banir membros!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão para banir membros!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/ban/'
}