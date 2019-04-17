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
    if (message.mentions.members.array()[0]) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        if (args.slice(2, 3).join(' ')) {
            const valor = Math.floor(args.slice(2, 3).join(' '))
            const valorstring = `${valor}`
            if (valorstring !== 'NaN') {
                const user = message.mentions.members.array()[0]
                eco.findOne({ guildid: message.guild.id, userid: message.author.id }, (err, Reco) => {
                    if (Reco) {
                        if (Reco.coins >= valor) {
                            eco.findOne({ guildid: message.guild.id, userid: user.id }, (err, Reco2) => {
                                if (Reco2) {


                                    Reco2.coins = Math.floor(Reco2.coins + valor)
                                    Reco.coins = Math.floor(Reco.coins - valor)
                                    Reco.save()
                                    Reco2.save()

                                    const embed_final = new Discord.RichEmbed()
                                        .setColor('#66CDAA')
                                        .setTitle('Transferencia bancaria')
                                        .setDescription(`${message.member}**,${valor} coins transferido com sucesso para ${user}**`)
                                    message.channel.send(embed_final)
                                } else {
                                    const embed_err = new Discord.RichEmbed()
                                        .setColor('#ff0000')
                                        .setDescription(`${message.member}**, Eu não consigo transferir coins para alguem que nunca falou no chat!**`)
                                    message.channel.send(embed_err)
                                }
                            })
                        } else {
                            const embed_err = new Discord.RichEmbed()
                                .setColor('#ff0000')
                                .setDescription(`${message.member}**, Você não tem todo esse dinheiro para transferir!**`)
                            message.channel.send(embed_err)
                        }
                    }
                })
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Informe o valor que deseja transferir valido!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe o valor que deseja transferir!**`)
            message.channel.send(embed_err)
        }
    } else {
        const embed_err = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setDescription(`${message.member}**, Mencione alguem para transferir os coins!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/coins-transferir/'
}