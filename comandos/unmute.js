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
    if (message.member.hasPermission('MUTE_MEMBERS')) {
        if (message.mentions.members.array()[0]) {
            const user = message.mentions.members.array()[0]
            const cargo = message.guild.roles.find(role => role.name === 'Mutado')
            if (cargo.position < message.guild.members.find(a => a.id === client.user.id).highestRole.position) {
                if (cargo) {
                    if (user.roles.find(role => role.name === 'Mutado')) {
                        user.removeRole(cargo)
                    }
                }
                mute.findOneAndDelete({ guildid: message.guild.id, userid: user.id }, (err, result) => { })

                const channels_text = message.guild.channels.filter(f => f.type === 'text')
                const channels_voice = message.guild.channels.filter(f => f.type === 'voice')

                channels_text.forEach((v, i) => {
                    v.overwritePermissions(user, {
                        'SEND_MESSAGES': null
                    })
                })
                channels_voice.forEach((v, i) => {
                    v.overwritePermissions(user, {
                        'SPEAK': null
                    })
                })

                const embed = new Discord.RichEmbed()
                    .setColor('#00FF7F')
                    .setDescription(`${message.member}**,O(A) ${user} foi desmutado(a) com sucesso!**`)
                message.channel.send(embed)
                const args = message.content.slice(0).trim().split(/ +/g);
                db_config.findOne({ guildid: message.guild.id }, (err, guild) => {
                    if (guild) {
                        if (guild.punicoes_channel !== '0') {
                            const canal = message.guild.channels.find(canal => canal.id === guild.punicoes_channel)
                            if (canal) {
                                const embed_final = new Discord.RichEmbed()
                                    .setColor('#00FF7F')
                                    .setTitle('UNMUTE')
                                    .setFooter(`Demutado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                                    .addField('User', `${user}`)
                                if (args.slice(2).join(' ')) {
                                    embed_final.addField('Motivo', `${args.slice(2).join(' ')}`)
                                }
                                canal.send(embed_final)
                            } else {
                                guild.punicoes_channel = '0'
                                guild.save()
                            }
                        } else {
                            const embed_final = new Discord.RichEmbed()
                                .setColor('#00FF7F')
                                .setTitle('UNMUTE')
                                .setFooter(`Demutado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                                .addField('User', `${user}`)
                            if (args.slice(2).join(' ')) {
                                embed_final.addField('Motivo', `${args.slice(2).join(' ')}`)
                            }
                            message.channel.send(embed_final)
                        }
                    }
                })
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, O cargo __Mutado__ Não pode ser superior a min!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe alguem para ser desmutado!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão __Mute_Members__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/unmute/'
}