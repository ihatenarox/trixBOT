//principais
const Discord = require('discord.js')
const fs = require('fs')
const config = require("../config.json")

//database
const mongoose = require("mongoose")
mongoose.connect('mongodb://maycon190:+m97466833@ds135714.mlab.com:35714/dark_bot', {
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
    db_config.findOne({ guildid: message.guild.id }, (err, Rguild) => {
        if (Rguild) {
            const link = ['www', 'https://', 'http://', 'com.br']
            const invite = ['discord.gg', 'discord,gg']
            if (Rguild.antilink !== '0') {
                if (!message.content.startsWith(config.prefix + 'play')) {
                    //invite
                    if (Rguild.antilink === '1') {
                        if (invite.some(a => message.content.toLowerCase().includes(a))) {
                            message.delete()

                            const embed = new Discord.RichEmbed()
                                .setColor('#FF4500')
                                .setTitle('ANTI-INVITE')
                                .setDescription(`${message.member}**,Você não tem permissão para enviar invites!**`)
                            message.channel.send(embed)
                        }
                    }


                    //link e invite
                    if (Rguild.antilink === '2') {
                        //invite
                        if (invite.some(a => message.content.toLowerCase().includes(a))) {
                            message.delete()

                            const embed = new Discord.RichEmbed()
                                .setColor('#FF4500')
                                .setTitle('ANTI-INVITE')
                                .setDescription(`${message.member}**,Você não tem permissão para enviar invites!**`)
                            message.channel.send(embed)
                        }

                        //link
                        if (link.some(a => message.content.toLowerCase().includes(a))) {
                            message.delete()

                            const embed = new Discord.RichEmbed()
                                .setColor('#FF4500')
                                .setTitle('ANTI-LINK')
                                .setDescription(`${message.member}**,Você não tem permissão para enviar links!**`)
                            message.channel.send(embed)
                        }
                    }


                    //anti link e invite mas adm pode enviar
                    if (Rguild.antilink === '3') {
                        if (!message.member.hasPermission('ADMINISTRATOR')) {
                            //invite
                            if (invite.some(a => message.content.toLowerCase().includes(a))) {
                                message.delete()

                                const embed = new Discord.RichEmbed()
                                    .setColor('#FF4500')
                                    .setTitle('ANTI-INVITE')
                                    .setDescription(`${message.member}**,Você não tem permissão para enviar invites!**`)
                                message.channel.send(embed)
                            }

                            //link
                            if (link.some(a => message.content.toLowerCase().includes(a))) {
                                message.delete()

                                const embed = new Discord.RichEmbed()
                                    .setColor('#FF4500')
                                    .setTitle('ANTI-LINK')
                                    .setDescription(`${message.member}**,Você não tem permissão para enviar links!**`)
                                message.channel.send(embed)
                            }
                        }
                    }
                }
            }
        }
    })
}

module.exports.help = {
    name: 'antilink'
}