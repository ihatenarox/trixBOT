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
    const args = message.content.toLowerCase().slice(config.prefix.length).trim().split(/ +/g);
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
        '-',
        '+',
        '*',
        '/'
    ]
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.mentions.members.array()[0]) {
            if (args.slice(2, 3).join(' ')) {
                const valor = Math.floor(args.slice(2, 3).join(' '))
                const valorstring = `${valor}`
                if (valorstring !== 'NaN') {
                    if (valor <= 1e10) {
                        const user = message.mentions.members.array()[0]
                        eco.findOne({ guildid: message.guild.id, userid: user.id }, async (err, result) => {

                            if (result) {
                                result.coins = Math.floor(valor)
                                await result.save()
                                embed_final()
                            } else {
                                const NewEco = new eco({
                                    guildid: message.guild.id,
                                    userid: message.author.id,
                                    coins: valor
                                })
                                await NewEco.save()
                                embed_final()
                            }
                            function embed_final() {
                                const embed_final = new Discord.RichEmbed()
                                    .setColor('#00FF7F')
                                    .setDescription(`${message.member}**, Coins do(a) ${user} setado com sucesso!
                            
                                    __Coins ${user}__
                                    Coins: ${valor}**`)
                                message.channel.send(embed_final)
                            }
                        })
                    } else {
                        const embed_err = new Discord.RichEmbed()
                            .setColor("#ff0000")
                            .setDescription(`${message.member}**, Informe um valor menor que 1e10 (10.000.000.000)!**`)
                        message.channel.send(embed_err)
                    }
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor("#ff0000")
                        .setDescription(`${message.member}**, Informe um valor valido!**`)
                    message.channel.send(embed_err)
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor("#ff0000")
                    .setDescription(`${message.member}**, Informe o valor que deseja setar!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor("#ff0000")
                .setDescription(`${message.member}**, Mencione alguem!**`)
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
    name: '/coins-set/'
}