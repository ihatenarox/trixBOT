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

exports.run = async (client, message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        const args = message.content.toLowerCase().slice(config.prefix.length).trim().split(/ +/g);
        if (args.slice(1, 2).join(' ')) {
            const valor = Math.floor(args.slice(1, 2).join(' '))
            const valors = `${valor}`
            if (valors !== 'NaN') {
                if (valor<=1e10) {

                    const emojis = [
                        'trix_loop',
                        'trix_money',
                        'trix_brilliance',
                        'trix_premio',
                        'trix_bravery',
                        'trix_balance'
                    ]
                    const rand = emojis[Math.floor(Math.random() * (emojis.length))]
                    const emoji = await client.emojis.find(a => a.name === rand)
                    const embed = new Discord.RichEmbed()
                        .setColor('#FFD700')
                        .setFooter(`Evento feito por: ${message.author.tag}`, message.author.displayAvatarURL)
                        .setTimestamp(message.createdAt)
                        .setTitle('Evento Corrida')
                        .setDescription(`

                            ${client.emojis.find(e => e.name === 'trix_premio')}Premio: ${valor} Coins

                            O primeiro que reagir com ${emoji} ganha!`)
                    message.channel.send(embed).then(msg => {
                        msg.react(client.emojis.find(e => e.name === 'trix_loop'))
                        msg.react(client.emojis.find(e => e.name === 'trix_money'))
                        msg.react(client.emojis.find(e => e.name === 'trix_brilliance'))
                        msg.react(client.emojis.find(e => e.name === 'trix_bravery'))
                        msg.react(client.emojis.find(e => e.name === 'trix_balance'))
                        msg.react(client.emojis.find(e => e.name === 'trix_premio'))

                        const collector = msg.createReactionCollector(((reaction, user) => user.id !== client.user.id && user.id !== message.author.id && reaction.emoji.name === emoji.name), {})
                        collector.on('collect', (col) => {
                            collector.stop()
                            col.fetchUsers().then(a => {
                                a = a.filter(f => f.id !== message.author.id && f.id !== client.user.id)
                                const ganhador1 = a.array()[0]
                                const embedf = new Discord.RichEmbed()
                                    .setColor('#FFD700')
                                    .setFooter(`Evento feito por: ${message.author.tag}`, message.author.displayAvatarURL)
                                    .setTimestamp(message.createdAt)
                                    .setTitle('Evento Corrida Terminado')
                                    .setDescription(`

                                        ${client.emojis.find(e => e.name === 'trix_premio')}Premio: ${valor} Coins

                                        ${client.emojis.find(e => e.name === 'trix_premio')}Vencedor: ${message.guild.members.find(m => m.id === ganhador1.id)}`)
                                msg.edit(embedf)
                                const user = message.guild.members.find(m => m.id === ganhador1.id)

                                eco.findOne({ guildid: message.guild.id, userid: user.id }, (err, result) => {
                                    if (result) {
                                        result.coins = Math.floor(result.coins + valor)
                                        result.save()
                                    }
                                    if (!result) {
                                        const neweco = new eco({
                                            guildid: message.guild.id,
                                            userid: user.id,
                                            coins: valor
                                        })
                                        neweco.save()
                                    }
                                })
                            })
                        })
                    })
                } else {
                    const embed_err = new Discord.RichEmbed()
                        .setColor("#ff0000")
                        .setDescription(`${message.member}**, Você não pode fazer o evento valendo mais que 1e10 (10.000.000.000)!**`)
                    message.channel.send(embed_err)
                }
            } else {
                const embed_err = new Discord.RichEmbed()
                    .setColor('#ff0000')
                    .setDescription(`${message.member}**, Informe um valor valido!**`)
                message.channel.send(embed_err)
            }
        } else {
            const embed_err = new Discord.RichEmbed()
                .setColor('#ff0000')
                .setDescription(`${message.member}**, Informe o valor do evento!**`)
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
    name: '/corrida/'
}