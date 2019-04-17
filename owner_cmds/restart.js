const Discord = require('discord.js')
const moment = require('moment')
const mongoose = require('mongoose')

const config = require("../config.json")

mongoose.connect(config.mongolink, {
    useNewUrlParser: true
})

exports.run = (client, message) => {
    client.destroy().then(a => {
        client.login(config.token).then(b => {
            message.channel.send('Bot reiniciado com sucesso!')
        })
        message.channel.send('Reiniciando!')
    })
}

module.exports.help = {
    name: '/restart/'
}