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
    const valor = Math.floor(args.slice(1, 2).join(' '))
    const valors = `${valor}`
    if (args.slice(1, 2).join(' ')) {
        if (valors !== 'NaN') {
            eco.findOne({ guildid: message.guild.id, userid: message.author.id }, (err, result) => {
                if (result) {
                    if (result.coins >= valor) {
                        if (valor <= 1e10) {
                            const embed_await = new Discord.RichEmbed()
                                .setTitle('Cassino - roleta')
                                .setColor('#0000FF')
                                .setDescription(`
                                **Girando a roleta**
                                ***
                                Chances:
                                3x = 5%
                                2x = 40%
                                /2 = 25%
                                Perder tudo = 40%***`)
                                .setImage('https://cdn.discordapp.com/attachments/527274992313040902/529380038009815060/ezgif-2-43d752ad8721.gif')
                            message.channel.send(embed_await).then(msg => {
                                const timer = client.setTimeout(await, 5000, '')
                                function await(ff) {
                                    result.coins = Math.floor(result.coins - valor)

                                    const sorteio = Math.floor(Math.random() * (100) + 1)

                                    //x3
                                    if (sorteio <= 5) {
                                        const aa = [
                                            `x3 | ${Math.floor(valor * 3)} Coins`,
                                            Math.floor(valor * 3)
                                        ]
                                        const tt = client.setTimeout(embed, 100, aa)
                                    }

                                    // /2
                                    if (sorteio <= 30 && sorteio > 5) {
                                        const aa = [
                                            `/2 | ${Math.floor(valor / 2)} Coins`,
                                            Math.floor(valor / 2)
                                        ]
                                        const tt = client.setTimeout(embed, 100, aa)
                                    }

                                    //*2
                                    if (sorteio <= 70 && sorteio > 30) {
                                        const aa = [
                                            `x2 | ${Math.floor(valor * 2)} Coins`,
                                            Math.floor(valor * 2)
                                        ]
                                        const tt = client.setTimeout(embed, 100, aa)
                                    }

                                    // perdeu tudo
                                    if (sorteio <= 100 && sorteio > 70) {
                                        const aa = [
                                            'Perdeu Tudo : (',
                                            0
                                        ]
                                        const tt = client.setTimeout(embed, 100, aa)
                                    }


                                    function embed(premio) {
                                        result.coins = Math.floor(result.coins + premio[1])
                                        result.save()
                                        const embed_await = new Discord.RichEmbed()
                                            .setTitle('Cassino - roleta')
                                            .setColor('#0000FF')
                                            .setDescription(`
                                        **A roleta acabou de girar e seu premio é...**
                                        
                                        ${client.emojis.find(a => a.name === 'trix_premio')}Premio: ${premio[0]}`)
                                        msg.edit(embed_await)
                                    }
                                }
                            })
                        }else{
                            const embed_err = new Discord.RichEmbed()
                                .setColor("#ff0000")
                                .setDescription(`${message.member}**, Você não pode apostar um valor maior que 1e10 (10.000.000.000)!**`)
                            message.channel.send(embed_err)
                        }
                    } else {
                        const embed_err = new Discord.RichEmbed()
                            .setColor("#ff0000")
                            .setDescription(`${message.member}**, Você não tem coins suficientes para apostar este valor!**`)
                        message.channel.send(embed_err)
                    }
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor("#ff0000")
                        .setDescription(`${message.member}**, Você não tem coins suficientes para apostar!**`)
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
            .setDescription(`${message.member}**, Informe o valor que deseja apostar na roleta!**`)
        message.channel.send(embed_err)
    }
}

module.exports.help = {
    name: '/roleta/'
}