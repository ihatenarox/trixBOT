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
    if (message.member.hasPermission('MUTE_MEMBERS')) {
        if (message.mentions.members.array()[0]) {
            const user = message.mentions.members.array()[0]
            if (user.hasPermission('ADMINISTRATOR')) {
                if (!message.guild.roles.find(role => role.name === 'Mutado')) {
                    message.guild.createRole({ 'name': 'Mutado', 'hoist': false, 'mentionable': false, 'color': '#808080', 'permissions': ['READ_MESSAGES', 'READ_MESSAGE_HISTORY'] })
                    const jdhdi = client.setTimeout(step1, 1000, '')
                } else {
                    const jdhdi = client.setTimeout(step1, 200, '')
                }

                function step1(ss) {
                    const cargo = message.guild.roles.find(role => role.name === 'Mutado')
                    if (cargo.position < message.guild.members.find(a => a.id === client.user.id).highestRole.position) {
                        if (!user.roles.find(role => role.name === 'Mutado')) {
                            //dados

                            userinfo.findOne({ userid: user.id, guildid: message.guild.id }, (err, ruserinfo) => {
                                if (!ruserinfo) {
                                    const NewUserInfo = new userinfo({
                                        guildid: message.guild.id,
                                        userid: user.id,
                                        mutes: '1',
                                        warns: '0'
                                    })
                                    NewUserInfo.save()
                                }
                                if (ruserinfo) {
                                    const mutess = Math.floor(ruserinfo.mutes)
                                    ruserinfo.mutes = Math.floor(mutess + 1)
                                    ruserinfo.save()
                                }
                            })

                            user.addRole(cargo)
                            const canaist = message.guild.channels.filter(a => a.type === 'text').array()
                            const canaisv = message.guild.channels.filter(a => a.type === 'voice').array()
                            canaist.forEach((v, i) => {
                                v.overwritePermissions(user, {
                                    'SEND_MESSAGES': false
                                })
                            })
                            canaisv.forEach((v, i) => {
                                v.overwritePermissions(user, {
                                    'SPEAK': false
                                })
                            })
                            const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
                            db_config.findOne({ guildid: message.guild.id }, (err, guild) => {
                                if (guild) {
                                    if (guild.punicoes_channel !== '0') {
                                        const canal = message.guild.channels.find(canal => canal.id === guild.punicoes_channel)
                                        if (canal) {
                                            const embed_final = new Discord.RichEmbed()
                                                .setColor('#B22222')
                                                .setTitle('MUTE')
                                                .setFooter(`Mutado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                                                .addField('User', `${user}`)
                                            if (args.slice(2).join(' ')) {
                                                embed_final.addField('Motivo', `${args.slice(2).join(' ')}`)
                                            }
                                            canal.send(embed_final)

                                            const embed_final2 = new Discord.RichEmbed()
                                                .setColor('#00FF7F')
                                                .setDescription(`${message.member}**,O(A) ${user} foi mutado(a) com sucesso!**`)
                                            message.channel.send(embed_final2)
                                        } else {
                                            guild.punicoes_channel = '0'
                                            guild.save()
                                        }
                                    }
                                    if (guild.punicoes_channel === '0') {
                                        const embed_final = new Discord.RichEmbed()
                                            .setColor('#00FF7F')
                                            .setDescription(`${message.member}**,O(A) ${user} foi mutado(a) com sucesso!**`)
                                        message.channel.send(embed_final)
                                        const embed_final2 = new Discord.RichEmbed()
                                            .setColor('#B22222')
                                            .setTitle('MUTE')
                                            .setFooter(`Mutado por: ${message.author.tag}`, message.author.avatarURL || message.author.defaultAvatarURL)
                                            .addField('User', `${user}`)
                                        if (args.slice(2).join(' ')) {
                                            embed_final2.addField('Motivo', `${args.slice(2).join(' ')}`)
                                        }
                                        message.channel.send(embed_final2)
                                    }
                                }
                            })
                        } else {
                            const embed_err = new Discord.RichEmbed()
                                .setColor('#ff0000')
                                .setDescription(`${message.member}**, Este usuario ja esta mutado!**`)
                            message.channel.send(embed_err)
                        }
                    } else {
                        const embed_err = new Discord.RichEmbed()
                            .setColor('#ff0000')
                            .setDescription(`${message.member}**, O cargo __Mutado__ Não pode ser superior a min!**`)
                        message.channel.send(embed_err)
                    }
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, O mute não funciona em membros com permissão de __Administrador__!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Mencione alguem para ser mutado!**`)
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
    name: '/mute/'
}