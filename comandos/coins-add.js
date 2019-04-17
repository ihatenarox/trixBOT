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
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.mentions.members.array()[0]) {
            if (args.slice(2, 3).join(' ')) {
                const valor = Math.floor(args.slice(2, 3).join(' '))
                const valorstring = `${valor}`
                if (valorstring !== 'NaN') {
                    const user = message.mentions.members.array()[0]
                    eco.findOne({ guildid: message.guild.id, userid: user.id }, (err, result) => {
                        if (result) {
                            if (result.coins + valor <= 1e10) {
                                result.coins = valor + result.coins
                                result.save()
                                    .then(certo => {
                                        if (certo) {
                                            const a = client.setTimeout(embed, 500, '')
                                        }
                                    })
                            }else{
                                const embed_err = new Discord.RichEmbed()
                                    .setColor("#ff0000")
                                    .setDescription(`${message.member}**, Informe um valor menor que 1e10 (10.000.000.000)!**`)
                                message.channel.send(embed_err)
                            }
                        } else {
                            const NewEco = new eco({
                                guildid: message.guild.id,
                                userid: user.id,
                                coins: Math.floor(valor)
                            })
                            NewEco.save()
                            const a = client.setTimeout(embed, 500, '')
                        }
                        function embed() {

                            const embed_final = new Discord.RichEmbed()
                                .setColor('#00FF7F')
                                .setDescription(`${message.member}**, ${valor} coins adicionados com sucesso na conta do(a) ${user}!**`)
                            message.channel.send(embed_final)
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
    name: '/coins-add/'
}