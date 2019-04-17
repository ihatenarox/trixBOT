const Discord = require('discord.js')
const moment = require('moment')
const mongoose = require('mongoose')

const config = require("../config.json")

mongoose.connect(config.mongolink, {
    useNewUrlParser: true
})

exports.run = (client, message) => {
    const args = message.content.slice(6).trim().split(/ +/g);
    const keys = require("../models/keys.js")
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
        '9'
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
    const final = args.slice(1, 2).join(' ') !== '' ? `${c1}${c2}${c3}${c4}-${args.slice(1, 2).join(' ')}-${c5}${c6}${c7}${c8}` : `${c1}${c2}-${c3}${c4}${c5}${c6}-${c7}${c8}${c9}${c10}-${c11}${c12}${c13}`

    const moment = require('moment')
    moment.locale('pt-BR')
    const data = moment().format('DD/MM/YYYY')
    const newkey = new keys({
        key: final,
        keydate: data
    })
    newkey.save()
    const embed_final = new Discord.RichEmbed()
        .setColor('#8A2BE2')
        .setDescription(`***__Key gerada:__***\n${'```'}fix\n${final}${'```'}`)
    message.channel.send(embed_final)

}

module.exports.help = {
    name: '/create-key/'
}