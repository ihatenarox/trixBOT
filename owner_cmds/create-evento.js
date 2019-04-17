const Discord = require('discord.js')
const moment = require('moment')
const mongoose = require('mongoose')

const config = require("../config.json")

mongoose.connect(config.mongolink, {
    useNewUrlParser: true
})

exports.run = (client, message) => {
    const keys = require("../models/keys.js")
    const args = message.content.slice(6).trim().split(/ +/g);
    const msgs = args.slice(1, 2).join(' ')
    const key = args.slice(2, 3).join(' ')
    keys.findOne({ key: key }, (err, result) => {
        if (result) {
            const id = Math.floor(Math.random() * (9999999999))

            const eventos = require("../models/eventos.js")

            const newevento = new eventos({
                id: id,
                msgs: msgs,
                key: key
            })
            newevento.save()

            message.delete()

            const key_msg = `${key}`
                .slice(0, key.length - 10)
            const embed = new Discord.RichEmbed()
                .setColor('#FFD700')
                .setDescription(`
                ${message.member}**, Evento criado com sucesso!**
                
                ***===/Evento Info/===***
                Mensagens: ${msgs}
                Key: ${key_msg}__#%#%#%#%#%__`)
            message.channel.send(embed)
        } else {
            message.reply('Informe uma key valida!')
        }
    })
}

module.exports.help = {
    name: '/create-evento/'
}