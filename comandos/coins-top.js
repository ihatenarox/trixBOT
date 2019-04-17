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
    eco.find({ guildid: message.guild.id }).sort([['coins', 'descending']]).exec((err, list) => {
        const embed = new Discord.RichEmbed()
            .setTitle('Top 10 coins - ' + message.guild.name)
            .setThumbnail('https://img.icons8.com/nolan/1600/leaderboard.png')
            .setColor('#9400D3')
        list.forEach((v1, i1) => {
            if (i1 < 10) {
                const user = message.guild.members.find(a => a.id === v1.userid)
                embed.addField(`${i1 + 1}° Lugar`, `${user}\nCoins: ${v1.coins}`)
            }
        })
        message.channel.send(embed)
    })
}

module.exports.help = {
    name: '/coins-top/'
}