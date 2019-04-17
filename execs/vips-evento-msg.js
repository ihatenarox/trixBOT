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


const color = require('cli-color')

exports.run = (client, message) => {
    if (message.guild.id !== '264445053596991498') {
        if (message.content.length >= 5) {
            let rand = (Math.random() * (100)).toFixed(1)
            if (rand < 0.5) {
                const keys = require("../models/keys.js")
                message.react('💎')
                const coletor = message.createReactionCollector(((reaction, user) => reaction.emoji.identifier === '%F0%9F%92%8E' && user.id !== client.user.id), { 'time': 60000 })

                //gen key
                const caracteres = [
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    'M',
                    'A',
                    'Y',
                    'C',
                    'O',
                    'N',
                ]

                const c1 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c2 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c3 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c4 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c5 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c6 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c7 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c8 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c9 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c10 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c11 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c12 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const c13 = caracteres[Math.floor(Math.random() * (caracteres.length))]
                const final = `${c1}${c2}-${c3}${c4}${c5}${c6}-${c7}${c8}${c9}${c10}-${c11}${c12}${c13}`

                const moment = require('moment')
                moment.locale('pt-BR')
                const data = moment().format('DD/MM/YYYY')
                const newkey = new keys({
                    key: final,
                    keydate: data
                })
                newkey.save()

                coletor.on('collect', col => {
                    coletor.stop()
                    col.fetchUsers().then(users => {
                        const user = users.array().filter(a => a.id !== client.user.id)

                        const embed = new Discord.RichEmbed()
                            .setColor('#00BFFF')
                            .setAuthor(`${user[0].tag}`, user[0].displayAvatarURL)
                            .setDescription(`***Parabens ${user[0].tag}, Você ganhou uma key vip!***\n\n**__Key:__**\n${'```'}fix\n${final}${'```'}\n\nPara ativar seu vip utilize: ${'``'}${config.prefix}usar-key <key>${'``'}\n${'``'}Se você não utilizar esta key em 7 dias ela será sorteada para outra pessoa!${'``'}`)
                            .setFooter(`Key gerada por ${client.user.tag}`, client.user.displayAvatarURL)
                        user[0].send(embed)
                    })
                })
            }


            const evento = require("../models/eventos.js")
            evento.find({}, (err, evts) => {
                evts.forEach((v1, i1) => {
                    if (i1 < 1) {
                        evento.findOne({ id: v1.id }, (err, Redit) => {
                            if (Redit.msgs - 1 === 0) {
                                const embed = new Discord.RichEmbed()
                                    .setColor('#00BFFF')
                                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                                    .setDescription(`***Parabens ${message.author.tag}, Você ganhou uma key vip!***\n\n**__Key:__**\n${'```'}fix\n${Redit.key}${'```'}\n\nPara ativar seu vip utilize: ${'``'}${config.prefix}usar-key <key>${'``'}\n${'``'}Se você não utilizar esta key em 7 dias ela será sorteada para outra pessoa!${'``'}`)
                                    .setFooter(`Key gerada por: ${client.users.find(a => a.id === '428894381920223247').tag}`, client.users.find(a => a.id === '428894381920223247').displayAvatarURL)
                                message.author.send(embed)
                                evento.findOneAndDelete({ id: v1.id }, (err, sjh) => { })
                            }
                            if (Redit.msgs - 1 !== 0) {
                                Redit.msgs = Math.floor(Redit.msgs - 1)
                                Redit.save()
                            }
                        })
                    }
                })
            })
        }

    }
}

module.exports.help = {
    name: 'vips_evento_msg'
}