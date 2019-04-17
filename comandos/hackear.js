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

const moment = require('moment')
moment.locale('pt-BR')

exports.run = (client, message) => {
    const time_hack = require("../models/time_hack.js")
    time_hack.findOne({ guildid: message.guild.id, userid: message.author.id }, async (err, Rtimehack) => {
        if (!Rtimehack) {
            const newTimehack = new time_hack({
                guildid: message.guild.id,
                userid: message.author.id,
                tempo: '0'
            })
            await newTimehack.save()
            const time = client.setTimeout(passo1, 100, '')
        }
        if (Rtimehack) {
            const tempo = Math.floor(Rtimehack.tempo)
            if (tempo <= Math.floor(client.readyTimestamp + client.uptime)) {
                const time = client.setTimeout(passo1, 100, '')
            } else {
                const tempo = Math.floor(Rtimehack.tempo)
                message.channel.send(`Você so pode executar este comando novamente ${moment(tempo, 'x').fromNow()}`)
            }
        }
        function passo1() {
            time_hack.findOne({ guildid: message.guild.id, userid: message.author.id }, async (err, RtimehackATT) => {
                RtimehackATT.tempo = Math.floor(`${moment().add(6, 'hour').unix()}000`)
                RtimehackATT.save()
                eco.findOne({ guildid: message.guild.id, userid: message.author.id }, async (err, Reco) => {
                    if (Reco) {
                        eco.find({ guildid: message.guild.id }).sort([['coins', 'descending']]).exec(async (err, RecoFind) => {
                            const a = RecoFind.filter(a => a.userid !== message.author.id).filter(a => a.coins > 100)
                            if (a.length === 0) {
                                message.channel.send(`${message.member}**, Não achei ninguem para hackear! Convide mais pessoas para o servidor!**`)
                                RtimehackATT.tempo = '0'
                                RtimehackATT.save()
                            }
                            if (a.length < 10 && a.length !== 0) {
                                //nao fazer filter porcento
                                const maisRicos = Math.floor(a.length)
                                const sortear = a[Math.floor(Math.random() * maisRicos)]

                                const coins_hack = Math.floor((sortear.coins / 100) * 10)
                                Reco.coins = Reco.coins + coins_hack
                                Reco.save()

                                const moment = require('moment')
                                moment.locale('pt-BR')
                                const data = moment().utc().subtract(3, 'hour').format('LLL')
                                const embed_hack = new Discord.RichEmbed()
                                    .setColor('#000000')
                                    .setTitle('TERMINAL')
                                    .setThumbnail('https://www.ecpi.edu/sites/default/files/whitehat.png')
                                    .setDescription(`
                                            ** /HACK LOG/ **
                                            ===================================
                                            *** Hacker id: __${ message.member.id}__
                                            Id user hacked: __${ sortear.userid}__ ***
                                            ===================================
                                            *** Hack date: __${ data}__ ***
                                            ===================================
                                            *** Coins hacked: __${ coins_hack} coins__ ***
                                            ===================================
                                            ***__Este hack é ficticio e não pegou coins de ninguem__***`)
                                message.delete()
                                message.channel.send(embed_hack)
                            }
                            if (a.length >= 10) {
                                //maior que 10
                                const maisRicos = Math.floor((a.length / 100) * 10)
                                const sortear = RecoFind[Math.floor(Math.random() * maisRicos)]

                                const coins_hack = Math.floor((sortear.coins / 100) * 10)
                                Reco.coins = Reco.coins + coins_hack
                                Reco.save()

                                const moment = require('moment')
                                moment.locale('pt-BR')
                                const data = moment().utc().subtract(3, 'hour').format('LLL')
                                const embed_hack = new Discord.RichEmbed()
                                    .setColor('#000000')
                                    .setTitle('TERMINAL')
                                    .setThumbnail('https://www.ecpi.edu/sites/default/files/whitehat.png')
                                    .setDescription(`
                                            ** /HACK LOG/ **
                                            ===================================
                                            *** Hacker id: __${ message.member.id}__
                                            Id user hacked: __${ sortear.userid}__ ***
                                            ===================================
                                            *** Hack date: __${ data}__ ***
                                            ===================================
                                            *** Coins hacked: __${ coins_hack} coins__ ***
                                            ===================================
                                            ***__Este hack é ficticio e não pegou coins de ninguem__***`)
                                message.delete()
                                message.channel.send(embed_hack)
                            }
                        })
                    }
                })
            })
        }
    })
}

module.exports.help = {
    name: '/hackear/'
}