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
        const args = message.content.toLowerCase().slice(config.prefix.length).trim().split(/ +/g);
        if (message.mentions.members.array()[0]) {
            if (args.slice(2, 3).join(' ')) {
                const valor = Math.floor(args.slice(2, 3).join(' '))
                const valors = `${valor}`
                if (valors !== 'NaN') {
                    const user = message.mentions.members.array()[0]
                    eco.findOne({ guildid: message.guild.id, userid: user.id }, (err, result) => {
                        if (result) {
                            if (result.coins >= valor) {


                                result.coins = Math.floor(result.coins - valor)
                                result.save()
                                const embed_f = new Discord.RichEmbed()
                                    .setColor('#00FF7F')
                                    .setDescription(`${message.member}**, ${valor} coins foram removidos da conta do usuario ${user}**`)
                                message.channel.send(embed_f)
                            } else {
                                const embed_err = new Discord.RichEmbed()
                                    .setColor("#ff0000")
                                    .setDescription(`${message.member}**, Eu não consigo remover um valor superior ao que a pessoa tem!**`)
                                message.channel.send(embed_err)
                            }
                        } else {
                            const embed_err = new Discord.RichEmbed()
                                .setColor("#ff0000")
                                .setDescription(`${message.member}**, Este usuario não tem coins para ser removidos!**`)
                            message.channel.send(embed_err)
                        }
                    })
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor("#ff0000")
                        .setDescription(`${message.member}**, Informe um valor valido!**`)
                    message.channel.send(embed_err)
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor("#ff0000")
                    .setDescription(`${message.member}**, Informe o valor que você deseja remover!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor("#ff0000")
                .setDescription(`${message.member}**, Mencione o usuario que você deseja remover coins!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor("#ff0000")
            .setDescription(`${message.member}**, Você não tem permissão __Administrador__ para executar este comando!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/coins-remove/'
}