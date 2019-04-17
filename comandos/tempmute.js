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
            if (!user.hasPermission('ADMINISTRATOR')) {
                const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
                if (args.slice(2, 3).join(' ')) {
                    if (!message.guild.roles.find(role => role.name === 'Mutado')) {
                        message.guild.createRole({ 'name': 'Mutado', 'hoist': false, 'mentionable': false, 'color': '#808080', 'permissions': ['READ_MESSAGES', 'READ_MESSAGE_HISTORY'] })
                        const jdhdi = client.setTimeout(step1, 1000, '')
                    } else {
                        const jdhdi = client.setTimeout(step1, 200, '')
                    }


                    function step1(gg) {
                        const cargo = message.guild.roles.find(role => role.name === 'Mutado')
                        if (cargo.position < message.guild.members.find(a => a.id === client.user.id).highestRole.position) {
                            if (!user.roles.find(role => role.name === 'Mutado')) {
                                mute.findOne({ guildid: message.guild.id, userid: user.id }, (err, mutes) => {
                                    if (!mutes) {
                                        const letras = [
                                            'a',
                                            'b',
                                            'c',
                                            'd',
                                            'e',
                                            'f',
                                            'g',
                                            'h',
                                            'i',
                                            'j',
                                            'k',
                                            'l',
                                            'm',
                                            'n',
                                            'o',
                                            'p',
                                            'q',
                                            'r',
                                            's',
                                            't',
                                            'u',
                                            'v',
                                            'w',
                                            'x',
                                            'y',
                                            'z',
                                        ]
                                        const tempo = args.slice(2, 3).join(' ')
                                        const unidade_de_tempo = tempo.length - 1
                                        if (!letras.some(a => tempo.slice(0, tempo.length - 1).includes(a))) {
                                            if (tempo.slice(unidade_de_tempo) === 's') {
                                                const tempof = Math.floor((client.readyTimestamp + client.uptime) + tempo.slice(0, tempo.length - 1) * 1000)
                                                const udhg = client.setTimeout(novo, 1000, tempof)
                                                const aaa = client.setTimeout(msg, 1000, tempo.slice(0, tempo.length - 1) + ' Segundo(s)')
                                            }
                                            if (tempo.slice(unidade_de_tempo) === 'm') {
                                                const tempof = Math.floor((client.readyTimestamp + client.uptime) + tempo.slice(0, tempo.length - 1) * 60000)
                                                const udhg = client.setTimeout(novo, 1000, tempof)
                                                const aaa = client.setTimeout(msg, 1000, tempo.slice(0, tempo.length - 1) + ' Minuto(s)')
                                            }
                                            if (tempo.slice(unidade_de_tempo) === 'h') {
                                                const tempof = Math.floor((client.readyTimestamp + client.uptime) + tempo.slice(0, tempo.length - 1) * 3600000)
                                                const udhg = client.setTimeout(novo, 1000, tempof)
                                                const aaa = client.setTimeout(msg, 1000, tempo.slice(0, tempo.length - 1) + ' Hora(s)')
                                            }
                                            if (tempo.slice(unidade_de_tempo) === 'd') {
                                                const tempof = Math.floor((client.readyTimestamp + client.uptime) + tempo.slice(0, tempo.length - 1) * 86400000)
                                                const udhg = client.setTimeout(novo, 1000, tempof)
                                                const aaa = client.setTimeout(msg, 1000, tempo.slice(0, tempo.length - 1) + ' Dia(s)')
                                            }
                                            function novo(gg) {
                                                const NewMute = new mute({
                                                    guildid: message.guild.id,
                                                    userid: user.id,
                                                    tempo: gg
                                                })
                                                NewMute.save()
                                                user.addRole(cargo)

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
                                            }
                                            function msg(tempo) {
                                                const embed_final_padrao = new Discord.RichEmbed()
                                                    .setColor('#B22222')
                                                    .setDescription(`${message.member}**, O(A) ${user} foi mutado(a) por ${tempo}**`)
                                                message.channel.send(embed_final_padrao)
                                                db_config.findOne({ guildid: message.guild.id }, (err, guild) => {
                                                    if (guild) {
                                                        if (guild.punicoes_channel !== '0') {
                                                            const canal = message.guild.channels.find(canal => canal.id === guild.punicoes_channel)
                                                            if (canal) {
                                                                const embed_final = new Discord.RichEmbed()
                                                                    .setColor('#B22222')
                                                                    .setFooter(`Mutado por: ${message.author.tag}`)
                                                                    .setTimestamp(message.createdAt)
                                                                    .setTitle('TEMPMUTE')
                                                                    .addField('User', user, true)
                                                                    .addField('Tempo', tempo, true)
                                                                if (args.slice(3).join(' ')) {
                                                                    embed_final.addField('Motivo', args.slice(3).join(' '))
                                                                }
                                                                canal.send(embed_final)
                                                            } else {
                                                                guild.punicoes_channel = '0'
                                                                guild.save()
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                        } else {
                                            const embed_err = new Discord.RichEmbed()
                                                .setColor('#ff0000')
                                                .setDescription(`${message.member}**, Informe um tempo valido!**`)
                                            message.channel.send(embed_err)
                                        }
                                    } else {
                                        const embed_err = new Discord.RichEmbed()
                                            .setColor('#ff0000')
                                            .setDescription(`${message.member}**, Este usuario ja esta mutado!**`)
                                        message.channel.send(embed_err)
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
                        .setDescription(`${message.member}**, Informe o tempo que o usuario vai ficar mutado!**`)
                    message.channel.send(embed_err)
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
            .setDescription(`${message.member}**, Você não tem permissão __MUTE_MEMBERS__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/tempmute/'
}