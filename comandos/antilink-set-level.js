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
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (args.slice(1, 2).join(' ')) {
            if (args.slice(1, 2).join(' ') === '0' || args.slice(1, 2).join(' ') === '1' || args.slice(1, 2).join(' ') === '2' || args.slice(1, 2).join(' ') === '3') {
                if (args.slice(1, 2).join(' ') === '0') {
                    db_config.findOne({ guildid: message.guild.id }, (err, Rguild) => {
                        if (Rguild) {
                            Rguild.antilink = '0'
                            Rguild.save()
                        }
                    })
                }
                if (args.slice(1, 2).join(' ') === '1') {
                    db_config.findOne({ guildid: message.guild.id }, (err, Rguild) => {
                        if (Rguild) {
                            Rguild.antilink = '1'
                            Rguild.save()
                        }
                    })
                }
                if (args.slice(1, 2).join(' ') === '2') {
                    db_config.findOne({ guildid: message.guild.id }, (err, Rguild) => {
                        if (Rguild) {
                            Rguild.antilink = '2'
                            Rguild.save()
                        }
                    })
                }
                if (args.slice(1, 2).join(' ') === '3') {
                    db_config.findOne({ guildid: message.guild.id }, (err, Rguild) => {
                        if (Rguild) {
                            Rguild.antilink = '3'
                            Rguild.save()
                        }
                    })
                }
                const embed_final = new Discord.RichEmbed()
                    .setColor('#00FF7F')
                    .setDescription(`${message.member}, Anti-link level ${args.slice(1, 2).join(' ')} configurado com sucesso!`)
                message.channel.send(embed_final)
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Informe um nivel de proteção valido!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe o nivel de proteção do anti link!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Você não tem permissão __Administrador__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/antilink-level-set/'
}