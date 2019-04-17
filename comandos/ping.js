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
    const embed_a = new Discord.RichEmbed()
    message.channel.send(embed_a).then(msg => {
        const embed_b = new Discord.RichEmbed()
            .setColor('#FFD700')
            .setTitle('Ping')
            .setDescription(`
                ${message.member}
                **Api Ping:** ***__${client.ping}__***
                **WebSocket Ping:** ***__${msg.createdTimestamp - message.createdTimestamp} ms__***`)
        msg.edit(embed_b)
    })
}

module.exports.help = {
    name: '/ping/'
}